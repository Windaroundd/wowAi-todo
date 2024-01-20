import { atom } from "recoil";
import { localServices } from "../../../services/localServices";

export const todoListAtom = atom({
  key: "todoList",
  default: localServices.get(),
});
