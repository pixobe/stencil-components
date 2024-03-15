import { Plan, validateNonce } from './nonce';

describe('nonce', () => {
  it('nonce validated', async () => {
    console.log(new Date().toUTCString());
    expect(await validateNonce('1', 'Pro', '4676389824ecb7db05b474a77e3f8de343edd695bab51be7e9fb3a6af7f69923')).toEqual(Plan.Pro);
  });

  it('nonce validation failed', async () => {
    console.log(new Date().toUTCString());
    expect(await validateNonce('1', 'Pro', '4676389824ecb7db05b474a77e3f8de343edd695bab51be7e9fb3a6af7f69923')).toEqual(Plan.Free);
  });
});
