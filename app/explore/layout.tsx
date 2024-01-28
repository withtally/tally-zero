import { Web3ModalProvider } from "@/components/Web3ModalProvider";

export const metadata = {
  title: "Explore",
};

interface ExploreLayoutProps {
  children: React.ReactNode;
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <main>
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </main>
  );
}
