import 'source-map-support/register';

import { middyfy } from '@libs/lambda';

const basicAuthorizer = async (event, ctx, cb) => {
  console.log('event: ', event);
  console.log('context: ', ctx);

  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    cb('Unauthorized');
  }

  console.log('Right Type!')

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username} and password ${password}`);

    const storedUserPassword = 'password';
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    console.log('policy ', JSON.stringify(policy));

    cb(null, policy);
  } catch (e) {
    cb(`Unauthorized: ${e.message}`)
  }
}

const generatePolicy = (principalId, resource, effect = 'Deny') => {
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
