import { type SectionHeaderProps } from "@/types/section-header"

export default function SectionHeader({
  sectionTitle,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-violet-600 dark:text-violet-400 tracking-wide">
        {sectionTitle}
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {title}
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
