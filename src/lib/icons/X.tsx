import { Icon } from "@/components/ui/icon";

export const X = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.27 22.464L1.5 1.536h5.23L22.5 22.464zm4.488-20.928l-8.313 8.915M2.242 22.464l8.307-8.908"
      strokeWidth="1"
    />
  </Icon>
);
