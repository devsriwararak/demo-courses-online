import React from 'react'
import Page from '@/app/home/about/page'
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';


const page = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  return (
   <div>
     <Page />
   </div>
  )
}

export default page