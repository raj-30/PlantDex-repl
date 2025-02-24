import { users, plants, achievements, type User, type InsertUser, type Plant, type InsertPlant, type Achievement, type InsertAchievement } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(id: number, points: number): Promise<User>;

  // Plant operations
  createPlant(plant: InsertPlant): Promise<Plant>;
  getPlantsByUserId(userId: number): Promise<Plant[]>;
  getPlant(id: number): Promise<Plant | undefined>;

  // Achievement operations
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private plants: Map<number, Plant>;
  private achievements: Map<number, Achievement>;
  private currentId: { users: number; plants: number; achievements: number };

  constructor() {
    this.users = new Map();
    this.plants = new Map();
    this.achievements = new Map();
    this.currentId = { users: 1, plants: 1, achievements: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, points: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserPoints(id: number, points: number): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, points };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createPlant(insertPlant: InsertPlant): Promise<Plant> {
    const id = this.currentId.plants++;
    const plant: Plant = {
      ...insertPlant,
      id,
      dateAdded: new Date().toISOString(),
      identificationData: insertPlant.identificationData || null,
      description: insertPlant.description || null
    };
    this.plants.set(id, plant);
    return plant;
  }

  async getPlantsByUserId(userId: number): Promise<Plant[]> {
    return Array.from(this.plants.values()).filter(
      (plant) => plant.userId === userId
    );
  }

  async getPlant(id: number): Promise<Plant | undefined> {
    return this.plants.get(id);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId.achievements++;
    const achievement: Achievement = { ...insertAchievement, id };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(
      (achievement) => achievement.userId === userId
    );
  }
}

export const storage = new MemStorage();