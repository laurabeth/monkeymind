import React, { FC, useCallback, useMemo } from "react";
import Builder from "indexeddb-promised";
import { dataContext } from "./dataContext";

// function create<T> (data: T) {

// }

const DataContextProvider: FC = ({ children }) => {
	// const read = () => {};
	// const update = () => {};
	// const destroy = () => {};

	const createOrOpenDb = useCallback(() => {
		return new Builder("MonkeyMind")
			.setVersion(1)
			.addObjectStore({
				name: "users",
				keyType: { keyPath: "id" },
				indexes: [
					{
						name: "username",
						keypath: "username",
						options: { unique: true },
					},
					{
						name: "email",
						keypath: "email",
						options: { unique: true },
					},
				],
			})
			.addObjectStore({
				name: "settings",
				keyType: { keyPath: "id" },
				indexes: [
					{
						name: "user-id",
						keypath: "user-id",
						options: { unique: true },
					},
				],
			})
			.build();
	}, []);

	const db = useMemo(createOrOpenDb, [createOrOpenDb]);

	console.log(db);

	return <dataContext.Provider value={{}}>{children}</dataContext.Provider>;
};

export { DataContextProvider };
