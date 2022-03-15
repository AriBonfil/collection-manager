import { IOClients } from '@vtex/api';
import { Collections } from './Collections';



export class Clients extends IOClients {
	public get getCollections () {
    console.log("MIERDAAAA")
		return this.getOrSet('collections', Collections);
	}
}
