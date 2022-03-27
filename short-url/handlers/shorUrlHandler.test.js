
import { HttpStatus } from '../../infrastructure';
import { shorUrlManager } from '../managers';
import shorUrlHandler from './shorUrlHandler';

shorUrlManager.createShortUrl = jest.fn();

class ExpressResponse {
  constructor() {
    this.statusCode = undefined;
    this.obj = {};
  }

  status (statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  send (obj) {
    this.obj = obj;
    return this;
  }
}

describe('testing for handleCreateKey', () => {
  it('empty original_url should return status code 400', async () => {
    const req = {
      body: {
        original_url: undefined,
      },
    };
    const res = new ExpressResponse();
  
    await shorUrlHandler.handleCreateKey(req, res);
  
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('custom_alias without string should return status code 400', async () => {
    const req = {
      body: {
        custom_alias: 123,
      },
    };
    const res = new ExpressResponse();
  
    await shorUrlHandler.handleCreateKey(req, res);
  
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('custom_alias length > 20 should return status code 400', async () => {
    const req = {
      body: {
        custom_alias: '012345678901234567891',
      },
    };
    const res = new ExpressResponse();
  
    await shorUrlHandler.handleCreateKey(req, res);
  
    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should return error when shorUrlManager.createShortUrl failed', async () => {
    const req = {
      body: {
        original_url: 'https://www.google.com',
        expire_date: '2022-01-01',
      },
    };
    const res = new ExpressResponse();
    shorUrlManager.createShortUrl.mockReturnValue({
      error: {
        errno: 'mock errno',
        msg: 'mock msg',
      },
    });
  
    await shorUrlHandler.handleCreateKey(req, res);
  
    expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
