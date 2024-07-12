"use client";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { BuyCourseStore } from "@/store/store";
import { Button, Card, Typography } from "@material-tailwind/react";
import ReactPlayer from "react-player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const Study = () => {
  const buyData = useRecoilValue(BuyCourseStore);
  const videoRef = useRef<ReactPlayer>(null);
  const router = useRouter();

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(seconds);
    }
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div
      className="xl:h-[520px] overflow-auto"
      style={{
        backgroundImage:
          "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
      }}
    >
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="flex flex-col w-full justify-center items-center lg:flex-row gap-5 pt-10 lg:px-[300px] overflow-auto">
        <div className="w-[350px]">
          <Card className="h-[450px] w-full overflow-auto gap-5">
            <div className="w-full">
              <ReactPlayer
                ref={videoRef}
                url="https://youtu.be/4_c5EBr0whM"
                controls
                width="100%"
                height="200px"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 ps-3">
                <Typography className="font-bold">เหลือเวลา:</Typography>
                <Typography>100 วัน</Typography>
              </div>
              <div className="flex gap-2 ps-3">
                <Typography className="font-bold">Dec:</Typography>
                <Typography className=" text-justify pr-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                  sed. Ad veritatis voluptatibus reiciendis eius. Beatae omnis
                  officiis tempore vel!
                </Typography>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[300px]">
          <Card className="h-[450px] w-full overflow-auto gap-5">
            <Typography className="font-bold p-4">Tag List</Typography>
            <div className="px-4">
              <Button className="w-full mb-2" onClick={() => seekTo(0)}>
                เริ่มต้นเนื้อหา (0:00)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(2100)}>
                บทที่ 2 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(5100)}>
                บทที่ 3 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(9100)}>
                บทที่ 4 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 5 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 6 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 7 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 8 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 9 (3:30)
              </Button>
              <Button className="w-full mb-2" onClick={() => seekTo(18100)}>
                บทที่ 10 (3:30)
              </Button>
              {/* Add more buttons as needed */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Study;
