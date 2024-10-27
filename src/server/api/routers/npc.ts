import { NPCType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const npcRouter = createTRPCRouter({
  // Get all NPCs
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.npc.findMany();
  }),

  getAllByType: publicProcedure
    .input(z.object({ type: z.nativeEnum(NPCType) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.npc.findMany({ where: { type: input.type } });
    }),

  // Get an NPC by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const npc = await ctx.db.npc.findUnique({
        where: { id: input.id },
      });

      if (!npc) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "NPC not found",
        });
      }

      return npc;
    }),

  // Create a new NPC
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        type: z.nativeEnum(NPCType),
        locationX: z.number(),
        locationY: z.number(),
        locationZ: z.number(),
        world: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.npc.create({
        data: input,
      });
    }),

  // Update an NPC
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.nativeEnum(NPCType).optional(),
        locationX: z.number().optional(),
        locationY: z.number().optional(),
        locationZ: z.number().optional(),
        world: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.npc.update({
        where: { id },
        data,
      });
    }),

  // Delete an NPC
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.npc.delete({
        where: { id: input.id },
      });
    }),
});
