import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlantSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Plant identification endpoint
  app.post("/api/identify", async (req, res) => {
    try {
      if (!req.body.image) {
        return res.status(400).json({ message: "No image provided" });
      }

      // Mock plant identification API response
      // In a real app, this would call an actual plant identification API
      const mockIdentification = {
        name: "Monstera Deliciosa",
        scientificName: "Monstera deliciosa",
        confidence: 0.95,
        description: "A popular tropical houseplant known for its large, perforated leaves."
      };

      res.json(mockIdentification);
    } catch (error) {
      console.error('Error in plant identification:', error);
      res.status(500).json({ message: 'Failed to process image' });
    }
  });

  // Get user's plant collection
  app.get("/api/plants/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const plants = await storage.getPlantsByUserId(userId);
      res.json(plants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch plants" });
    }
  });

  // Add plant to collection
  app.post("/api/plants", async (req, res) => {
    try {
      const plantData = insertPlantSchema.parse(req.body);
      const plant = await storage.createPlant(plantData);

      // Update user points
      const user = await storage.getUser(plantData.userId);
      if (user) {
        await storage.updateUserPoints(user.id, user.points + 10);
      }

      res.json(plant);
    } catch (error) {
      console.error('Error creating plant:', error);
      res.status(500).json({ message: "Failed to create plant" });
    }
  });

  // Delete plant from collection
  app.delete("/api/plants/:plantId", async (req, res) => {
    try {
      const plantId = parseInt(req.params.plantId);
      await storage.deletePlant(plantId);
      res.json({ message: "Plant deleted successfully" });
    } catch (error) {
      console.error('Error deleting plant:', error);
      res.status(500).json({ message: "Failed to delete plant" });
    }
  });

  // Get user achievements
  app.get("/api/achievements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements = await storage.getAchievementsByUserId(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}