"use client";

import { steps } from "@config/steps";

import HowItWorksDesktop from "@components/section/how-it-works/HowItWorksDesktop";
import HowItWorksMobile from "@components/section/how-it-works/HowItWorksMobile";
import SectionHeader from "@components/ui/SectionHeader";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works section"
      className="container pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <SectionHeader
        sectionTitle="How to use Tally Zero"
        title="Three Easy Steps to Get Started"
        description="Tally Zero is designed to be simple and easy to use. Here's how it works."
      />

      <HowItWorksMobile {...steps} />
      <HowItWorksDesktop {...steps} />
    </section>
  );
}
