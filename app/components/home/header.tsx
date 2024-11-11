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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const navItems = [
  { href: "/home", label: "home" },
  { href: "/home/course", label: "course" },
  { href: "/home/broker", label: "broker" },
  { href: "/home/ebook", label: "ebook" },
  { href: "/home/about", label: "about" },
  { href: "/home/portfolio", label: "portfolio" },
  { href: "/home/activity", label: "activity" },
  { href: "/home/bycourse", label: "bycourse" },
  { href: "/home/contact", label: "contact" },
];

interface NavItemProps {
  href: string;
  label: string;
  currentPath: string;
  onClick: (href: string) => void;
}

type HeaderProps = {
  locale: string;
};

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  currentPath,
  onClick,
}) => {
  return (
    //
    <Typography
      as="li"
      key={href}
      variant="small"
      className={`relative pb-1 flex justify-center items-center text-white   ${
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
};

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
      className="hidden lg:inline-block rounded-full"
      style={{ background: "#DF9E10" }}
      onClick={() => router.push(href)}
    >
      <span className="text-sm">{children}</span>
    </Button>
  );
};

export const HeaderHome: React.FC<HeaderProps> = ({ locale }) => {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  // 2 ภาษา
  const t = useTranslations("NavbarLinks");
  const t_login = useTranslations("btn_login");

  const handleChangeLanguage = (newLocale: any) => {
    // const locale = newLocale.target.value;
    const locale = newLocale
    const path = currentPath.split("/").slice(2).join("/");
    router.push(`/${locale}/${path}`);
  };



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
      <ul className="mt-2 mb-4 flex flex-col gap-2 2xl:gap-7 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-5  ">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={`/${locale}${item.href}`}
            label={t(`${item.label}`)}
            currentPath={currentPath}
            onClick={handleNavigation}
          />
        ))}
      </ul>
    ),
    [handleNavigation, currentPath]
  );

  return (
    <div className="max-h-[768px] sticky top-0 z-30">
      <Navbar
        className=" min-w-full  h-max    rounded-none  lg:px-28 mx-auto container "
        style={{
          backgroundColor: "#042044",
          borderBottom: "3px solid #DF9E10",
        }}
      >
        <div className="flex flex-row  items-center justify-between gap-5  ">
          <div className=" w-full lg:w-1/6    ">
            <Link href={`/${locale}/home`}>
              <Image
                src={"/logo_3.png"}
                alt=""
                width={900}
                height={900}
                className=" w-32   object-cover "
              />
            </Link>
          </div>
          <div className="w-full lg:w-5/6  ">
            <div className="flex justify-end">
              <div className="mr-4 hidden   lg:block">{navList}</div>

              <div className="flex rounded-lg gap-4 items-center">
                <HeaderButton href="/login" variant="gradient">
                  {t_login("login")}
                </HeaderButton>

                <div className="flex gap-2">
                <img src="/th.png" alt="" className="w-7 cursor-pointer" onClick={() => handleChangeLanguage('th')} />
                <img src="/en.png" alt="" className="w-7 cursor-pointer" onClick={() => handleChangeLanguage('en')} />
                </div>
                {/* <select
                  value={locale}
                  onChange={(e) => handleChangeLanguage(e)}
                  className="text-gray-900 w-12 h-6 rounded-sm bg-gray-300"
                >
                  <option value="th"> TH </option>
                  <option value="en">EN</option>
                </select> */}
                
              </div>

              <IconButton
                variant="text"
                className=" ml-auto pt-10 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                <IoMenu className="text-2xl " />
              </IconButton>
            </div>

            <div className="flex items-center xl:gap-4 whitespace-nowrap"></div>
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
              className="mb-3 text-white "
              onClick={() => router.push("/login")}
            >
              <span className=" font-semibold text-sm">เข้าสู่ระบบ </span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};
