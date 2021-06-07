import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
          name: 'basicAuthorizer',
          // arn: 'arn:aws:lambda:eu-west-1:132445318210:function:authorization-service-dev-basicAuthorizer',
          arn: '${cf:authorization-service-dev.BasicAuthorizerLambdaFunctionQualifiedArn}',
          type: 'token',
          identitySource: 'method.request.header.authorization_token',
          resultTtlInSeconds: 0
        }
      }
    }
  ]
}
