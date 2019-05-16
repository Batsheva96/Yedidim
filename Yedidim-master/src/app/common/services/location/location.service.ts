import { Injectable } from '@angular/core';
import { LocationModel } from '../../models';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../../service/firebase/firebase.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const LOCATION_COLLECTION = 'locations';

@Injectable()
export class LocationService {
  private col: AngularFirestoreCollection<LocationModel>;
  constructor(
    private afsDocument: AngularFirestore,
    public afAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    private http: HttpClient
  ) {
    this.col = this.afsDocument.collection(LOCATION_COLLECTION);
  }

  public sendMyLocationInterval() {
    setTimeout(() => {
      this.sendMyLocation().then(res => {
        this.sendMyLocationInterval();
      });
    }, 1000 * 60 * 5);
  }

  async sendMyLocation() {
    // await this.postLocation();
    const pos = await this.getMyLocation();
    const loc = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      ts: Date.now(),
      email: this.firebaseService.getEmail()
    } as LocationModel;
    // const res = await this.col.add(loc);
    const res = await this.afsDocument.doc(LOCATION_COLLECTION + '/' + this.firebaseService.getEmail()).set(loc);
    console.log('add location: %o', res);
  }

  getMyLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(pos => resolve(pos));
    });
  }

  distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }

  async getTimestamp() {
    const res = await this.http.get(environment.lbaseServerUrl + '/getTimestamp').toPromise();
    console.log(res);
  }

  async publishLocation(data: any, count: number) {
    const loc = await this.getMyLocation();
    const body = {
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
      count,
      data
    }
    const res = await this.http.post(environment.lbaseServerUrl + '/publishLocation-publishLocation', body).toPromise();
    console.log(res);
  }
}
