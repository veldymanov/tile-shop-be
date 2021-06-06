import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import testingTokenAuthorizer from '@functions/testing-token-authorizer';
// import getThumbnails from '@functions/get-thumbnails';
// import imageUpload from '@functions/image-upload';

const serverlessConfiguration: AWS = {
  service: 'testing-service',
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
    iam: {
      role: {
        statements: [
          // {
          //   Effect: 'Allow',
          //   Action: ['s3:ListBucket'],
          //   Resource: [
          //     'arn:aws:s3:::product-service-thumbnails'
          //   ],
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['s3:*'],
          //   Resource: [
          //     'arn:aws:s3:::product-service-thumbnails/*'
          //   ],
          // },
        ]
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    testingTokenAuthorizer,
    hello,
    // getThumbnails,
    // imageUpload,

  },
};

module.exports = serverlessConfiguration;
