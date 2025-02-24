import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  points: integer("points").notNull().default(0),
});

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  scientificName: text("scientific_name").notNull(),
  imageUrl: text("image_url").notNull(),
  identificationData: jsonb("identification_data"),
  dateAdded: text("date_added").notNull(),
  description: text("description"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  unlockedAt: text("unlocked_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPlantSchema = createInsertSchema(plants).pick({
  userId: true,
  name: true,
  scientificName: true,
  imageUrl: true,
  identificationData: true,
  description: true,
});

export const insertAchievementSchema = createInsertSchema(achievements);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertPlant = z.infer<typeof insertPlantSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type User = typeof users.$inferSelect;
export type Plant = typeof plants.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
