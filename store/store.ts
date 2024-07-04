// import { atom } from "recoil";

// export const userLoginStore = atom<string | null>({
//     key: "userLogin",
//     default: null,
// });

import { atom } from 'recoil';

export const userLoginStore = atom<number | null>({
  key: 'userLoginStore',
  default: 0,
});
