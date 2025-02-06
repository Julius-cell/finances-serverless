module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
};
