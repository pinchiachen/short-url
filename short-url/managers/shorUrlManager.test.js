import shorUrlManager from './shorUrlManager';
import { urlKeyModel } from '../models';

urlKeyModel.createUrlKey = jest.fn();

describe('testing for createUrlKey', () => {
  it('urlKey length should be 20 with undefined input url', async () => {
    const url = undefined;
    const res = await shorUrlManager.createUrlKey(url);

    expect(res.length).toBe(20);
  });
  
  it('urlKey length should be 20 with normal input url', async () => {
    const url = 'http://www.google.com';
    const res = await shorUrlManager.createUrlKey(url);

    expect(res.length).toBe(20);
  });
});

describe('testing for getIndexByUrlKey', () => {
  it('index should betweem 0 to 8', async () => {
    const url = 'mock_url';
    const urlKey = await shorUrlManager.createUrlKey(url);
    const index = await shorUrlManager.getIndexByUrlKey(urlKey);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThanOrEqual(8);
  });
});

describe('testing for createShortUrl', () => {
  it('index should return error when createUrlKey failed', async () => {
    urlKeyModel.createUrlKey.mockReturnValue(false);
    
    const { error } = await shorUrlManager.createShortUrl({
      originalUrl: 'http://www.google.com',
      customAlias: undefined,
      expireDate: '2022-01-01',
    });

    expect(error).not.toBeNull();
  });
});