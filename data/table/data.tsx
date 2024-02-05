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
    bgColor: "bg-green-100 text-green-800",
    icon: CheckCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    bgColor: "bg-yellow-100 text-yellow-700",
    icon: UpdateIcon,
  },
  {
    value: "queued",
    label: "Queued",
    bgColor: "bg-amber-100 text-amber-600",
    icon: CommitIcon,
  },
  {
    value: "succeeded",
    label: "Succeeded",
    bgColor: "bg-emerald-100 text-emerald-700",
    icon: CheckCircledIcon,
  },
  {
    value: "executed",
    label: "Executed",
    bgColor: "bg-indigo-100 text-indigo-500",
    icon: ExclamationTriangleIcon,
  },
  {
    value: "defeated",
    label: "Defeated",
    bgColor: "bg-orange-100 text-orange-600",
    icon: StopwatchIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    bgColor: "bg-red-100 text-red-600",
    icon: CrossCircledIcon,
  },
  {
    value: "expired",
    label: "Expired",
    bgColor: "bg-rose-100 text-rose-700",
    icon: ClockIcon,
  },
];
