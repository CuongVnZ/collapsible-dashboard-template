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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function MarketPanel() {
  // Dummy data for marketplace listings
  const listings = [
    {
      item: "Excalibur",
      type: "EQUIPMENT",
      seller: "Player1",
      status: "LISTING",
    },
    {
      item: "Swift Stallion",
      type: "HORSE",
      seller: "Player2",
      status: "SOLD",
    },
    {
      item: "Healing Potion",
      type: "CONSUMABLE",
      seller: "Player3",
      status: "LISTING",
    },
    {
      item: "Iron Shield",
      type: "EQUIPMENT",
      seller: "Player4",
      status: "LISTING",
    },
    { item: "Mystic Horse", type: "HORSE", seller: "Player5", status: "SOLD" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplace Overview</CardTitle>
        <CardDescription>
          Monitor and manage marketplace listings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="consumable">Consumable</SelectItem>
                <SelectItem value="horse">Horses</SelectItem>
              </SelectContent>
            </Select>
            <Input className="max-w-sm" placeholder="Search listings..." />
            <Button>Search</Button>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-sm">
                  <th className="p-2 text-left font-medium">Item</th>
                  <th className="p-2 text-left font-medium">Type</th>
                  <th className="p-2 text-left font-medium">Seller</th>
                  <th className="p-2 text-left font-medium">Status</th>
                  <th className="p-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2">{listing.item}</td>
                    <td className="p-2">{listing.type}</td>
                    <td className="p-2">{listing.seller}</td>
                    <td className="p-2">
                      <Badge>{listing.status}</Badge>
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
