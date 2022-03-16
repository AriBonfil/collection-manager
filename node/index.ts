import { method, RecorderState, Service, ServiceContext } from '@vtex/api';

import { Clients } from './clients';
import { getCollections } from './handlers/collections';
import { test } from './handlers/analytics'


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
        helloworld: () => `Service number: ${Math.random()}`,
      },
    },
  },
	clients: {
		implementation: Clients,
		options: {
      getCollections:{

      }
		},
	},
	routes: {
		collections: method({
			GET: [getCollections],
		}),
    test: method({
			GET: [test],
		}),
	},
});
