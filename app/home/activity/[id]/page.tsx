import SubActivity from '@/app/components/home/subactivity';
import React from 'react';

// Define the Params type with id as a required field
interface Params {
  id: string;
}

type PageProps = {
  params: Params;
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <SubActivity params={params} />
    </div>
  );
};

export default Page;
