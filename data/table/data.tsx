import {
  CheckCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
  CommitIcon,
  StopwatchIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const states = [
  {
    value: "active",
    label: "Active",
    bgColor: "bg-green-600 hover:bg-green-600/80",
    icon: CheckCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    bgColor: "bg-yellow-500 hover:bg-yellow-500/80",
    icon: UpdateIcon,
  },
  {
    value: "queued",
    label: "Queued",
    bgColor: "bg-amber-500 hover:bg-amber-500/80",
    icon: CommitIcon,
  },
  {
    value: "succeeded",
    label: "Succeeded",
    bgColor: "bg-emerald-600 hover:bg-emerald-600/80",
    icon: CheckCircledIcon,
  },
  {
    value: "executed",
    label: "Executed",
    bgColor: "bg-indigo-500 hover:bg-indigo-500/80",
    icon: ExclamationTriangleIcon,
  },
  {
    value: "defeated",
    label: "Defeated",
    bgColor: "bg-orange-500 hover:bg-orange-500/80",
    icon: StopwatchIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    bgColor: "bg-red-500 hover:bg-red-500/80",
    icon: CrossCircledIcon,
  },
  {
    value: "expired",
    label: "Expired",
    bgColor: "bg-rose-800 hover:bg-rose-800/80",
    icon: ClockIcon,
  },
];
