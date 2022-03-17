import { IOClients } from '@vtex/api';
import Collection from './collection';


export class Clients extends IOClients {
	public get collection () {
		return this.getOrSet('collections', Collection);
	}

}
