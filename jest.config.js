module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',
  moduleNameMapper: {
    '@env': '<rootDir>/src/environments/environment',
    '@shared': '<rootDir>/src/app/shared/index.ts',
    '@core': '<rootDir>/src/app/core/index.ts',
    '@auth': '<rootDir>/src/app/auth/index.ts',
    '@testing': '<rootDir>/src/app/testing/index.ts',
    '@modules/*': '<rootDir>/src/app/modules/*',
  },
};
