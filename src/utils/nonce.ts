declare const RUNTIME_ENDPOINT;

/**
 *
 */
export enum Plan {
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
export async function validateDigest(appname: string, nonce: string): Promise<Plan> {
  // get domain
  const domain = window.location.hostname;
  // get current date
  const currentDate = new Date().toISOString().split('T')[0];
  // default plan
  let plan = Plan.Pro;

  switch (plan) {
    case Plan.Pro: {
      const message = `${domain}${appname}${Plan.Pro}${currentDate}`;
      const hashed = await sha256(message);
      if (hashed == nonce) {
        break;
      }
    }
    default: {
      plan = Plan.Free;
    }
  }
  return plan;
}

/**
 * retreive nonce for client
 * @param clientId
 * @returns
 */
export function retrieveNonce(clientId: string) {
  let url = 'https://pixobe.com/v2/api/nonce';

  if (RUNTIME_ENDPOINT != undefined) {
    url = RUNTIME_ENDPOINT;
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-pixobe-site-id', clientId);

  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    });
}

/**
 *
 * @param config
 * @returns
 */
export function ValidateDigest(appName: string) {
  // validate the digest
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const digest = this.digest;
      if (!digest) {
        const clientId = this.clientId;
        return retrieveNonce(clientId).then(result => {
          const digest = result.nonce;
          return validateDigest(appName, digest).then(plan => {
            this['features'] = plan;
            return originalMethod.apply(this, args);
          });
        });
      }
      return validateDigest(appName, digest).then(plan => {
        this['features'] = plan;
        return originalMethod.apply(this, args);
      });
    };
    return descriptor;
  };
}

/**
 *
 * @param plan
 * @returns
 */
export function FeatureAvailability(plan: Plan) {
  // validate the digest
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const features = this.features;
      // how can I set to this here , I mean features
      if (plan !== features) {
        return null;
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

/**
 * Expects a flag true or false to show or hide a feature
 * @param name
 * @returns
 */
export function DisplayFeature(name: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const feature = this[name];
      if (feature == false) {
        return null;
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
