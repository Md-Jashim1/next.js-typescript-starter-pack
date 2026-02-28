import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className="">
    //   <Navbar />
    //   <main className="h-full min-h-[calc(100vh-0px)]">{children}</main>
    //   <Footer />
    // </div>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow pt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
