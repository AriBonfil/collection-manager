import { IOClients } from '@vtex/api';
import Collections from './Collections';
import Analytics from '../clients/analytics'


export class Clients extends IOClients {
	public get getCollections () {
		return this.getOrSet('collections', Collections);
	}
  public get analytics() {
     return this.getOrSet('analytics', Analytics)
  }
}
