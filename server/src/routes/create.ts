import {z} from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

const createSchema = z.object({
  disciplina: z.enum(["Biologia", "Artes", "Geografia", "Sociologia"]),
  bimestre: z.enum(["PRIMEIRO","SEGUNDO","TERCEIRO","QUARTO"]),
  nota: z.number().min(0).max(10),
})

type createSchemaType = z.infer<typeof createSchema>
export async function create(req:FastifyRequest, res:FastifyReply) {
  try{
    const data = createSchema.parse(req.body)
    const disciplina = await prisma.result.findFirst({where: {disciplina: data.disciplina, bimestre: data.bimestre}})
    if (disciplina) {
      return res.status(400).send({error: "Não é possível adicionar duas vezes a mesma disciplina no bimestre."})
    }
    await prisma.result.create({data})
  } catch (e) {
    return res.status(400).send({error: e});
  }
  
  return res.status(201).send()
}