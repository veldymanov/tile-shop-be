import type { AWS } from '@serverless/typescript';

import catalogBatchProcess from '@functions/catalog-batch-process';
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
        Action: ['sqs:*'],
        Resource: [
          {'Fn::GetAtt': [ 'catalogItemsQueue', 'Arn' ]}
        ],
      },
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: [
          {'Ref': 'createProductTopic'}
        ],
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'database-1.czazmdt5ejhw.eu-west-1.rds.amazonaws.com',
      PG_PORT: '5432',
      PG_DATABASE: 'postgres',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: '9nF4kozgDjSdRYtfD1cY',
      SQS_URL: {
        Ref: 'catalogItemsQueue'
      },
      SNS_ARN: {
        Ref: 'createProductTopic'
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
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'csv-products-parse-sqs-sns-topic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'veldymanov.job@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      }
    }
  },
  functions: {
    catalogBatchProcess,
    importFileParser,
    importProductsFile
  },
};

module.exports = serverlessConfiguration;
