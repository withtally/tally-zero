import { Web3ModalProvider } from "@context/Web3ModalProvider";

export const metadata = {
  title: "Explore",
};

interface ExploreLayoutProps {
  children: React.ReactNode;
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
      <Web3ModalProvider>{children}</Web3ModalProvider>
  );
}
