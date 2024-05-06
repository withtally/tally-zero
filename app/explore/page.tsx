import Search from "@/components/container/Search"
import StatCards from "@/components/container/StatCard"

export const metadata = {
  title: "Explore DAOs",
}

export default function IndexPage() {
  return (
    <div className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
      <div className="container flex flex-col gap-4 ">
        <StatCards />
        <Search />
      </div>
    </div>
  )
}
