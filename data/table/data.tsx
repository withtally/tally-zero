import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
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
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    icon: StopwatchIcon,
  },
  {
    value: "queued",
    label: "Queued",
    icon: StopwatchIcon,
  },
  {
    value: "succeeded",
    label: "Succeeded",
    icon: CheckCircledIcon,
  },
  {
    value: "executed",
    label: "Executed",
    icon: CrossCircledIcon,
  },
  {
    value: "defeated",
    label: "Defeated",
    icon: CrossCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    value: "expired",
    label: "Expired",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
