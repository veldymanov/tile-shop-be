import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: {
          origin: '*',
          headers: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
            'authorization_token'
          ]
        },
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
          name: 'cognitoAuthorizer',
          arn: 'arn:aws:cognito-idp:eu-west-1:132445318210:userpool/eu-west-1_usOWnNqOk',
          type: 'token',
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0
        }
        // authorizer: {
        //   name: 'basicAuthorizer',
        //   // arn: 'arn:aws:lambda:eu-west-1:132445318210:function:authorization-service-development-basicAuthorizer',
        //   arn: '${cf:authorization-service-development.BasicAuthorizerLambdaFunctionQualifiedArn}',
        //   type: 'token',
        //   identitySource: 'method.request.header.authorization_token',
        //   resultTtlInSeconds: 0
        // }
      }
    }
  ]
}
