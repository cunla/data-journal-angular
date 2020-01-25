import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class CitiesService {
  constructor(private afs: AngularFirestore) {
  }

  getCities(start: BehaviorSubject<string>): Observable<any[]> {
    return start
      .switchMap(searchText => {
        console.log(`searchText: ${searchText}`);
        return this.afs
          .collection('cities', ref =>
            ref
              .where('search', 'array-contains', searchText)
              .orderBy('population', "desc")
              .limit(10)
          )
          .snapshotChanges()
          .debounceTime(200)
          .distinctUntilChanged()
          .map(changes => {
            return changes.map(c => {
              console.log(c);
              const data = c.payload.doc.data();
              const id = c.payload.doc.id;
              return {id, ...data};
            });
          });
      });
  }
}
