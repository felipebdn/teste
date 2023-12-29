import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { Result } from "@prisma/client";


export async function list(req:FastifyRequest, res:FastifyReply) {
  const data = await prisma.result.findMany()

  const organizedData: { [key: string]: Result[] } = {};

  data.forEach(item => {
    if (!organizedData[item.bimestre]) {
      organizedData[item.bimestre] = [];
    }
    organizedData[item.bimestre].push(item);
  });
  
  return res.status(201).send({result: organizedData})
}