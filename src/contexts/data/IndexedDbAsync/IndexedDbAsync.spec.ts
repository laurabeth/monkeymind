import { IndexedDb } from "./IndexedDb";
//@ts-ignore
import { indexedDbFactory } from "./indexedDbFactory";

jest.mock("./indexedDbFactory", () => ({
	indexedDbFactory: () => ({
		open: openMock,
		deleteDatabase: jest.fn(),
	}),
}));

const createIndexMock = jest.fn(
	(name: string, keyPath: string | string[], options?: IDBIndexParameters) => {
		return {
			name,
			keyPath,
			multiEntry: options?.multiEntry,
			unique: options?.unique,
		};
	},
);

const createObjectStoreMock = jest.fn(
	(name: string, options?: IDBObjectStoreParameters) => {
		Object.assign(objectStoreNamesMock, {
			...objectStoreNamesMock,
			length: objectStoreNamesMock.length + 1,
			[objectStoreNamesMock.length]: name,
		});
		return {
			autoIncrement: options?.autoIncrement,
			keyPath: options?.keyPath,
			name,
			add: jest.fn(),
			clear: jest.fn(),
			createIndex: createIndexMock,
		} as unknown as IDBObjectStore;
	},
);
const closeMock = jest.fn();
const openMock = jest.fn(() => Promise.resolve(() => requestMock));
const objectStoreNamesMock: DOMStringList = {
	length: 0,
	contains: jest.fn(),
	item: jest.fn(),
};

const requestMock: IDBOpenDBRequest = {
	response: {
		onclose: closeMock,
		onerror: undefined,
		onversionchange: jest.fn(),
		version: 0,
		close: jest.fn(),
		name: "test",
		createObjectStore: createObjectStoreMock,
		deleteObjectStore: jest.fn(),
		transaction: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		objectStoreNames: objectStoreNamesMock,
		dispatchEvent: jest.fn(),
	} as unknown as IDBDatabase,
	error: null,
	onupgradeneeded: jest.fn(),
	onsuccess: undefined,
	// ...overrides,
} as unknown as IDBOpenDBRequest;

describe("IndexedDbAsync", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("creates an IndexedDb config object", async () => {
		const indexedDb = new IndexedDb("test");
		const idb = await indexedDb.createOrOpen();

		expect(idb.name).toEqual("test");
		expect(openMock).toHaveBeenCalledWith("test");
	});
});
