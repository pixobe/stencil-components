import { Plan, ValidateDigest } from './nonce';

describe('nonce', () => {
  it('nonce validated', async () => {
    console.log(new Date().toUTCString());
    expect(await ValidateDigest('Pro')).toEqual(Plan.Pro);
  });

  it('nonce validation failed', async () => {
    console.log(new Date().toUTCString());
    expect(await ValidateDigest('Pro')).toEqual(Plan.Free);
  });
});
