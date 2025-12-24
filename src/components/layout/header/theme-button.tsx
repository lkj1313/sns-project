import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CheckIcon, SunIcon } from "lucide-react";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { useSetTheme, useTheme } from "@/store/theme";

const THEMES: Theme[] = ["system", "dark", "light"];

export default function ThemeButton() {
  const currentTheme = useTheme();
  const setTheme = useSetTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <SunIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-0">
        {THEMES.map((theme) => (
          <PopoverClose key={`theme-button-${theme}`} asChild>
            <div
              onClick={() => setTheme(theme)}
              className="hover:bg-muted flex cursor-pointer items-center justify-between p-3"
            >
              {theme}
              {currentTheme === theme && <CheckIcon className="h-4 w-4" />}
            </div>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
