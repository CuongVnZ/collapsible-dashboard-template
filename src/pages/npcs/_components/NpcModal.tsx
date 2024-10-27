import { zodResolver } from "@hookform/resolvers/zod";
import { NPCType } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/utils/api";
import { type NPC, npcSchema } from "./NpcPanel";

interface NpcModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  npcId?: string;
}

export function NpcModal({ isOpen, onClose, mode, npcId }: NpcModalProps) {
  const form = useForm<NPC>({
    resolver: zodResolver(npcSchema),
    defaultValues: {
      name: "",
      description: "",
      type: NPCType.GENERIC,
      locationX: 0,
      locationY: 0,
      locationZ: 0,
      pitch: 0,
      yaw: 0,
      world: "NeoRPG-Main",
    },
  });

  const { toast } = useToast();

  const { data: fetchedNpc, isLoading } = api.npc.getById.useQuery(
    { id: npcId ?? "" },
    { enabled: mode === "edit" && !!npcId },
  );

  const createNpc = api.npc.create.useMutation();
  const updateNpc = api.npc.update.useMutation();

  useEffect(() => {
    if (fetchedNpc) {
      form.reset(npcSchema.parse(fetchedNpc));
    } else if (mode === "create") {
      form.reset();
    }
  }, [fetchedNpc, mode, form]);

  const onSubmit = async (data: NPC) => {
    try {
      toast({
        title: mode === "create" ? "Creating NPC" : "Updating NPC",
        description: `Please wait while we ${mode === "create" ? "create" : "update"} the NPC`,
      });
      if (mode === "create") {
        await createNpc.mutateAsync(data);
      } else {
        await updateNpc.mutateAsync(data);
      }
      toast({
        title: mode === "create" ? "NPC created" : "NPC updated",
        description: `NPC has been ${mode === "create" ? "created" : "updated"} successfully`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `An error occurred while ${mode === "create" ? "creating" : "updating"} the NPC`,
      });
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} NPC:`,
        error,
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create NPC" : "Edit NPC"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NPC type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(NPCType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="locationX"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationY"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Y</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationZ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Z</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="pitch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pitch</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yaw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yaw</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="world"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>World</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={createNpc.isPending || updateNpc.isPending}
            >
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
