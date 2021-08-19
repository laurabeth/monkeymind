/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["./build", "./node_modules"],
	globals: {
		"ts-jest": {
			tsconfig: {
				jsx: "react-jsx",
			},
		},
	},
};
