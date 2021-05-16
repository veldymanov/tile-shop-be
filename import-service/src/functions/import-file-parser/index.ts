import { handlerPath } from '@libs/handler-resolver';

const BUCKET = 'tile-shop-storage';
const PREFIX = 'uploaded';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: 's3:ObjectCreated:*',
        rules: [
          { prefix: `${PREFIX}/` }
        ],
        existing: true
      }
    }
  ]
}
