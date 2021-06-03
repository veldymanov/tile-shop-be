import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'product-service-thumbnails',
        event: 's3:ObjectCreated:*',
        rules: [
          { prefix: 'images/' }
        ],
        existing: true
      }
    }
  ]
}
