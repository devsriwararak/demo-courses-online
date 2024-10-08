"use client";
import { useCallback, useState, useEffect, useMemo } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  ButtonProps,
} from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/home", label: "หน้าหลัก" },
  { href: "/home/course", label: "คอร์สเรียน" },
  { href: "/home/broker", label: "โบรกเกอร์" },
  { href: "/home/ebook", label: "EBook" },
  { href: "/home/about", label: "เกี่ยวกับเรา" },
  { href: "/home/portfolio", label: "ผลงาน" },
  { href: "/home/activity", label: "กิจกรรม" },
  { href: "/home/bycourse", label: "วิธีการซื้อคอร์ส" },
  { href: "/home/contact", label: "ติดต่อเรา" },
];

interface NavItemProps {
  href: string;
  label: string;
  currentPath: string;
  onClick: (href: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  currentPath,
  onClick,
}) => (
  <Typography
    as="li"
    key={href}
    variant="small"
    className={`relative pb-1 flex justify-center items-center text-white font-semibold  ${
      currentPath === href ? "active " : ""
    }`}
  >
    <button
      onClick={() => onClick(href)}
      className="inline-block py-1 pr-2 pt-3 text-[16px] transition-transform hover:scale-105"
    >
      {label}
    </button>
  </Typography>
);

interface HeaderButtonProps {
  href: string;
  variant: ButtonProps["variant"];
  children: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  href,
  variant,
  children,
}) => {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      size="sm"
      className="hidden lg:inline-block"
      style={{ background: "#DF9E10" }}
      onClick={() => router.push(href)}
    >
      <span className="font-semibold px-1 text-[16px]">{children}</span>
    </Button>
  );
};

export function HeaderHome() {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
      if (openNav) {
        setOpenNav((prevOpenNav) => !prevOpenNav);
      }
    },
    [router, openNav]
  );

  const navList = useMemo(
    () => (
      <ul className="mt-2 mb-4 flex flex-col gap-2 2xl:gap-7 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-5">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            currentPath={currentPath}
            onClick={handleNavigation}
          />
        ))}
      </ul>
    ),
    [handleNavigation, currentPath]
  );

  return (
    <div className="max-h-[768px]">
      <Navbar
        className="sticky min-w-full  top-0 z-10 h-max    rounded-none  lg:px-60  mx-auto container "
        style={{
          backgroundColor: "#042044",
          borderBottom: "3px solid #DF9E10",
        }}
      >



        <div className="flex flex-row w-full  items-center justify-between gap-5 ">
          <div className=" items-center w-full  ">
            <Link href="/home">
            <Image
              src={"/logonavbar.svg"}
              alt=""
              width={120}
              height={120}
              className=" object-cover "
            />
            </Link>
          </div>
          <div className="w-full">
            <div className="flex items-center xl:gap-4 whitespace-nowrap">
              <div className="mr-4 hidden   lg:block">{navList}</div>
              <div className="flex rounded-lg">
                <HeaderButton href="/login" variant="gradient">
                  เข้าสู่ระบบ
                </HeaderButton>
              </div>
              <IconButton
                variant="text"
                className="ml-auto pt-10 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                <IoMenu className="text-2xl " />
              </IconButton>
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center justify-center gap-x-1">
            <Button
              fullWidth
              variant="outlined"
              size="sm"
              style={{ background: "#DF9E10" }}
              className="mb-3 text-white font-semibold"
              onClick={() => router.push("/login")}
            >
              <span className=" font-semibold text-sm">เข้าสู่ระบบ</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
