// components/AppbarComponent.tsx
import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

interface AppbarComponentProps {
  isSmallScreen: boolean;
  handleDrawerToggle: () => void;
}

const AppbarComponent: React.FC<AppbarComponentProps> = ({
  isSmallScreen,
  handleDrawerToggle,
}) => {
  const router = useRouter();
  // const login = sessionStorage.getItem("login");
  const statusLogin = localStorage.getItem("Status");

  const handleLogout = (): void => {
    sessionStorage.removeItem("login");
    router.push("/");
  };
  return (
    <div className={`fixed w-full bg-indigo-500 overflow-auto`}>
      <div className="flex justify-between items-center p-3 gap-4">
        {isSmallScreen && (
          <Button
            variant="text"
            onClick={handleDrawerToggle}
            className="text-white text-2xl p-0"
          >
            <FaBars />
          </Button>
        )}
        <div className="text-white text-sm md:text-lg lg:text-lg text-center text-nowrap">
          ระบบคอร์สเรียน (หลังบ้าน)
        </div>
        <div className="flex items-center">
        <Menu>
          <MenuHandler>
            <Button variant="text" className="text-white text-2xl p-0 mr-5">
              <Avatar
                src="/person.png"
                alt="User Avatar"
                size="sm"
                className="cursor-pointer "
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-2  rounded-lg shadow-xl">
            <MenuItem>
              <div className="flex text-lg  px-3  items-center gap-3 whitespace-nowrap">
                <BsFillPersonLinesFill />
                <p className="text-sm">แก้ไขประวัติส่วนตัว</p>
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogout} >
              <div className="flex text-lg  px-3  items-center gap-3 whitespace-nowrap">
                <IoMdLogOut />
                <p className="text-sm">Logout</p>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
        <Typography className="text-white">Administrator</Typography>
        </div>
      </div>
    </div>
  );
};

export default AppbarComponent;
