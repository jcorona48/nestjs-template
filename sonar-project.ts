import { scan as scanner } from 'sonarqube-scanner';
import { config as configDotenv } from 'dotenv';

configDotenv();
const serverUrl = process.env.SONAR_HOST_URL || '';
const token = process.env.SONAR_TOKEN || '';
const projectKey = process.env.SONAR_PROJECTKEY || 'testing-nest';

const options = {
  'sonar.projectKey': projectKey,
  'sonar.sources': 'src',
  'sonar.tests': 'test',
  'sonar.exclusions': [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/*.spec.ts',
    '**/*.e2e-spec.ts',
    '**/main.ts',
  ].join(','),
  'sonar.test.inclusions': '**/*.spec.ts,**/*.e2e-spec.ts',
  'sonar.coverage.exclusions': [
    '**/*.spec.ts',
    '**/*.e2e-spec.ts',
    '**/main.ts',
    '**/*.module.ts',
    '**/migrations/**',
    '**/config/**',
  ].join(','),
  'sonar.sourceEncoding': 'UTF-8',
  'sonar.cpd.exclusions': '**/*.spec.ts,**/migrations/**',
  'sonar.testExecutionReportPaths': './reports/test-report.xml',
  'sonar.javascript.lcov.reportPaths': './reports/coverage/lcov.info',
};
const params = {
  serverUrl,
  token,
  options,
};

const sonarScanner = async () => {
  console.log(serverUrl);

  if (!serverUrl) {
    console.log('SonarQube url not set. Nothing to do...');
    return;
  }

  await scanner(params);
};

sonarScanner()
  .then(() => {
    console.log('SonarQube scan completed.');
  })
  .catch((error) => {
    console.error('Error during SonarQube scan:', error);
  });
