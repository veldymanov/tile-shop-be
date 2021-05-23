import type { AWS } from '@serverless/typescript';

import importFileParser from '@functions/import-file-parser';
import importProductsFile from '@functions/import-products-file';

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: [
          'arn:aws:s3:::tile-shop-storage'
        ],
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: [
          'arn:aws:s3:::tile-shop-storage/*'
        ],
      },
      {
        Effect: 'Allow',
        Action: ['sqs:SendMessage'],
        Resource: [
          {'Fn::GetAtt': [ 'catalogItemsQueue', 'Arn' ]}
        ],
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_PRODUCTS_ARN: {
        Ref: 'catalogItemsQueue'
      }
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'csv-products-parse-sqs-sns-queue'
        }
      }
    }
  },
  functions: {
    importFileParser,
    importProductsFile
  },
};

module.exports = serverlessConfiguration;
