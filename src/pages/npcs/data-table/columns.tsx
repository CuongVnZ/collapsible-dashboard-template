import { type ColumnDef } from "@tanstack/react-table";

import { NPCType } from "@prisma/client";

import { Checkbox } from "~/components/ui/checkbox";

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { type NPC, npcSchema } from "~/pages/npcs/_components/NpcPanel";
import { DataTableRowActions } from "~/pages/npcs/data-table/data-table-row-actions";

export const columns = (
  showModal: (mode: "create" | "edit", npcId?: string) => void,
): ColumnDef<NPC>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type");
      const npcType = NPCType[type as NPCType];

      return (
        <div className="flex items-center">
          <Badge variant="outline">{npcType}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      return Array.isArray(value) && value.includes(rowValue);
    },
  },
  {
    accessorKey: "locationX",
    header: ({ column }) => <DataTableColumnHeader column={column} title="X" />,
    cell: ({ row }) => <div>{row.getValue("locationX")}</div>,
  },
  {
    accessorKey: "locationY",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Y" />,
    cell: ({ row }) => <div>{row.getValue("locationY")}</div>,
  },
  {
    accessorKey: "locationZ",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Z" />,
    cell: ({ row }) => <div>{row.getValue("locationZ")}</div>,
  },
  {
    accessorKey: "pitch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pitch" />
    ),
    cell: ({ row }) => <div>{row.getValue("pitch")}</div>,
  },
  {
    accessorKey: "yaw",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yaw" />
    ),
    cell: ({ row }) => <div>{row.getValue("yaw")}</div>,
  },
  {
    accessorKey: "world",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="World" />
    ),
    cell: ({ row }) => <div>{row.getValue("world")}</div>,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      return (
        Array.isArray(value) &&
        typeof rowValue === "string" &&
        value.includes(rowValue)
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("description") ?? "No description"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions schema={npcSchema} row={row} showModal={showModal} />
    ),
  },
];
