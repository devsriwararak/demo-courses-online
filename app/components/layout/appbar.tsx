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

  const handleLogout = () : void => {
    sessionStorage.removeItem("login");
    router.push("/");
  };

  return (
    <div className={`fixed  w-screen  bg-blue-600`}>
      <div className="flex justify-between items-center p-4">
        {isSmallScreen && (
          <Button variant="text"  onClick={handleDrawerToggle} className="text-white text-2xl p-0">
            <FaBars />
          </Button>
        )}
        <div className="text-white text-xl ">
          ระบบคอร์สเรียน (เฉพาะธุรกิจ) {login}
        </div>
        <Button variant="text" onClick={handleLogout} className="text-white text-2xl p-0 mr-5">
          <FaSignOutAlt />
        </Button>
      </div>
    </div>
  );
};

export default AppbarComponent;
