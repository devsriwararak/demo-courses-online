import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaClipboardList,
  FaChartLine,
  FaChevronUp,
  FaChevronDown,
  FaBookReader,
  FaCcAmazonPay,
  FaBriefcase,
  FaAward,
  FaDollarSign,
  FaMoneyBillWave,
  FaThumbsUp,
  FaCashRegister ,
  FaChalkboardTeacher 
} from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { VscNotebook } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";
import { Typography } from "@material-tailwind/react";

interface MenuItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
  hasDivider?: boolean;
}

interface SubMenuItem {
  text: string;
  icon?: React.ReactNode;
  path: string;
  hasDivider?: boolean;
}

interface SidebarProps {
  setDrawerOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setDrawerOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
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
      case "1":
        return [
          {
            text: "จัดการคอร์สเรียน",
            icon: <FaChalkboardTeacher  />,
            path: "/admin",
            hasDivider: false,
          },
          {
            text: "คอร์ดเรียน",
            icon: <FaBookReader />,
            path: "/admin/learning",
            hasDivider: false,
          },
          {
            text: "จัดการซื้อคอร์ดเรียน",
            icon: <FaCcAmazonPay />,
            path: "/admin/pay",
            hasDivider: false,
          },
          {
            text: "สร้างการบ้าน",
            icon: <FaClipboardQuestion />,
            path: "/admin/homework",
            hasDivider: false,
          },
          {
            text: "ข้อมูลเว็ปไซด์",
            icon: <CgWebsite />,
            subItems: [
              {
                text: "Ebook",
                icon: <VscNotebook />,
                path: "/admin/manageebook",
                hasDivider: false,
              },
              {
                text: "ผลงาน",
                icon: <FaAward />,
                path: "/admin/managereviews",
                hasDivider: true,
              },
            ],
            hasDivider: false,
          },
          // { text: "Settings", icon: <FaClipboardList />, path: "/admin/settings", hasDivider: true },
        ];
      case "2":
        return [
          {
            text: "จัดการแอดมิน",
            icon: <FaClipboardList />,
            path: "/super",
            hasDivider: false,
          },
          {
            text: "รายงาน",
            icon: <FaCashRegister  />,
            hasDivider: open["รายงาน"] ? false : true,
            subItems: [
              {
                text: "ยอดขายรวม",
                icon: <FaChartLine />,
                path: "/super/total",
                hasDivider: false,
              },
              {
                text: "ยอดขายดี",
                icon: <FaThumbsUp />,
                path: "/super/good",
                hasDivider: true,
              },
            ],
          },
          {
            text: "จัดการคอร์สเรียน",
            icon: <FaChalkboardTeacher  />,
            path: "/admin",
            hasDivider: false,
          },
          {
            text: "คอร์ดเรียน",
            icon: <FaBookReader />,
            path: "/admin/learning",
            hasDivider: false,
          },
          {
            text: "จัดการซื้อคอร์ดเรียน",
            icon: <FaCcAmazonPay />,
            path: "/admin/pay",
            hasDivider: false,
          },
          {
            text: "สร้างการบ้าน",
            icon: <FaClipboardQuestion />,
            path: "/admin/homework",
            hasDivider: false,
          },
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
      case "0":
        return [
          {
            text: "จัดการรายการ",
            icon: <FaClipboardList />,
            path: "/user",
            hasDivider: true,
          },
          {
            text: "รายงาน",
            icon: <FaChartLine />,
            path: "/user/test",
            hasDivider: true,
          },
        ];
      default:
        return [];
    }
  }, [loginStatus, open]);

  const handleNavigation = useCallback(
    (path: string) => {
      setActivePath(path);
      router.push(path);
      setDrawerOpen?.(false);
    },
    [router, setDrawerOpen]
  );

  const toggleSubMenu = useCallback((text: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  }, []);

  return (
    <div
      className={`h-full flex flex-col bg-white ${
        loginStatus === "1" ? " w-[200px]" : " w-[210px]"
      }`}
    >
      <div className="flex items-center justify-center h-[52px] bg-blue-600 text-white">
        <Typography className="text-lg">Admin Panel</Typography>
      </div>
      <div className="flex-1 mt-5 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activePath === item.path;
          return (
            <div key={index}>
              <div
                className={`flex items-center px-2 mx-3 py-2 cursor-pointer  ${
                  isActive ? "bg-gray-400 opacity-90 rounded-md mx-3 " : ""
                }`}
                onClick={() =>
                  item.path
                    ? handleNavigation(item.path)
                    : toggleSubMenu(item.text)
                }
              >
                <div className={`mr-2 ${isActive ? "text-xl" : ""}`}>
                  {item.icon}
                </div>
                <div className="flex-1  text-nowrap ">{item.text}</div>

                {item.subItems && (
                  <div>
                    {open[item.text] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </div>
              {item.hasDivider && (
                <div className=" bg-gray-500  h-[2px] mx-3 mt-1 mb-1 ">.</div>
              )}
              {item.subItems && open[item.text] && (
                <div>
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubItemActive = activePath === subItem.path;
                    return (
                      <div key={subIndex}>
                        <div
                          className={`flex items-center px-2 mx-3 py-2 cursor-pointer pl-8  ${
                            isSubItemActive
                              ? "bg-gray-400 opacity-90 rounded-md mx-3 "
                              : ""
                          }`}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          <div
                            className={`mr-2 ${
                              isSubItemActive ? "text-xl" : ""
                            }`}
                          >
                            {subItem?.icon}
                          </div>
                          {subItem.text}
                        </div>
                        <div>
                          {subItem.hasDivider && (
                            <div className=" bg-gray-500   h-[2px] mx-3 mt-1 mb-1 ">
                              .
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
