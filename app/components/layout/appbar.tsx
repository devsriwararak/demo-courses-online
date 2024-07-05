// components/AppbarComponent.tsx
import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

interface AppbarComponentProps {
  isSmallScreen: boolean;
  handleDrawerToggle: () => void;
}

const AppbarComponent: React.FC<AppbarComponentProps> = ({ isSmallScreen, handleDrawerToggle }) => {
  const router = useRouter();
  const login = sessionStorage.getItem("login");
  const statusLogin = localStorage.getItem("Status");

  const handleLogout = (): void => {
    sessionStorage.removeItem("login");
    router.push("/");
  };
  console.log(statusLogin)
  return (
    <div className={`fixed w-full  bg-blue-600 overflow-auto `}>
      <div className="flex justify-between items-center p-3 gap-4">
        {isSmallScreen && (
          <Button variant="text" onClick={handleDrawerToggle} className="text-white text-2xl p-0">
            <FaBars />
          </Button>
        )}
        <div className="text-white text-sm md:text-lg lg:text-xl text-center text-nowrap  ">
          ระบบคอร์สเรียน (เฉพาะธุรกิจ) {statusLogin == "2" ? "Super" : statusLogin == "1" ? "Admin" : statusLogin == "0" ? "user" : ""}
        </div>
        <Button variant="text" onClick={handleLogout} className="text-white text-2xl p-0 mr-5">
          <FaSignOutAlt />
        </Button>
      </div>
    </div>
  );
};

export default AppbarComponent;
