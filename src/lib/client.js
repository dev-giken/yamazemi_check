import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yamazemihp',
  apiKey: process.env.API_KEY,
});