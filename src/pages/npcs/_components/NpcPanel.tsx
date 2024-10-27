import { NPCType } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { DataTable } from "~/components/data-table/data-table";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { columns } from "../data-table/columns";
import { NpcModal } from "./NpcModal";

export const npcSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  locationX: z.number(),
  locationY: z.number(),
  locationZ: z.number(),
  pitch: z.number(),
  yaw: z.number(),
  world: z.string(),
  type: z.nativeEnum(NPCType),
});

export type NPC = z.infer<typeof npcSchema>;

export default function NpcPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedNpcId, setSelectedNpcId] = useState<string | undefined>(
    undefined,
  );

  const dummy = [
    {
      id: "npc1",
      name: "Grog Ironhammer",
      description: "A burly blacksmith with a thick beard",
      locationX: 100.5,
      locationY: 50.2,
      locationZ: 0,
      pitch: 0,
      yaw: 0,
      world: "Azeroth",
      type: "BLACKSMITH",
    },
    {
      id: "npc2",
      name: "Elara Swiftwind",
      description: "An elegant elf managing a bustling shop",
      locationX: 200.3,
      locationY: 75.8,
      locationZ: 1.5,
      pitch: 0,
      yaw: 0,
      world: "Azeroth",
      type: "SHOP_KEEPER",
    },
    {
      id: "npc3",
      name: "Bjorn Stablemaster",
      description: "A rugged horse keeper with a gentle touch",
      locationX: 150.7,
      locationY: 60.1,
      locationZ: 0.5,
      pitch: 0,
      yaw: 0,
      world: "Northrend",
      type: "HORSE_KEEPER",
    },
  ];

  const npcs = z.array(npcSchema).parse(dummy);

  const showModal = (mode: "create" | "edit", npcId?: string) => {
    setModalMode(mode);
    setSelectedNpcId(npcId);
    setIsModalOpen(true);
  };

  const filterColumns = [
    {
      name: "type",
      title: "NPC Type",
      options: Object.values(NPCType).map((type) => ({
        label: type,
        value: type,
      })),
    },
    {
      name: "world",
      title: "World",
      options: Array.from(new Set(npcs.map((npc) => npc.world))).map(
        (world) => ({
          label: world,
          value: world,
        }),
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>NPCs</CardTitle>
        <CardDescription>Monitor and manage NPCs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={() => showModal("create")}>Create NPC</Button>
        </div>
        <DataTable
          data={npcs}
          columns={columns(showModal)}
          filterColumns={filterColumns}
        />
      </CardContent>
      <NpcModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        npcId={selectedNpcId}
      />
    </Card>
  );
}
