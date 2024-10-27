import { Rank } from "@prisma/client";

import { LayoutDashboard, StoreIcon, UsersIcon } from "lucide-react";

export const roleRank = {
  [Rank.ADMIN]: 0,
  [Rank.MODERATOR]: 1,
  [Rank.MEMBER]: 2,
};

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  rank?: Rank;
}

export interface SideLink extends NavLink {
  rank?: Rank;
  sub?: NavLink[];
}

export const sidelinks: Array<SideLink> = [
  {
    title: "Overview",
    label: "",
    href: "/",
    icon: <LayoutDashboard size={18} />,
    rank: Rank.MEMBER,
  },
  {
    title: "Players",
    label: "",
    href: "/players",
    icon: <UsersIcon size={18} />,
    rank: Rank.MODERATOR,
  },
  {
    title: "Marketplace",
    label: "",
    href: "/marketplace",
    icon: <StoreIcon size={18} />,
    rank: Rank.ADMIN,
  },
  {
    title: "NPCs",
    label: "",
    href: "/npcs",
    icon: <UsersIcon size={18} />,
    rank: Rank.ADMIN,
  },
  {
    title: "User Management",
    label: "",
    href: "",
    icon: <UsersIcon size={18} />,
    rank: Rank.MEMBER,
    sub: [
      {
        title: "Users",
        label: "",
        href: "/users",
        icon: <UsersIcon size={18} />,
        rank: Rank.MODERATOR,
      },
    ],
  },
];
