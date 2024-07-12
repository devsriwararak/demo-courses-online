

import { atom } from 'recoil';

interface Course {
  title: string;
  dec: string;
  image: string;
  price: number;
  price_sale: number;
}


export const BuyCourseStore = atom<Course | null>({
  key: 'bycourseKey',
  default: null,
});
