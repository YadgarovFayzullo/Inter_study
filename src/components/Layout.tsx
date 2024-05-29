import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import General from "./General";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <General />
      {children}
      
      <Footer />
    </div>
  );
};

export default Layout;
