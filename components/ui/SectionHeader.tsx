import { type SectionHeaderProps } from "@/types/section-header";

export default function SectionHeader({
  sectionTitle,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-blue-600">
        {sectionTitle}
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
    </div>
  );
}
