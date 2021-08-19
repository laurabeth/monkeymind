export interface ObjectStoreKeyConfig {
	keyPath?: string;
	autoIncrement?: boolean;
}

export interface ObjectStoreConfig {
	name: string;
	options?: ObjectStoreKeyConfig;
}
