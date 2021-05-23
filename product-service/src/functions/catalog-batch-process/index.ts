import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: 'arn:aws:sqs:eu-west-1:132445318210:csv-products-parse-sqs-sns-queue',
        batchSize: 5
      }
    }
  ]
}
