import { Metadata } from "next";
import CanvaStudio from "./studio";

export const metadata: Metadata = {
  title: "Canva Studio | Digital Products Bundle",
  robots: { index: false, follow: false },
};

export default function CanvaAdminPage() {
  return <CanvaStudio />;
}
