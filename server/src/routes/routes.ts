import { create } from "./create";
import { FastifyInstance } from "fastify";
import { remove } from "./remove";
import { list } from "./list";

export async function Routes(app:FastifyInstance) {
  app.post("/create", create)
  app.delete("/remove/:id", remove)
  app.get("/list", list)
}