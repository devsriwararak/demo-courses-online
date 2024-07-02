'use client'
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const SITEMAP = [
    {
        title: "Company",
        // links: ["About Us", "Careers", "Our Team", "Projects"],
        links: ["About Us", "Careers"],
    },
    {
        title: "Help Center",
        // links: ["Discord", "Twitter", "GitHub", "Contact Us"],
        links: ["Discord", "Contact Us"],
    },
    {
        title: "Resources",
        // links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
        links: ["Blog", "Affiliate Program"],
    },
    {
        title: "Products",
        // links: ["Templates", "UI Kits", "Icons", "Mockups"],
        links: ["Templates", "UI Kits"],
    },
];

const currentYear = new Date().getFullYear();

export function FooterHome() {
    const router = useRouter();

    return (
        <footer className="relative w-full bg-gray-200 mt-auto">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="mx-auto grid w-full grid-cols-2 gap-8 py-3 sm:grid-cols-4 md:grid-cols-4 ">
                    {SITEMAP.map(({ title, links }, key) => (
                        <div key={key} className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-bold uppercase opacity-50"
                            >
                                {title}
                            </Typography>
                            <ul className="space-y-1 ">
                                {links.map((link, key) => (
                                    <Typography
                                        key={key}
                                        as="li"
                                        color="blue-gray"
                                        className="font-normal text-sm"
                                    >
                                        <button
                                            onClick={() => router.push(`/${link.toLowerCase().replace(/ /g, '-')}`)}
                                            className="inline-block py-1 pr-2 transition-transform hover:scale-105  whitespace-nowrap"
                                        >
                                            {link}
                                        </button>
                                    </Typography>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
                        Rights Reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    );
}
