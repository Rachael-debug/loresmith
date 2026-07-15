import { IconSettings2 } from "@tabler/icons-react";;
import { useTheme } from "../theme/theme";

interface worldnavlabel {
  title: string;
  world?: string | undefined;
  children?: any;
}

export default function WorldNav({ title, world, children }: worldnavlabel) {
  const { theme } = useTheme();

  return (
    <div className="">
        <div
      className={`flex items-center justify-between px-4 py-2 font-display border-b border-b-border  ${theme.id === "literary-historical" ? "bg-bg-surface-alt after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1a1a14] after:opacity-[0.06]" : " bg-bg-surface "}`}
    >
      <div>
        <p>{title}</p>
        <p
          className={`text-xs italic font-body font-light text-text-secondary`}
        >
          {world}
        </p>
      </div>
      <div>
        <div className="flex gap-2">
          {children}
          <button>
            <IconSettings2 size={16} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
