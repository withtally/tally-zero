import {
  CheckCircledIcon,
  ClockIcon,
  CommitIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  StopwatchIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";

export const states = [
  {
    value: "active",
    label: "Active",
    bgColor:
      "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200",
    icon: CheckCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    bgColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-400",
    icon: UpdateIcon,
  },
  {
    value: "queued",
    label: "Queued",
    bgColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400",
    icon: CommitIcon,
  },
  {
    value: "succeeded",
    label: "Succeeded",
    bgColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-400",
    icon: CheckCircledIcon,
  },
  {
    value: "executed",
    label: "Executed",
    bgColor:
      "bg-indigo-100 text-indigo-500 dark:bg-indigo-900/60 dark:text-indigo-100",
    icon: ExclamationTriangleIcon,
  },
  {
    value: "defeated",
    label: "Defeated",
    bgColor:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/60 dark:text-orange-200",
    icon: StopwatchIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    bgColor: "bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-100",
    icon: CrossCircledIcon,
  },
  {
    value: "expired",
    label: "Expired",
    bgColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200",
    icon: ClockIcon,
  },
];

export const optimismStates = [
  {
    value: "active",
    label: "Active",
    bgColor:
      "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200",
    icon: CheckCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    bgColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-400",
    icon: UpdateIcon,
  },
  {
    value: "closed",
    label: "Closed",
    bgColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200",
    icon: CrossCircledIcon,
  },
];
