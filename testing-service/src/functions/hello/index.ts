import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        cors: true,
        request: {
          schemas: {
            'application/json': schema
          }
        },
        // authorizer: 'testingTokenAuthorizer'
        // authorizer: 'arn:aws:lambda:eu-west-1:132445318210:function:testing-service-dev-testingTokenAuthorizer'
        authorizer: {
          name: 'testingTokenAuthorizer',
          // arn: 'arn:aws:lambda:eu-west-1:132445318210:function:testing-service-dev-testingTokenAuthorizer',
          type: 'token',
          identitySource: 'method.request.header.authorizationToken',
          resultTtlInSeconds: 0
        }
      }
    }
  ]
}
