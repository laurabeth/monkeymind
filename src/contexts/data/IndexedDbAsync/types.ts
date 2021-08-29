export interface IndexConfig {
	name: string;
	keyPath: string | string[];
	options?: IDBIndexParameters;
}

export type IndexConfigs = IndexConfig | IndexConfig[];

export interface IndexedDbConfig {
	version?: number;
	onUpgrade?(
		request: IDBOpenDBRequest,
		options?: OnUpgradeOptions,
	): (event: Event) => void;
	storeConfigs?: ObjectStoreConfigs;
}

export interface Indexes {
	[x: string]: IDBIndex;
}
export interface ObjectStores {
	[x: string]: {
		store: IDBObjectStore;
		indexes?: Indexes;
	};
}

export interface ObjectStoreKeyConfig {
	keyPath?: string | string[];
	autoIncrement?: boolean;
}

export interface ObjectStoreConfig {
	name: string;
	options?: ObjectStoreKeyConfig;
	indexConfigs?: IndexConfigs;
}

export type ObjectStoreConfigs = ObjectStoreConfig | ObjectStoreConfig[];

export interface OnUpgradeOptions {
	storeConfigs?: ObjectStoreConfig | ObjectStoreConfig[];
	callback?: (stores: ObjectStores) => void;
}
