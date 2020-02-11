import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { firebaseConfig } from "../config";

// const firebaseApp = firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().enablePersistence().catch(err => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.app().functions("asia-northeast1");
export const storage = firebase.storage();
export const FieldValue = firebase.firestore.FieldValue;