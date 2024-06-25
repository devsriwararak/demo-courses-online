import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaClipboardList, FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { userLoginStore } from "@/store/store";

interface MenuItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  path: string;
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

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('login');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [setUserName]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const menuItems: MenuItem[] = useMemo(() => {
    switch (userName) {
      case 'admin':
        return [
          { text: "จัดการรายการ", icon: <FaClipboardList />, path: "/admin" },
          { text: "รายงาน", icon: <FaChartLine />, path: "/admin/report" },

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
      case 'super':
        return [
          { text: "จัดการรายการ", icon: <FaClipboardList />, path: "/super" },
          { text: "รายงาน", icon: <FaChartLine />, path: "/super/test" },

        ];
      case 'user':
        return [
          { text: "จัดการรายการ", icon: <FaClipboardList />, path: "/user" },
          { text: "รายงาน", icon: <FaChartLine />, path: "/user/test" },
        ];
      default:
        return [];
    }
  }, [userName]);

  const handleNavigation = useCallback((path: string) => {
    setActivePath(path);
    router.push(path);
    setDrawerOpen?.(false);
  }, [router, setDrawerOpen]);

  const toggleSubMenu = useCallback((text: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  }, []);

  return (
    <div className="h-full flex flex-col bg-white w-[160px]">
      <div className="flex items-center justify-center h-[60px] bg-blue-600 text-white">
        <Typography className="text-lg">Admin Panel</Typography>
      </div>
      <div className="flex-1 mt-5 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activePath === item.path;
          return (
            <React.Fragment key={index}>
              <div
                className={`flex items-center px-4 py-2 cursor-pointer ${isActive ? 'bg-gray-400 opacity-90 rounded-md' : ''}`}
                onClick={() => (item.path ? handleNavigation(item.path) : toggleSubMenu(item.text))}
              >
                <div className={`mr-2 ${isActive ? 'text-xl' : ''}`}>
                  {item.icon}
                </div>
                <div className="flex-1">{item.text}</div>
                {item.subItems && (
                  <div>
                    {open[item.text] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </div>
              {item.subItems && open[item.text] && (
                <div className="pl-8">
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubItemActive = activePath === subItem.path;
                    return (
                      <div
                        key={subIndex}
                        className={`flex items-center px-4 py-2 cursor-pointer ${isSubItemActive ? 'bg-red-200 text-blue-500' : ''}`}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        {subItem.text}
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
