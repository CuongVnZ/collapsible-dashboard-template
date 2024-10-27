import { useRouter } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function PlayerPanel() {
  const router = useRouter();

  // Dummy data for players
  const players = [
    { name: "Player1", class: "WARRIOR", level: 42, rank: "MEMBER" },
    { name: "Player2", class: "MAGE", level: 38, rank: "MODERATOR" },
    { name: "Player3", class: "ARCHER", level: 30, rank: "MEMBER" },
    { name: "Player4", class: "PALADIN", level: 45, rank: "ADMIN" },
    { name: "Player5", class: "ROGUE", level: 35, rank: "MEMBER" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Management</CardTitle>
        <CardDescription>View and manage player accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Input className="max-w-sm" placeholder="Search players..." />
            <Button className="ml-2">Search</Button>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-sm">
                  <th className="p-2 text-left font-medium">Name</th>
                  <th className="p-2 text-left font-medium">Class</th>
                  <th className="p-2 text-left font-medium">Level</th>
                  <th className="p-2 text-left font-medium">Rank</th>
                  <th className="p-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2">{player.name}</td>
                    <td className="p-2">{player.class}</td>
                    <td className="p-2">{player.level}</td>
                    <td className="p-2">
                      <Badge>{player.rank}</Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
