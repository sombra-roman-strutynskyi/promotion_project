module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/project',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/app/testing',
    'src/environments',
    '.module.ts',
    '.mock.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 30,
      lines: 50,
      statements: 50,
    },
  },
  moduleNameMapper: {
    '@env': '<rootDir>/src/environments/environment',
    '@shared': '<rootDir>/src/app/shared/index.ts',
    '@core': '<rootDir>/src/app/core/index.ts',
    '@auth': '<rootDir>/src/app/auth/index.ts',
    '@testing': '<rootDir>/src/app/testing/index.ts',
    '@modules/profile': '<rootDir>/src/app/modules/profile/index.ts',
    '@modules/articles': '<rootDir>/src/app/modules/articles/index.ts',
    '@modules/widgets': '<rootDir>/src/app/modules/widgets/index.ts',
  },
};
