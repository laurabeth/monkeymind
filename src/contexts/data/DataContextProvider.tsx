import React, { FC, useCallback, useEffect } from "react";
// import Builder from "indexeddb-promised";
import { dataContext } from "./dataContext";

export function create() {}

const DataContextProvider: FC = ({ children }) => {
	// const read = () => {};
	// const update = () => {};
	// const destroy = () => {};
	// const close = () => {};

	const createOrOpenDb = useCallback(() => {
		// const objectStoreConfigs: ObjectStoreConfig<"users", "id"> = {
		// 	name: "users",
		// 	options: {
		// 		keyPath: "id",
		// 	},
		// };
		// return new Builder("MonkeyMind")
		// 	.setVersion(1)
		// 	.addObjectStore({
		// 		name: "users",
		// 		keyType: { keyPath: "id" },
		// 		indexes: [
		// 			{
		// 				name: "username",
		// 				keypath: "username",
		// 				options: { unique: true },
		// 			},
		// 			{
		// 				name: "email",
		// 				keypath: "email",
		// 				options: { unique: true },
		// 			},
		// 		],
		// 	})
		// 	.addObjectStore({
		// 		name: "settings",
		// 		keyType: { keyPath: "id" },
		// 		indexes: [
		// 			{
		// 				name: "user-id",
		// 				keypath: "user-id",
		// 				options: { unique: true },
		// 			},
		// 		],
		// 	})
		// 	.build();
	}, []);

	useEffect(() => {
		createOrOpenDb();
		console.log("Data context render");
	});

	return <dataContext.Provider value={{}}>{children}</dataContext.Provider>;
};

export { DataContextProvider };
