import clsx from "clsx";
import Image from "next/image";

import { type StepType } from "@/types/steps";
import { Tab } from "@headlessui/react";

import Step from "@components/section/how-it-works/Step";

export default function HowItWorksDesktop(steps: StepType[]) {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {Object.values(steps).map((step, stepIndex) => (
              <Step
                key={step.name}
                step={{
                  ...step,
                  name: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {step.name}
                    </Tab>
                  ),
                }}
                isActive={stepIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative rounded-lg mt-20 overflow-hidden rounded-4xl bg-violet-200 dark:bg-violet-950/30 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {Object.values(steps).map((step, stepIndex) => (
                <Tab.Panel
                  static
                  key={step.name}
                  className={clsx(
                    "px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none",
                    stepIndex !== selectedIndex && "opacity-60"
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={stepIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={step.image}
                      alt="How it works image"
                      width={720}
                      height={300}
                      sizes="52.75rem"
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}
