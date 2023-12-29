import {z} from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

const createSchema = z.object({
  id: z.string()
})

type createSchemaType = z.infer<typeof createSchema>
export async function remove(req:FastifyRequest, res:FastifyReply) {
  try{
    const data = createSchema.parse(req.params)
    await prisma.result.delete({where: {id: data.id}})
  } catch (e) {
    return res.status(400).send({error: e});
  }
  
  return res.status(200).send()
}