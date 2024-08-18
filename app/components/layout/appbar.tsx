// components/AppbarComponent.tsx
import React from "react";
import {
  FaBars,
  FaSignOutAlt,
  FaChartLine,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { BsFillPersonLinesFill, BsQuestionCircleFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Input,
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
    <div className={`fixed w-full bg-white border px-3 shadow-sm z-20 `}>
      <div className="flex justify-between items-center p-2 gap-4">
        {isSmallScreen && (
          <Button
            variant="text"
            onClick={handleDrawerToggle}
            className=" text-2xl p-0"
          >
            <FaBars />
          </Button>
        )}
        <div className="  items-center gap-2 text-md hidden sm:flex  text-center text-nowrap text-[#8d80d0] ">
          <div className="text-lg">
            <FaChartLine />
          </div>
          ระบบคอร์สเรียน (หลังบ้าน)
        </div>
        <div className="flex items-center gap-5 ">
          <div className=" hidden md:flex">
            <Input
              label="ค้นหาผู้ใช้"
              color="gray"
              crossOrigin="anonymous"
              icon={<FaSearch className=" text-deep-purple-300" />}
              style={{ backgroundColor: "#f5f5f5" }}
            />
          </div>
          <div className="text-[#a8a4bc] hidden md:flex ">
            <BsQuestionCircleFill />
          </div>
          <div className="text-[#a8a4bc] hidden md:flex">
            <FaBell />
          </div>
          <div className="flex items-center">
            <Menu>
              <MenuHandler>
                <Button variant="text" className="text-white text-2xl p-0 mr-2">
                  <Avatar
                    src="/appmenu.jpg"
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
                <MenuItem onClick={handleLogout}>
                  <div className="flex text-lg  px-3  items-center gap-3 whitespace-nowrap">
                    <IoMdLogOut />
                    <p className="text-sm">Logout</p>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
            <Typography className="text-xs hidden md:flex">Admin</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppbarComponent;
