import { method, RecorderState, Service, ServiceContext } from '@vtex/api';

import { Clients } from './clients';
import { getCollections } from './handlers/collections';
import { getCollection } from './handlers/collection';

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  graphql: {
    resolvers: {
      Query: {

      },
    },
  },
	clients: {
		implementation: Clients,
		options: {
		},
	},
	routes: {
		collections: method({
			GET: [getCollections],
		}),
    collectionsDetail: method({
			GET: [getCollection],
		})
	},
});
