export async function deleteDatabase(dbName: string) {
	return new Promise<boolean>((resolve, reject) => {
		const request = window.indexedDB.deleteDatabase(dbName);
		request.onerror = () => {
			reject(false);
		};
		request.onsuccess = () => {
			resolve(true);
		};
	});
}

export async function openDatabase(
	dbName: string,
	version?: number,
): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		let request: IDBOpenDBRequest;
		if (version) {
			request = window.indexedDB.open(dbName, version);
		} else {
			request = window.indexedDB.open(dbName);
		}

		request.onerror = () => {
			reject(request.error);
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
	});
}
