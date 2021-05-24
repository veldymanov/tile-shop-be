import type { AWS } from '@serverless/typescript';

import catalogBatchProcess from '@functions/catalog-batch-process';
import createProduct from '@functions/create-product';
import getProducts from '@functions/get-products';
import getProductById from '@functions/get-product-by-id';
import getThumbnails from '@functions/get-thumbnails';
import imageUpload from '@functions/image-upload';

const serverlessConfiguration: AWS = {
  service: 'product-service',
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
          'arn:aws:s3:::product-service-thumbnails'
        ],
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: [
          'arn:aws:s3:::product-service-thumbnails/*'
        ],
      },
      {
        Effect: 'Allow',
        Action: ['sqs:ReceiveMessage'],
        // Resource: [
        //   'arn:aws:sqs:eu-west-1:132445318210:csv-products-parse-sqs-sns-queue'
        // ],
        Resource: [
          '${self:provider.environment.SQS_PRODUCTS_ARN}'
        ]
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
      SNS_PRODUCTS_ARN: {
        Ref: 'createProductTopic'
      },
      SQS_PRODUCTS_ARN: 'arn:aws:sqs:eu-west-1:132445318210:csv-products-parse-sqs-sns-queue'
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
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
          },
          FilterPolicy: {
            price: [{'numeric': ['>', 0, '<=', 8]}],
            // description: ['descr10', 'descr11']
          }
        }
      }
    }
  },
  functions: {
    catalogBatchProcess,
    createProduct,
    getProducts,
    getProductById,
    getThumbnails,
    imageUpload
  },
};

module.exports = serverlessConfiguration;
