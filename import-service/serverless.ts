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
    catalagItemsSqsArn: {
      'Fn::GetAtt': [ 'catalogItemsQueue', 'Arn' ],
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    // stage: 'dev',
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
              '${self:custom.catalagItemsSqsArn}'
            ],
          },
        ]
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CATALOG_ITEMS_SQS_URL: {
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
      },
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          }
        }
      }
    },
    Outputs: {
      // CatalogItemsSqsUrl: {
      //   Value: {
      //     Ref: "catalogItemsQueue",
      //   },
      // },
      CatalogItemsSqsArn: {
        Value: "${self:custom.catalagItemsSqsArn}",
        Export: {
          Name: "CatalogItemsSqsArn",
        },
      },
    }
  },
  functions: {
    importFileParser,
    importProductsFile
  },
};

module.exports = serverlessConfiguration;
