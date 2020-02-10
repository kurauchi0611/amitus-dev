import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { firebaseConfig } from "../config";

// const firebaseApp = firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.app().functions("asia-northeast1");
export const storage = firebase.storage();
export const FieldValue = firebase.firestore.FieldValue;
