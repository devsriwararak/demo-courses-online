import axios from 'axios';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async(id: String)=>{
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/homepage/courses/${id}`
          );
          return res.data[0]
    } catch (error) {
        console.log(error);
        
    }
}

const NewsPage: React.FC<PageProps> = async ({ params }) => {
    const data = await fetchData(params.id )
    console.log(data);
    
  return (
    <div>page {params.id}</div>
  );
}

export default NewsPage;