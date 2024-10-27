import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  // Get a player by UUID
  getByUuid: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      const player = await ctx.db.player.findUnique({
        where: { uuid: input.uuid },
        include: {
          inventory: true,
          skills: true,
          quests: true,
          stats: true,
          horses: true,
        },
      });

      if (!player) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Player not found",
        });
      }

      return player;
    }),

  // Create a new player
  create: protectedProcedure
    .input(
      z.object({
        uuid: z.string(),
        name: z.string(),
        locationX: z.number(),
        locationY: z.number(),
        locationZ: z.number(),
        world: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingPlayer = await ctx.db.player.findUnique({
        where: { uuid: input.uuid },
      });

      if (existingPlayer) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Player already exists",
        });
      }

      return ctx.db.player.create({
        data: input,
      });
    }),

  // Update a player
  update: protectedProcedure
    .input(
      z.object({
        uuid: z.string(),
        data: z.object({
          name: z.string().optional(),
          classType: z
            .enum(["VILLAGER", "WARRIOR", "MAGE", "ROGUE"])
            .optional(),
          level: z.number().optional(),
          exp: z.number().optional(),
          rank: z.enum(["MEMBER", "MODERATOR", "ADMIN"]).optional(),
          hp: z.number().optional(),
          mana: z.number().optional(),
          locationX: z.number().optional(),
          locationY: z.number().optional(),
          locationZ: z.number().optional(),
          world: z.string().optional(),
          pearls: z.number().optional(),
          rewardPoints: z.number().optional(),
          gamemode: z.enum(["ADVENTURE", "SURVIVAL", "CREATIVE"]).optional(),
          lastShardCount: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { uuid, data } = input;
      return ctx.db.player.update({
        where: { uuid },
        data,
      });
    }),

  // Delete a player
  delete: protectedProcedure
    .input(z.object({ uuid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.player.delete({
        where: { uuid: input.uuid },
      });
    }),

  // Get all players (with pagination)
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const items = await ctx.db.player.findMany({
        take: limit + 1,
        cursor: cursor ? { uuid: cursor } : undefined,
        orderBy: {
          lastSeen: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.uuid;
      }
      return {
        items,
        nextCursor,
      };
    }),

  // Get player's inventory
  getInventory: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.player_inventory_item.findMany({
        where: { playerId: input.uuid },
        include: { item: true },
      });
    }),

  // Add item to player's inventory
  addInventoryItem: protectedProcedure
    .input(
      z.object({
        playerId: z.string(),
        itemId: z.string(),
        slot: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.player_inventory_item.create({
        data: input,
      });
    }),

  // Get player's skills
  getSkills: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.skill.findMany({
        where: { playerId: input.uuid },
      });
    }),

  // Update player's skill
  updateSkill: protectedProcedure
    .input(
      z.object({
        playerId: z.string(),
        skillName: z.string(),
        level: z.number().optional(),
        exp: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { playerId, skillName, ...data } = input;
      return ctx.db.skill.upsert({
        where: {
          playerId_name: {
            playerId,
            name: skillName,
          },
        },
        update: data,
        create: {
          playerId,
          name: skillName,
          ...data,
        },
      });
    }),
});
