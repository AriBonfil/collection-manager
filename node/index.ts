import { method, RecorderState, Service, ServiceContext } from '@vtex/api';

import { Clients } from './clients';
import { getCollections } from './handlers/collections';
import { getCollection } from './handlers/collection';
import { deleteCollection } from './handlers/deleteCollection'
import { cloneCollection } from './handlers/cloneCollection'
import { tasks } from './handlers/tasks';
import { createTasks } from './handlers/createTasks';
import { getBlockCollection, removeBlockCollection, setBlockCollection } from './handlers/blockCollection';
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
		options: {},
	},
	routes: {
    tasks: method({
			GET: [tasks],
			POST: [createTasks],
		}),
    blocks: method({
			GET: [getBlockCollection],
			POST: [setBlockCollection],
			DELETE: [removeBlockCollection],
		}),
		collections: method({
			GET: [getCollections],
		}),
    collectionsDetail: method({
			GET: [getCollection],
		}),
    deleteCollection: method({
      POST: [deleteCollection],
    }),
    cloneCollection: method({
      POST: [cloneCollection],
    })
	},
});
