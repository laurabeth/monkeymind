import type {
	IndexConfig,
	IndexConfigs,
	IndexedDbConfig,
	Indexes,
	ObjectStoreConfig,
	ObjectStoreConfigs,
	ObjectStoreKeyConfig,
	ObjectStores,
	OnUpgradeOptions,
} from "./types";
import { indexedDbFactory } from "./indexedDbFactory";

/**
 * Type arguments should represent the database schema
 */
export class IndexedDb {
	private _database?: IDBDatabase;
	private _objectStoreConfigs?: ObjectStoreConfigs;
	private _objectStores?: ObjectStores;
	private _onUpgrade: (
		request: IDBOpenDBRequest,
		options?: OnUpgradeOptions,
	) => (event: Event) => void;
	private _version?: number | undefined;
	readonly name: string;

	constructor(name: string, version?: number) {
		this.name = name;
		this._version = version;
		this._onUpgrade = onUpgrade;
	}

	getDb = () => {
		return this._database;
	};

	createOrOpen = async (): Promise<IndexedDb> => {
		const config = {
			version: this._version,
			onUpgrade: this._onUpgrade,
			storeConfigs: this._objectStoreConfigs,
			callback: (stores: ObjectStores) => {
				this._objectStores = stores;
			},
		};
		this._database = await openDatabase(this.name, config);

		return this;
	};

	close = () => {
		if (!this._database) {
			throw new Error("IndexedDb.close: The database hasn't been opened yet.");
		}
		this._database.close();
	};

	/**
	 * A series of builder methods that allow the configuration
	 * of a single ObjectStore. Can be called multiple times on
	 * a single IndexedDb object to  allow the configuration of
	 * multiple ObjectStores for a single database.
	 * @param name name of ObjectStore to be configured
	 * @returns builder methods
	 */
	configureObjectStore = (name: string) =>
		configureObjectStore(name, (configuration: ObjectStoreConfig) => {
			if (!this._objectStoreConfigs) {
				this._objectStoreConfigs = configuration;
			} else if ("name" in this._objectStoreConfigs) {
				this._objectStoreConfigs = [
					{ ...this._objectStoreConfigs },
					{ ...configuration },
				];
			}
		});

	deleteDatabase = () => {
		this.close();
		deleteDatabase(this.name);
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

	deleteObjectStore = (name: string) => {
		name;
		throw new Error("IndexedDb.deleteObjectStore: Not implemented.");
	};
}

async function deleteDatabase(dbName: string) {
	return new Promise<boolean>((resolve, reject) => {
		const request = indexedDbFactory().deleteDatabase(dbName);
		request.onerror = () => {
			reject(false);
		};
		request.onsuccess = () => {
			resolve(true);
		};
	});
}

async function openDatabase(
	dbName: string,
	options?: IndexedDbConfig,
): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		let request: IDBOpenDBRequest;

		if (options?.version) {
			request = indexedDbFactory().open(dbName, options.version);
		} else {
			request = indexedDbFactory().open(dbName);
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

function onUpgrade(request: IDBOpenDBRequest, upgradeOptions?: OnUpgradeOptions) {
	let stores: ObjectStores = {};
	return () => {
		if (upgradeOptions?.storeConfigs && "name" in upgradeOptions.storeConfigs) {
			stores = createObjectStore(upgradeOptions.storeConfigs, request.result);
		} else if (upgradeOptions?.storeConfigs) {
			(upgradeOptions.storeConfigs as ObjectStoreConfig[]).forEach((config) => {
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

function createObjectStore(config: ObjectStoreConfig, db: IDBDatabase) {
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

function createIndex(store: IDBObjectStore, indexConfigs: IndexConfigs): Indexes {
	let indexes: Indexes = {};
	if ("name" in indexConfigs) {
		const { name, keyPath, options } = indexConfigs;
		Object.assign(indexes, {
			[indexConfigs.name]: store.createIndex(name, keyPath, options),
		});
	} else {
		(indexConfigs as IndexConfig[]).forEach((config) => {
			const { name, keyPath, options } = config;
			Object.assign(indexes, {
				[config.name]: store.createIndex(name, keyPath, options),
			});
		});
	}
	return indexes;
}

function configureObjectStore(
	name: string,
	callback: (configuration: ObjectStoreConfig) => void,
) {
	const config = { name };

	/**
	 * Sets key options for this ObjectStoreConfig
	 * @param options ObjectStoreKeyConfig
	 * @returns
	 */
	const options = (options: ObjectStoreKeyConfig) => {
		Object.assign(config, { options });
		return { build, configureIndexes };
	};
	/**
	 * Configure indexes for this ObjectStore
	 * @param names name or names of indexes to be created
	 * @returns a method that allows the user to configure index keyPaths (required)
	 */
	const configureIndexes = (names: string | string[]) => {
		let indexConfigs: IndexConfigs = {} as IndexConfig;
		if (typeof names === "string") {
			indexConfigs = { name: names } as IndexConfig;
		} else {
			indexConfigs = names.map((name) => ({ name } as IndexConfig));
		}
		/**
		 * Add keypaths and options to the named indexes.
		 * The number of keypaths and their order must remain
		 * consistent with initial index configuration.
		 * @param paths
		 * @returns builder method
		 */
		const configureKeyPaths = (
			paths:
				| { keyPath: string | string[]; options?: IDBIndexParameters }
				| { keyPath: string | string[]; options?: IDBIndexParameters }[],
		) => {
			if ("name" in indexConfigs && "keyPath" in paths) {
				Object.assign(indexConfigs, { keyPath: paths.keyPath, options: paths.options });
			} else if (
				!("name" in indexConfigs) &&
				!("keyPath" in paths) &&
				indexConfigs.length === paths.length
			) {
				indexConfigs.forEach((config, i) => {
					Object.assign(config, { keyPath: paths[i].keyPath, options: paths[i].options });
				});
			} else {
				throw Error(
					`IndexedDb.configureIndexes.keyPaths: Number or type of index configurations do not match. Keypath is a required argument for all indexes.`,
				);
			}
			Object.assign(config, { indexConfigs });
			return { build };
		};

		return { configureKeyPaths };
	};

	/**
	 * Finalize configuration of this store
	 */
	const build = () => {
		callback(config);
	};
	return { build, configureIndexes, options };
}
