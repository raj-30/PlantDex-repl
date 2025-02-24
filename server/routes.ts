import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlantSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Plant identification endpoint
  app.post("/api/identify", async (req, res) => {
    // Mock plant identification API response
    const mockIdentification = {
      name: "Monstera Deliciosa",
      scientificName: "Monstera deliciosa",
      confidence: 0.95,
      description: "A popular tropical houseplant known for its large, perforated leaves."
    };
    
    res.json(mockIdentification);
  });

  // Get user's plant collection
  app.get("/api/plants/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const plants = await storage.getPlantsByUserId(userId);
    res.json(plants);
  });

  // Add plant to collection
  app.post("/api/plants", async (req, res) => {
    const plantData = insertPlantSchema.parse(req.body);
    const plant = await storage.createPlant(plantData);
    
    // Update user points
    const user = await storage.getUser(plantData.userId);
    if (user) {
      await storage.updateUserPoints(user.id, user.points + 10);
    }
    
    res.json(plant);
  });

  // Get user achievements
  app.get("/api/achievements/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const achievements = await storage.getAchievementsByUserId(userId);
    res.json(achievements);
  });

  const httpServer = createServer(app);
  return httpServer;
}
