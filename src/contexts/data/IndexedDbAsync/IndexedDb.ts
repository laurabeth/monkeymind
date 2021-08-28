import { openDatabase } from "./IndexedDbFactory";
import { ObjectStoreConfigs, ObjectStores, OnUpgradeOptions } from "./types";

// OSNames extends string, OSKeys extends string, INames extends string
export class IndexedDb<
	IdbOsNames extends string,
	IdbOsKeys extends string,
	IdbINames extends string,
> {
	private _database?: IDBDatabase;
	private _objectStoreConfigs?: ObjectStoreConfigs<IdbOsNames, IdbOsKeys, IdbINames>;
	private _objectStores?: ObjectStores;
	private _onUpgrade?: (
		request: IDBOpenDBRequest,
		options?: OnUpgradeOptions<IdbOsNames, IdbOsKeys, IdbINames>,
	) => (event: Event) => void;
	private _version?: number | undefined;
	readonly name: string;

	constructor(name: string, version?: number) {
		this.name = name;
		this._version = version;
	}

	getDb = () => {
		return this._database;
	};

	build = async (): Promise<IndexedDb<IdbOsNames, IdbOsKeys, IdbINames>> => {
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

	configureObjectStores = (
		configs?: ObjectStoreConfigs<IdbOsNames, IdbOsKeys, IdbINames>,
	) => {
		this._objectStoreConfigs = configs;
	};

	getObjectStoreNames = () => {
		if (!this._database) {
			throw new Error(
				"IndexedDb.getObjectStoreNames: The database hasn't been opened yet.",
			);
		}
		this._database.objectStoreNames;
	};

	getObjectStore = (name: IdbOsNames) => {
		if (!this._objectStores) {
			throw new Error(
				"IndexedDb.getObjectStore: Object stores have not been initialized.",
			);
		}
		return this._objectStores[name];
	};

	// deleteObjectStore = (name: string) => {};
}
