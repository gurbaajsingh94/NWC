import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple health check endpoint since the application logic is client-side
  app.get(api.health.path, (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return httpServer;
}
