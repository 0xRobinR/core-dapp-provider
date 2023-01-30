const tsConfig = {
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'jsx', 'tsx'],
  preset: 'ts-jest',
};

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.ts',
    '!<rootDir>/**/src/**/*.test.ts',
  ],
  coverageReporters: ['html', 'json-summary', 'text'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  projects: [
    {
      ...tsConfig,
      displayName: 'CoreDappBridge',
      testEnvironment: 'node',
      testMatch: [
        '**/CoreDappBridge.test.ts',
      ],
    }
  ]
}
