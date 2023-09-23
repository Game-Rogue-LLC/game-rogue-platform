import {Configuration, PlaidApi, PlaidEnvironments} from 'plaid';

const clientId = process.env.NEXT_PUBLIC_PLAID_CLIENT_ID;
const secret = process.env.NEXT_PUBLIC_PLAID_CLIENT_SECRET;

console.log('clientId, secret', clientId, secret);

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': clientId,
      'PLAID-SECRET': secret,
    }
  }
})

const plaidClient = new PlaidApi(configuration);

export default plaidClient;