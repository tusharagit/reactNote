// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Mynotes } = initSchema(schema);

export {
  Mynotes
};