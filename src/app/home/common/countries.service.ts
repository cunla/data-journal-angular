import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

export const COUNTRIES_DATA_PATH = 'countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(public db: AngularFirestore) {
  }

  get(key) {
    return this.db.collection(COUNTRIES_DATA_PATH).doc(key).get();
  }

  update(key, value) {
    return this.db.collection(COUNTRIES_DATA_PATH).doc(key).set(value);
  }

  delete(key) {
    return this.db.collection(COUNTRIES_DATA_PATH).doc(key).delete();
  }

}
