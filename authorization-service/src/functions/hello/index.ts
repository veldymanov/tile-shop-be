import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': schema
          }
        },
        authorizer: {
          name: 'basicAuthorizer',
          // arn: 'arn:aws:lambda:eu-west-1:132445318210:function:authorization-service-dev-basicAuthorizer',
          type: 'token',
          identitySource: 'method.request.header.authorization_token',
          resultTtlInSeconds: 0
        }
      }
    }
  ]
}
