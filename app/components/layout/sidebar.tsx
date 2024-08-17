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
  FaCashRegister,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { IoAccessibility } from "react-icons/io5";
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
            text: "หมวดหมู่",
            icon: <FaChalkboardTeacher />,
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
                hasDivider: false,
              },
              {
                text: "กิจกรรม",
                icon: <IoAccessibility />,
                path: "/admin/manageactivity",
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
            icon: <FaCashRegister />,
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
            icon: <FaChalkboardTeacher />,
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
                hasDivider: false,
              },
              {
                text: "กิจกรรม",
                icon: <IoAccessibility />,
                path: "/admin/manageactivity",
                hasDivider: true,
              },
            ],
            hasDivider: false,
          },
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
      <div className="flex pt-1 items-center justify-center h-[52px]  ">
        <Typography className="text-lg">ระบบคอร์สเรียน</Typography>
        {/* <Typography className="">หลังบ้าน</Typography> */}
      </div>
      <div className="flex-1 mt-5 px-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activePath === item.path;
          return (
            <div key={index}>
              <div
                className={`flex items-center   py-1 cursor-pointer text-sm    ${
                  isActive
                    ? "  bg-opacity-70 rounded-lg py-1 border-white  text-white   "
                    : ""
                }`}
                // style={isActive ? { backgroundColor: "#8d80d0" } : {}}
                onClick={() =>
                  item.path
                    ? handleNavigation(item.path)
                    : toggleSubMenu(item.text)
                }
              >
                <div
                  className="flex w-full p-2 rounded-lg "
                  style={isActive ? { backgroundColor: "#8d80d0" } : {}}
                >
                  <div
                    className={`mr-2 text-lg text-gray-800 ${
                      isActive ? "text-xl text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div
                    className={`flex-1 text-gray-600  text-nowrap ${
                      isActive ? " text-white" : ""
                    } `}
                  >
                    {item.text}
                  </div>
                </div>

                {item.subItems && (
                  <div className="text-[#a8a4bc]">
                    {open[item.text] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </div>
              {item.hasDivider && (
                <div className=" bg-[#f4f2ff]  h-[1px] mx-3 mt-1 mb-1  ">.</div>
              )}
              {item.subItems && open[item.text] && (
                <div>
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubItemActive = activePath === subItem.path;
                    return (
                      <div key={subIndex}>
                        <div
                          className={`flex items-center text-gray-600 py-1  cursor-pointer  text-sm   ${
                            isSubItemActive
                              ? "text-white  border-white rounded-lg    "
                              : ""
                          }`}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          <div
                          className="flex w-full p-1.5 pl-4 rounded-lg "
                            style={
                              isSubItemActive
                                ? { backgroundColor: "#8d80d0" }
                                : {}
                            }
                          >
                            <div
                              className={`mr-2  ${
                                isSubItemActive ? "text-xl " : ""
                              }`}
                            >
                              {/* {subItem?.icon} */}
                            </div>
                            {subItem.text}
                          </div>
                        </div>
                        <div>
                          {subItem.hasDivider && (
                            <div className=" bg-[#f4f2ff]  h-[2px] mx-3 mt-1 mb-1 ">
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
