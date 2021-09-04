/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	moduleDirectories: ["./node_modules", "./src"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	preset: "ts-jest",
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["/build/", "/node_modules/"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
	globals: {
		"ts-jest": {
			tsconfig: {
				jsx: "react-jsx",
			},
		},
	},
};
