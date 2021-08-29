import { IndexedDb } from "../IndexedDb";
import { ObjectStoreConfig } from "../types";

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

const onSuccessMock = jest.fn();
const onErrorMock = jest.fn();
const closeMock = jest.fn();
const objectStoreNamesMock: DOMStringList = {
	length: 0,
	contains: jest.fn(),
	item: jest.fn(),
};

function createRequestMock(
	overrides?: {
		[P in keyof IDBOpenDBRequest]: jest.Mock | string | number | object;
	},
): IDBOpenDBRequest {
	const requestMock = {
		response: {
			onclose: closeMock,
			onerror: onErrorMock,
			onversionchange: jest.fn(),
			version: 0,
			close: jest.fn(),
			name: "dbName",
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
		onsuccess: onSuccessMock,
		...overrides,
	} as unknown as IDBOpenDBRequest;

	return requestMock;
}
export function createWindowMock(
	overrides?: { [P in keyof IDBOpenDBRequest]: jest.Mock | string | number | object },
): Window & typeof globalThis {
	return {
		indexedDB: {
			open: jest.fn(() => createRequestMock(overrides)),
			deleteDatabase: jest.fn(),
		} as unknown as IDBFactory,
	} as unknown as Window & typeof globalThis;
}

describe("IndexedDbAsync", () => {
	beforeAll(() => {
		window = createWindowMock();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("creates an IndexedDb object", () => {
		const indexedDb = new IndexedDb("test");

		indexedDb
			.configureObjectStore("user")
			.options({ keyPath: "id", autoIncrement: true })
			.configureIndexes(["username", "email"])
			.configureKeyPaths([
				{ keyPath: "username", options: { unique: true } },
				{ keyPath: "email", options: { unique: true } },
			])
			.build();

		indexedDb.configureObjectStore("settings").build();
	});
});
