import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function NavSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();

  const users = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          type="search"
          placeholder="Search for anything..."
          className="md:w-[100px] lg:w-[300px]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {users
                .filter((user) =>
                  `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(value.toLowerCase()),
                )
                .map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      setValue(`${user.firstName} ${user.lastName}`);
                      setOpen(false);
                      router.push(`/user/${user.id}`);
                    }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
