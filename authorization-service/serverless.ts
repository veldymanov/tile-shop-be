import type { AWS } from '@serverless/typescript';

import basicAuthorizer from '@functions/basic-authorizer'
import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  useDotenv: true,
  // variablesResolutionMode: '20210326',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    // stage: '${env:STAGE}',
    region: '${env:REGION}' as any,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    basicAuthorizer,
    hello
  },
};

module.exports = serverlessConfiguration;
