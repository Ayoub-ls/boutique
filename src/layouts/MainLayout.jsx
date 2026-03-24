import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <Header />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-0 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
