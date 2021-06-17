import 'source-map-support/register';
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayEventRequestContext,
  APIGatewayAuthorizerCallback,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';
import { middyfy } from '@libs/lambda';

const basicAuthorizer = (
  event: APIGatewayTokenAuthorizerEvent,
  ctx: APIGatewayEventRequestContext,
  cb: APIGatewayAuthorizerCallback
): void => {
  console.log('event: ', event);
  console.log('context: ', ctx);

  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    cb('Unauthorized');
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const [username, password] = Buffer.from(encodedCreds, 'base64').toString('utf-8').split(':');

    console.log(`username: ${username} and password ${password}`);

    const storedUserPassword = process.env[username];
    console.log('storedUserPassword: ', storedUserPassword);
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    console.log('policy ', JSON.stringify(policy));

    cb(null, policy);
  } catch (e) {
    cb(`Unauthorized: ${e.message}`)
  }
}

const generatePolicy = (
  principalId: string,
  resource: string,
  effect = 'Deny'
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}

export const main = middyfy(basicAuthorizer);
