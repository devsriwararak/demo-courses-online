'use client'
import { useCallback, useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";

const navItems = [
    { href: '/', label: 'หน้าหลัก' },
    { href: '/home/broker', label: 'โบรกเกอร์' },
    { href: '/home/ebook', label: 'EBook' },
    { href: '/home/about', label: 'เกี่ยวกับเรา' },
    { href: '/home/Portfolio', label: 'ผลงาน' },
    { href: '/home/activity', label: 'กิจกรรม' },
    { href: '/home/bycourse', label: 'วิธีการซื้อคอร์ส' },
    { href: '/home/Contact', label: 'ติดต่อเรา' },
];

export function HeaderHome() {
    const [openNav, setOpenNav] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavigation = useCallback((href: string) => {
        router.push(href);
    }, [router]);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {navItems.map((item) => (
                <Typography
                    as="li"
                    key={item.href}
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <button
                        onClick={() => handleNavigation(item.href)}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                    >
                        {item.label}
                    </button>
                </Typography>
            ))}
        </ul>
    );

    return (
        <div className="max-h-[768px] ">
            <Navbar className="sticky min-w-full top-0 z-10 h-max rounded-none px-4 py-0 lg:px-8 bg-gray-200">
                <div className="flex w-full items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium sm:text-sm lg:text-2xl"
                    >
                        Material Tailwind
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="outlined"
                                size="sm"
                                className="hidden lg:inline-block" onClick={() => router.push('/register')}
                            >
                                <span>Register</span>
                            </Button>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                                onClick={() => router.push('/login')}
                            >
                                <span>Log In</span>
                            </Button>

                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            <IoMenu className="text-2xl" />
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="outlined" size="sm" className="mb-3" onClick={() => router.push('/register')}>
                            <span>Register</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="mb-3" onClick={() => router.push('/login')}>
                            <span>Log In</span>
                        </Button>

                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}
