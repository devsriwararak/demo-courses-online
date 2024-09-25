"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface SubCoursePathProps {
  data: any; // Use a more specific type if available
}

const SubCoursePath: React.FC<SubCoursePathProps> = ({ data }) => {
  const router = useRouter();

  const handleRedirect = () => {
    const userId = data?.product_id; // Retrieve the product ID from the data
    if (userId) {
      // Construct the URL manually with the query parameter
      // router.push(`/login?id=${userId}`);
      router.push(`/login?id=${userId}&number=0`);
    } else {
      console.error("Product ID is missing");
    }
  };
  const handleRedirect1 = () => {
    const userId = data?.product_id; // Retrieve the product ID from the data
    if (userId) {
      // Construct the URL manually with the query parameter
      // router.push(`/login?id=${userId}`);
      router.push(`/login?id=${userId}&number=1`);
    } else {
      console.error("Product ID is missing");
    }
  };

  return (
    <div className="bg-gray-100 shadow p-4 rounded">
      <h2 className="text-md lg:text-lg font-bold mb-2">รายละเอียดการเรียน</h2>
      <p>คอร์สนี้เหมาะสำหรับ... {data?.product_id}</p>
      {data?.products_price === 0 ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
          onClick={handleRedirect}
        >
          ดูคอร์สเรียนนี้
        </button>
      ) : (
        <button
          className="bg-[#184785] text-white px-4 py-2 rounded-md w-full"
          onClick={handleRedirect1}
        >
          ซื้อคอร์สเรียนนี้
        </button>
      )}
      <div className="mt-4">
        <h3 className="text-sm lg:text-md font-bold">
          Certificate of Completion
        </h3>
      </div>
    </div>
  );
};

export default SubCoursePath;
