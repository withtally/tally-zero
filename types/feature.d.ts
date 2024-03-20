import { type Step } from "@/types/steps";

export type FeatureProps = {
  step: Step;
  isActive?: boolean;
} & React.ComponentPropsWithoutRef<"div">;
