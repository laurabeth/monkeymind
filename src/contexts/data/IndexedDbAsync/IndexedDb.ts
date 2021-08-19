import { openDatabase } from "./IndexedDbFactory";
import { ObjectStoreConfig } from "./types";

export class IndexedDb {
	private _database?: IDBDatabase;
	private _objectStores?: Record<string, IDBObjectStore>;
	readonly name: string;
	readonly version?: number | undefined;

	constructor(name: string, version?: number) {
		this.name = name;
		this.version = version;
	}

	open = async (): Promise<IndexedDb> => {
		if (this.version) {
			this._database = await openDatabase(this.name);
		} else {
			this._database = await openDatabase(this.name, this.version);
		}
		return this;
	};

	close = () => {
		if (!this._database) {
			throw new Error("IndexedDb.close: The database hasn't been opened yet.");
		}
		this._database.close();
	};

	createObjectStores = (configs: ObjectStoreConfig | ObjectStoreConfig[]) => {
		if (!this._database) {
			throw new Error(
				"IndexedDb.createObjectStores: The database hasn't been opened yet.",
			);
		}

		this._database.onversionchange = () => {
			let storeConfigs: ObjectStoreConfig | ObjectStoreConfig[];
			let stores: Record<string, IDBObjectStore> = {};
			if ("name" in configs) {
				storeConfigs = configs as ObjectStoreConfig;
				if (storeConfigs.options) {
					stores = {
						[storeConfigs.name]: this._database!.createObjectStore(
							storeConfigs.name,
							storeConfigs.options,
						),
					};
				} else {
					stores = {
						[storeConfigs.name]: this._database!.createObjectStore(storeConfigs.name),
					};
				}
			} else {
				(configs as ObjectStoreConfig[]).forEach((config) => {
					if (config.options) {
						Object.assign(stores, {
							[config.name]: this._database!.createObjectStore(
								config.name,
								config.options,
							),
						});
					} else {
						Object.assign(stores, {
							[config.name]: this._database!.createObjectStore(config.name),
						});
					}
				});
			}
			this._objectStores = stores;
		};
	};

	getObjectStoreNames = () => {
		if (!this._database) {
			throw new Error(
				"IndexedDb.getObjectStoreNames: The database hasn't been opened yet.",
			);
		}
		this._database.objectStoreNames;
	};

	getObjectStore = (name: string) => {
		if (!this._objectStores) {
			throw new Error(
				"IndexedDb.getObjectStore: Object stores have not been initialized.",
			);
		}
		return this._objectStores[name];
	};

	// deleteObjectStore = (name: string) => {};
}
