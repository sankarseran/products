import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private collectionName = 'users';
  constructor(private db: AngularFirestore) {}

  login(user: string, password: string) {
    const usersRef = this.db.collection(this.collectionName).ref;
    return usersRef
      .where('userName', '==', user)
      .where('password', '==', password)
      .get()
      .then((res) => {
        // console.log('userRes:', res);
        if (res.empty) {
          return [];
        } else {
          return res.docs.map((doc) => {
            // console.log(doc.id, '=>', doc.data());
            return doc.data();
          });
        }
      });
  }

  findUser(user: string) {
    const usersRef = this.db.collection(this.collectionName).ref;
    return usersRef
      .where('userName', '==', user)
      .get()
      .then((res) => {
        // console.log('userRes:', res);
        if (res.empty) {
          return [];
        } else {
          return res.docs.map((doc) => {
            // console.log(doc.id, '=>', doc.data());
            return doc.data();
          });
        }
      });
  }
  async register(userName: string, password: string) {
    let isUser;
    try {
      isUser = await this.findUser(userName);
    } catch (err) {
      return err;
    }
    if (!isUser?.length) {
      return this.db
        .collection(this.collectionName)
        .doc(userName)
        .set(
          {
            userName,
            password
          }
        )
        .then((res) => {
          return { success: true };
        });
    } else {
      return { success: false };
    }
  }
}
