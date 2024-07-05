import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaClipboardList, FaChartLine, FaChevronUp, FaChevronDown, FaBookReader  } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { userLoginStore } from "@/store/store";

interface MenuItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
  hasDivider?: boolean;
}

interface SubMenuItem {
  text: string;
  path: string;
  hasDivider?: boolean;
}

interface SidebarProps {
  setDrawerOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setDrawerOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useRecoilState(userLoginStore);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [activePath, setActivePath] = useState<string>(pathname);

  // useEffect(() => {
  //   const storedUserName = sessionStorage.getItem('login');
  //   const loginStatus = localStorage.getItem("Status");
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, [setUserName]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const loginStatus = localStorage.getItem("Status");

  const menuItems: MenuItem[] = useMemo(() => {
    switch (loginStatus) {
      case '1':
        return [
          { text: "จัดการคอร์สเรียน", icon: <FaClipboardList />, path: "/admin", hasDivider: false },
          { text: "คอร์ดเรียน", icon: <FaBookReader />, path: "/admin/learning", hasDivider: true },

          // {
          //   text: "Users",
          //   icon: <FaClipboardList />,
          //   subItems: [
          //     { text: "Add User", path: "/admin/add", hasDivider: false },
          //     { text: "Manage Users", path: "/admin/manage", hasDivider: true },
          //   ],
          //   hasDivider: false
          // },
          // { text: "Settings", icon: <FaClipboardList />, path: "/admin/settings", hasDivider: true },

        ];
      case '2':
        return [
          { text: "จัดการแอดมิน", icon: <FaClipboardList />, path: "/super", hasDivider: true },
          { text: "รายงาน", icon: <FaChartLine />, path: "/super/test", hasDivider: false },
          // {
          //   text: "Users",
          //   icon: <FaClipboardList />,
          //   subItems: [
          //     { text: "Add User", path: "/admin/add" },
          //     { text: "Manage Users", path: "/admin/manage" },
          //   ],
          // },
          // { text: "Settings", icon: <FaClipboardList />, path: "/admin/settings" },

        ];
      case '0':
        return [
          { text: "จัดการรายการ", icon: <FaClipboardList />, path: "/user", hasDivider: true },
          { text: "รายงาน", icon: <FaChartLine />, path: "/user/test", hasDivider: true },
        ];
      default:
        return [];
    }
  }, [loginStatus]);

  const handleNavigation = useCallback((path: string) => {
    setActivePath(path);
    router.push(path);
    setDrawerOpen?.(false);
  }, [router, setDrawerOpen]);

  const toggleSubMenu = useCallback((text: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  }, []);

  return (
    <div className={`h-full flex flex-col bg-white ${loginStatus === "1" ? " w-[180px]": " w-[210px]"}`}>
      <div className="flex items-center justify-center h-[52px] bg-blue-600 text-white">
        <Typography className="text-lg">Admin Panel</Typography>
      </div>
      <div className="flex-1 mt-5 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activePath === item.path;
          return (
            <div key={index}>
              <div
                className={`flex items-center px-2 mx-3 py-2 cursor-pointer  ${isActive ? 'bg-gray-400 opacity-90 rounded-md mx-3 ' : ''}`}
                onClick={() => (item.path ? handleNavigation(item.path) : toggleSubMenu(item.text))}
              >
                <div className={`mr-2 ${isActive ? 'text-xl' : ''}`}>
                  {item.icon}
                </div>
                <div className="flex-1  text-nowrap ">{item.text}</div>

                {item.subItems && (
                  <div>
                    {open[item.text] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </div>
              {item.hasDivider && (<div className=" bg-gray-500  h-[2px] mx-3 mt-1 mb-1 " >.</div>)}
              {item.subItems && open[item.text] && (
                <div >
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubItemActive = activePath === subItem.path;
                    return (
                      <div key={subIndex}>
                        <div
                          className={`flex items-center px-4 py-2 cursor-pointer pl-10 ${isSubItemActive ? 'bg-red-200 text-blue-500' : ''}`}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          {subItem.text}
                        </div>
                        <div>
                          {subItem.hasDivider && (<div className=" bg-gray-500   h-[2px] mx-3 mt-1 mb-1 " >.</div>)}
                        </div>
                      </div>
                    );
                  }
                  )}


                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
