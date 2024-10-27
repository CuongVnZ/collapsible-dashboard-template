import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function ModerationPanel() {
  const router = useRouter();

  // Dummy data for player punishments
  const punishments = [
    {
      player: "Player1",
      type: "Ban",
      reason: "Cheating",
      expiry: "2023-12-31",
    },
    {
      player: "Player2",
      type: "Mute",
      reason: "Inappropriate language",
      expiry: "2023-06-15",
    },
    {
      player: "Player3",
      type: "Warn",
      reason: "Spamming",
      expiry: "N/A",
    },
    {
      player: "Player4",
      type: "Ban",
      reason: "Hacking",
      expiry: "2024-01-15",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Tools</CardTitle>
        <CardDescription>Manage player punishments and reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Punishment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ban">Ban</SelectItem>
                <SelectItem value="mute">Mute</SelectItem>
                <SelectItem value="warn">Warn</SelectItem>
              </SelectContent>
            </Select>
            <Input className="max-w-sm" placeholder="Search players..." />
            <Button>Search</Button>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-sm">
                  <th className="p-2 text-left font-medium">Player</th>
                  <th className="p-2 text-left font-medium">Type</th>
                  <th className="p-2 text-left font-medium">Reason</th>
                  <th className="p-2 text-left font-medium">Expiry</th>
                  <th className="p-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {punishments.map((punishment, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2">{punishment.player}</td>
                    <td className="p-2">{punishment.type}</td>
                    <td className="p-2">{punishment.reason}</td>
                    <td className="p-2">{punishment.expiry}</td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">
                        Review
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
