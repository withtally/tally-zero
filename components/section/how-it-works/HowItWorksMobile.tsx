import Image from "next/image";
import { type StepType } from "@/types/steps";

import Step from "@components/section/how-it-works/Step";

export default function HowItWorksMobile(steps: StepType[]) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {Object.values(steps).map((step, index) => (
        <div key={step.name}>
          <Step step={step} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute rounded-lg -inset-x-4 bottom-0 top-8 bg-violet-100 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={step.image}
                alt="How it works image"
                width={600}
                height={400}
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
