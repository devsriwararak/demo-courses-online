// LearningPage.tsx
"use client";
import {
    Card,
    Button,
    Input,
    Select,
    Option,
    ThemeProvider,
} from "@material-tailwind/react";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";

import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => import('./richTextEditor'), { ssr: false });


interface Category {
    id: number;
    name: string;
}

const theme = {
    input: {
        styles: {
            base: {
                container: {
                    width: "w-auto",
                    minWidth: "min-w-[100px]",
                },
            },
        },
    },
};

const LearningPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [image, setImage] = useState<string | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [editorData, setEditorData] = useState<string>("");



    const fetchCategory = useCallback(async () => {
        const requestData = { page, search: searchQuery };
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/category`,
                requestData,
                { ...HeaderAPI(localStorage.getItem("Token")) }
            );
            if (res.status === 200) {
                setCategories(res.data.data);
            } else {
                toast.error("error");
            }
        } catch (error) {
            console.error(error);
            toast.error("error");
        }
    }, [page, searchQuery]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory, page]);

    const handleCategoryChange = (value: string | undefined) => {
        setSelectedCategory(value);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    canvas.width = 1200;
                    canvas.height = 800;
                    ctx.drawImage(img, 0, 0, 1200, 800);
                    const resizedImage = canvas.toDataURL("image/jpeg");
                    setImage(resizedImage);
                }
            };
            img.onerror = () => {
                toast.error("Invalid image file.");
                event.target.value = ""; // Reset input value
            };
        } else {
            toast.error("Please upload a valid image file.");
        }
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideo(file);
        } else {
            toast.error("Please upload a valid video file.");
        }
    };

    return (
        <ThemeProvider value={theme}>
            <div className="flex justify-center gap-3">
                <ToastContainer autoClose={2000} theme="colored" />
                <div className="w-7/12">
                    <Card className="flex h-[85vh] overflow-auto">
                        <div className="flex flex-col w-full p-5 gap-4">
                            <div>
                                <Input label="หัวข้อ" crossOrigin="anonymous" />
                            </div>
                            <div className="flex flex-col gap-5 xl:flex-row md:justify-between">
                                <div className="w-full xl:w-4/12">
                                    <Input label="ราคาปกติ" type="number" min={0} crossOrigin="anonymous" />
                                </div>
                                <div className="w-full xl:w-4/12">
                                    <Input label="ราคาส่วนลด" type="number" min={0} crossOrigin="anonymous" />
                                </div>
                                <div className="w-full xl:w-4/12">
                                    <Select label="หมวดหมู่" onChange={handleCategoryChange}>
                                        {categories.map((category) => (
                                            <Option key={category.id} value={category.name}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 xl:flex-row">
                                <div className="w-full xl:w-4/12">
                                    <Input
                                        label="Uploadรูปหน้าปก"
                                        type="file"
                                        crossOrigin="anonymous"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <div className="w-full xl:w-4/12">
                                    <Input
                                        label="Upload VDO"
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        crossOrigin="anonymous"
                                    />
                                </div>
                            </div>
                            <div>
                                <CustomEditor />
                            </div>
                            <div className="flex flex-col gap-5 md:flex-row justify-end">
                                <div className="md:w-[100px]">
                                    <Button color="blue" size="sm" className="w-full">
                                        บันทึก
                                    </Button>
                                </div>
                                <div className="md:w-[100px]">
                                    <Button color="green" size="sm" className="w-full">
                                        สร้างใหม่
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-5/12">
                    <Card className="flex h-[85vh]">
                        <div></div>
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default LearningPage;
