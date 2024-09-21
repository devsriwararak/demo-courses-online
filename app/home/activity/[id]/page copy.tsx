import axios from "axios";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: String) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news/${id}`
    );
  return res.data;
  } catch (error) {
    console.log(error);
  }
};

const ActivityPage: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);

  return (
    <div className="flex px-24  justify-center mt-10">
      <div className="w-4/12">
      Activity {params.id} 
      </div>
      <hr/>
      <div>
      {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default ActivityPage;
