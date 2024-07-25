// components/LayoutContent.tsx
import React, { useState, ReactNode, useEffect } from "react";
import dynamic from 'next/dynamic';
import AppbarComponent from "./appbar";
import { useMediaQuery } from "react-responsive";

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });

interface LayoutContentProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const loginStatus = localStorage.getItem("Status");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // const isSmallScreenQuery = useMediaQuery({ query: "(max-width: 751px)" });

  const isSmallScreenQuery = useMediaQuery({
    query: loginStatus === '1' ? "(max-width: 1200px)" : "(max-width: 751px)"
  });

  useEffect(() => {
    setIsSmallScreen(isSmallScreenQuery);
  }, [isSmallScreenQuery]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen overflow-auto md:overflow-hidden  bg-gray-200">
      {!isSmallScreen && <Sidebar />}

      {isSmallScreen && isDrawerOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50" onClick={handleDrawerToggle}></div>
      )}
      <AppbarComponent
        isSmallScreen={isSmallScreen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {isSmallScreen && (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <Sidebar setDrawerOpen={setDrawerOpen} />
        </div>
      )}

      <div className="flex-1 flex flex-col  ">

        <div className="mr-3 mt-[64px] overflow-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutContent;
