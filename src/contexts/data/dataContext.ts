import { createContext } from "react";
import { DataContext } from "./types";

export const dataContext = createContext<DataContext>({
	// create: () => {
	// 	throw new Error("create cannot be called without parent DataContextProvider");
	// },
	// read: () => {
	// 	throw new Error("read cannot be called without parent DataContextProvider");
	// },
	// update: () => {
	// 	throw new Error("update cannot be called without parent DataContextProvider");
	// },
	// destroy: () => {
	// 	throw new Error("destroy cannot be called without parent DataContextProvider");
	// },
});
