import type { AWS } from '@serverless/typescript';

import catalogBatchProcess from '@functions/catalog-batch-process';
import createProduct from '@functions/create-product';
import getProducts from '@functions/get-products';
import getProductById from '@functions/get-product-by-id';

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
    iam: {
      role: {
        statements: [
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
            Resource: [
            //  'arn:aws:sqs:eu-west-1:132445318210:csv-products-parse-sqs-sns-queue'
              '${cf:import-service-dev.CatalogItemsSqsArn}'
            ]
          },
          {
            Effect: 'Allow',
            Action: ['sns:*'],
            Resource: [
              {'Ref': 'createProductTopic'}
            ],
          },
        ]
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SNS_PRODUCTS_ARN: {
        Ref: 'createProductTopic'
      },
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'csv-products-uploaded'
        }
      },
      SNSSubscriptionSuccess: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          //TODO: move to env vars
          Endpoint: "veldymanov.job@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          //TODO: move to env vars
          // FilterPolicy: {
          //   status: ["success"],
          //   // price: [{'numeric': ['>', 0, '<=', 8]}],
          //   // description: ['descr10', 'descr11']
          // },
        },
      },
      SNSSubscriptionFailure: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "Andrii_Veldymanov@epam.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          FilterPolicy: {
            status: ["failure"],
          },
        },
      }
    }
  },
  functions: {
    catalogBatchProcess,
    createProduct,
    getProducts,
    getProductById,
  },
};

module.exports = serverlessConfiguration;
