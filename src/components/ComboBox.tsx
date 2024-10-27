import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function Combobox<T>({
  data,
  selectedIds,
  onSelectedChange,
  getDisplayValue,
  getId,
  placeholder,
  emptyMessage,
  limit,
  multiSelect = false,
}: {
  data: T[];
  selectedIds: string[];
  onSelectedChange: (selectedIds: string[]) => void;
  getDisplayValue: (item: T) => string;
  getId: (item: T) => string;
  placeholder: string;
  emptyMessage: string;
  limit?: number;
  multiSelect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data
    .filter((item) =>
      getDisplayValue(item).toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, limit ?? 5);

  const handleSelect = (currentValue: string) => {
    if (multiSelect) {
      if (selectedIds.includes(currentValue)) {
        onSelectedChange(selectedIds.filter((id) => id !== currentValue));
      } else {
        onSelectedChange([...selectedIds, currentValue]);
      }
    } else {
      onSelectedChange([currentValue]);
      setOpen(false);
    }
  };

  const getButtonText = () => {
    if (selectedIds.length === 0) return placeholder;
    if (multiSelect) return `${selectedIds.length} item(s) selected`;
    const selectedItem = data.find((item) => getId(item) === selectedIds[0]);
    return selectedItem ? getDisplayValue(selectedItem) : placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={getId(item)}
                  value={getId(item)}
                  onSelect={handleSelect}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedIds.includes(getId(item))
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {getDisplayValue(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
