import {
	IndexConfig,
	IndexConfigs,
	IndexedDbConfig,
	Indexes,
	ObjectStoreConfig,
	ObjectStores,
	OnUpgradeOptions,
} from "./types";

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

// IdbOsNames extends string, IdbOsKeys extends string, IdbINames extends string
export async function openDatabase<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
>(
	dbName: string,
	options?: IndexedDbConfig<IdbOsNames, IdbOsKeys, IdbINames>,
): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		let request: IDBOpenDBRequest;

		if (options?.version) {
			request = window.indexedDB.open(dbName, options.version);
		} else {
			request = window.indexedDB.open(dbName);
		}

		if (options && options.onUpgrade) {
			request.onupgradeneeded = options.onUpgrade(request, options);
		} else if (options) {
			request.onupgradeneeded = onUpgrade(request, options);
		} else {
			request.onupgradeneeded = onUpgrade(request);
		}

		request.onerror = () => {
			reject(request.error);
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
	});
}

function onUpgrade<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
>(
	request: IDBOpenDBRequest,
	upgradeOptions?: OnUpgradeOptions<IdbOsNames, IdbOsKeys, IdbINames>,
) {
	let stores: ObjectStores = {};
	return () => {
		if (upgradeOptions?.storeConfigs && "name" in upgradeOptions.storeConfigs) {
			stores = createObjectStore(upgradeOptions.storeConfigs, request.result);
		} else if (upgradeOptions?.storeConfigs) {
			(
				upgradeOptions.storeConfigs as ObjectStoreConfig<
					IdbOsNames,
					IdbOsKeys,
					IdbINames
				>[]
			).forEach((config) => {
				stores = {
					...stores,
					...createObjectStore(config, request.result),
				};
			});
		}

		if (upgradeOptions?.callback) {
			upgradeOptions.callback(stores);
		}
	};
}

function createObjectStore<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
>(config: ObjectStoreConfig<IdbOsNames, IdbOsKeys, IdbINames>, db: IDBDatabase) {
	const stores: ObjectStores = {};
	const { name, options } = config;
	Object.assign(stores, {
		[name]: { store: db.createObjectStore(name, options), indexes: {} },
	});
	if (stores[name] && config.indexConfigs) {
		Object.assign(
			stores[name].indexes,
			createIndex(stores[name].store, config.indexConfigs),
		);
	}
	return stores;
}

function createIndex<IdbINames extends string>(
	store: IDBObjectStore,
	indexConfigs: IndexConfigs<IdbINames>,
): Indexes {
	let indexes: Indexes = {};
	if ("name" in indexConfigs) {
		const { name, keyPath, options } = indexConfigs;
		Object.assign(indexes, {
			[indexConfigs.name]: store.createIndex(name, keyPath, options),
		});
	} else {
		(indexConfigs as IndexConfig<IdbINames>[]).forEach((config) => {
			const { name, keyPath, options } = config;
			Object.assign(indexes, {
				[config.name]: store.createIndex(name, keyPath, options),
			});
		});
	}
	return indexes;
}
