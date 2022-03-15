import { method, RecorderState, Service, ServiceContext } from '@vtex/api';


import { Clients } from './clients';
import { getCollectionsController } from './controllers/Collections';


declare global {
	type Context = ServiceContext<Clients, State>;

	interface State extends RecorderState {
		email: string;
		newData: Record<string, any>;
	}
}

export default new Service({
	clients: {
		implementation: Clients,
		options: {

		},
	},
	routes: {
		collections: method({
			GET: [getCollectionsController],
		}),
	},
});
