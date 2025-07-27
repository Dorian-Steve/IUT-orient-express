import { Icon } from "@/components/ui/icon";

export const Search = (props: React.ComponentProps<typeof Icon>) => (
  <Icon
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      strokeWidth="1.5"
    />
    <path d="M22 22L20 20" strokeWidth="1.5" />
  </Icon>
);
