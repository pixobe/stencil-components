export const enum Plan {
  Free = 'Free',
  Pro = 'Pro',
}
/**
 *
 * @param message
 * @returns
 */
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * 
 * @param appId 
 * @param plan 
 * @param nonce 
 * @returns 
 */
export async function validateNonce(appId: string, plan: string, nonce: string) {
  // get domain
  const domain = window.location.hostname;
  // get current date
  const currentDate = new Date().toISOString().split('T')[0];
  // data to hash for verification
  const message = `${domain}${appId}${plan}${currentDate}`;

  return sha256(message)
    .then(hash => {
      return hash == nonce ? plan : Plan.Free;
    })
    .catch(() => {
      return Plan.Free;
    });
}
