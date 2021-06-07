import type { AWS } from '@serverless/typescript';

import basicAuthorizer from '@functions/basic-authorizer'
import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      veldymanov: 'TEST_PASSWORD'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    basicAuthorizer,
    hello
  },
};

module.exports = serverlessConfiguration;
