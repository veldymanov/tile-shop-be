import type { AWS } from '@serverless/typescript';

import getProducts from '@functions/get-products';
import getProductById from '@functions/get-product-by-id';
import createProduct from '@functions/create-product';
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
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'database-1.czazmdt5ejhw.eu-west-1.rds.amazonaws.com',
      PG_PORT: '5432',
      PG_DATABASE: 'postgres',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: '9nF4kozgDjSdRYtfD1cY'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    getProducts,
    createProduct,
    getProductById,
    getThumbnails,
    imageUpload
  },
};

module.exports = serverlessConfiguration;
