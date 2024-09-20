import Carousel from "../carousel";

// const truncateText = (text: string, limit: number) => {
//   if (text.length > limit) {
//     return text.substring(0, limit) + "...";
//   }
//   return text;
// };

const HomePage: React.FC = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url('/top-banner-bg.jpg')`,
          backgroundSize: "cover", 
          backgroundPosition: "center", 
        }}
        className=" h-[650px]   "
      >
        <div className="flex flex-col  2xl:px-[300px] pt-[80px]  h-full">
          <div>
            <h1 className=" text-white lg:text-[70px]   font-semibold">
              คอร์สสอนเทรด
            </h1>
          </div>
          <div>
            <h1 className=" txt-xl lg:text-[60px] 2xl:ps-[130px] font-semibold text-[#DF9E10]">
              สู่นักเทรดมืออาชีพ
            </h1>
          </div>

          <div className="  2xl:mt-[90px] ">
            <Carousel />
          </div>
        </div>
      </div>

      {/* section - 2 */}

      {/* <div className=" px-6 md:px-28">
        <div className="mt-8">
          <Typography className="text-lg font-bold">
            คอร์สแนะนำ โปรแกรมพร้อมใช้งานงวดที่ 3/3
          </Typography>
        </div>
        <div className=" flex flex-col md:flex-row flex-wrap gap-2 justify-start mt-6 ">
          {courseCategories.map((category, index) => (
            <Button
              key={index}
              variant="outlined"
              className={`${
                selectedCategory === category
                  ? "bg-purple-500 text-white"
                  : "border border-purple-500 text-purple-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex justify-center mt-4 ">
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 ">
            {recommendedCourses.map((course, index) => (
              <Card
                key={index}
                className="w-full mt-5  flex flex-col justify-between border border-gray-300 cursor-pointer"
                onClick={() => handleBuyNow(course)}
              >
                <div>
                  <div className="flex w-full h-[200px]">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={500}
                      height={500}
                      priority
                      className="rounded-lg rounded-b-none object-cover mb-4"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  <div className="px-2 md:px-4 mt-5 ">
                    <Typography className="text-lg font-semibold text-black ps-2">
                      {truncateText(course.title, 30)}
                    </Typography>

                    <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                      {truncateText(course.dec, 90)}
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col mt-4 px-6 pb-5 ">
                  <div className="flex w-full text-wrap gap-3">
                    <Typography
                      className={`text-xl ${
                        course.price_sale > 0
                          ? "text-red-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }  mb-2  pr-1`}
                    >
                      {course?.price_sale > 0
                        ? course?.price_sale.toLocaleString()
                        : course?.price.toLocaleString()}{" "}
                      บาท
                    </Typography>
                    <Typography className="  line-through  mb-2  pr-1">
                      {course?.price_sale > 0
                        ? course?.price.toLocaleString()
                        : ""}{" "}
                    </Typography>
                  </div>
                  <Button
                    className="w-full justify-center items-center text-base font-normal "
                    variant="outlined"
                    color="purple"
                    size="sm"
                    // style={{
                    //   backgroundImage:
                    //     "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    // }}
                    onClick={() => handleBuyNow(course)}
                  >
                    ซื้อตอนนี้
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
       
      </div> */}
    </div>
  );
};

export default HomePage;
