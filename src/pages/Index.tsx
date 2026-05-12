import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import CoursesPage from "@/components/CoursesPage";
import WebinarsPage from "@/components/WebinarsPage";
import ProfilePage from "@/components/ProfilePage";
import AdaptationPage from "@/components/AdaptationPage";
import InstructionsPage from "@/components/InstructionsPage";

export type Page = "home" | "courses" | "webinars" | "profile" | "adaptation" | "instructions";

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage setPage={setActivePage} />;
      case "courses": return <CoursesPage />;
      case "webinars": return <WebinarsPage />;
      case "profile": return <ProfilePage />;
      case "adaptation": return <AdaptationPage />;
      case "instructions": return <InstructionsPage />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage={activePage} setPage={setActivePage} />
      <main className="animate-fade-in">
        {renderPage()}
      </main>
    </div>
  );
}
