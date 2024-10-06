module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // map `@/` to the root directory, i.e. create aliases
  },
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
};
