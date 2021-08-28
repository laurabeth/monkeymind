export interface IndexConfig<IdbINames extends string> {
	name: IdbINames;
	keyPath: string | string[];
	options?: IDBIndexParameters;
}

export type IndexConfigs<IdbINames extends string> =
	| IndexConfig<IdbINames>
	| IndexConfig<IdbINames>[];

export interface IndexedDbConfig<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
> {
	version?: number;
	onUpgrade?(
		request: IDBOpenDBRequest,
		options?: OnUpgradeOptions<IdbOsNames, IdbOsKeys, IdbINames>,
	): (event: Event) => void;
	storeConfigs?: ObjectStoreConfigs<IdbOsNames, IdbOsKeys, IdbINames>;
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

export interface ObjectStoreKeyConfig<IdbOsKeys extends string> {
	keyPath?: IdbOsKeys;
	autoIncrement?: boolean;
}

export interface ObjectStoreConfig<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
> {
	name: IdbOsNames;
	options?: ObjectStoreKeyConfig<IdbOsKeys>;
	indexConfigs?: IndexConfigs<IdbINames>;
}

export type ObjectStoreConfigs<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
> =
	| ObjectStoreConfig<IdbOsNames, IdbOsKeys, IdbINames>
	| ObjectStoreConfig<IdbOsNames, IdbOsKeys, IdbINames>[];

export interface OnUpgradeOptions<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
> {
	storeConfigs?:
		| ObjectStoreConfig<IdbOsNames, IdbOsKeys, IdbINames>
		| ObjectStoreConfig<IdbOsNames, IdbOsKeys, IdbINames>[];
	indexConfigs?: IndexConfigs<IdbINames>;
	callback?: (stores: ObjectStores) => void;
}
