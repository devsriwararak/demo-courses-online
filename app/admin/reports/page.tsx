"use client";
import { Button, Input } from "@material-tailwind/react";
import React from "react";

const page = () => {
  return (
    <div className=" container mx-auto  px-8 py-8">
        {/* Box 1 */}
      <div className="flex flex-col lg:flex-row gap-4">
        <section className="w-2/3 ">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white">
              <Input
                type="text"
                label="วันที่เริ่มต้น"
                crossOrigin="anonymous"
                color="purple"
              />
            </div>
            <div className="bg-white">
              <Input
                type="text"
                label="วันที่สิ้นสุด"
                crossOrigin="anonymous"
                color="purple"
              />
            </div>
            <Button color="purple" size="sm" className="text-sm">
              ค้นหา
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <section className="w-full bg-white rounded-md shadow-lg px-6 py-6">
              111
            </section>
            <section className="w-full bg-white rounded-md shadow-lg px-6 py-6">
              111
            </section>
            <section className="w-full bg-white rounded-md shadow-lg px-6 py-6">
              111
            </section>
          </div>
        </section>
        <section className="w-1/3 bg-white rounded-md shadow-lg flex justify-center items-center">
          <div className=" bg-purple-200 ">รูปคอร์สอันดับ 1</div>
        </section>
      </div>

      {/* Box 2 */}

      <div className="flex flex-col lg:flex-row gap-4 mt-8">
        <section className="bg-white rounded-md shadow-lg px-6 py-80 w-full">111</section>
        <section className="bg-white rounded-md shadow-lg px-6 py-80 w-full" >111</section>

      </div>
    </div>
  );
};

export default page;
