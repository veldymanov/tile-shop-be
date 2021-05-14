import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";
import { importProductsFile } from './handler';

describe('importProductsFile', () => {
  const fileName = 'fake.csv';
  const mockEvent = {
    queryStringParameters: {
        name: fileName
    }
  };

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should return signed url', async () => {
    const url = `https://tile-shop-storage.s3.eu-west-1.amazonaws.com/uploaded/${fileName}`;
    AWSMock.mock('S3', 'getSignedUrl', url);
    const res = await importProductsFile(mockEvent as any);
    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(202);
    expect(body.url).toContain(fileName);
  });

  it('should return stausCode 500', async () => {
    const errmsg = 'Test getSignedUrlPromise Error';
    AWSMock.mock('S3', 'getSignedUrlPromise', (method, params) => {
      console.log(method);
      console.log(params);
      throw new Error(errmsg);
    });

    const res = await importProductsFile(mockEvent as any);
    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(500);
    expect(body.message).toContain(errmsg);
  });
});