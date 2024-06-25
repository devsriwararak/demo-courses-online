import { atom } from "recoil";

export const userLoginStore = atom<string | null>({
    key: "userLogin",
    default: null,
});