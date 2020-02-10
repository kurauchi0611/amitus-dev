import { db, FieldValue } from "./firebase";
// import firebase from "firebase";
const questions = db.collection("questions");
export const questionDB = {
  postQuestion: fields => {
    console.log(fields);
    const { title, tags, text, index, userData } = fields;
    questions.doc().set({
      title: title,
      tags: tags,
      text: text,
      index: index,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      isResolve: false,
      pageView: 0,
      user: {
        uid: userData.uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL
      }
    }).then(res=>{
      console.log(res);
    });
  },
  // showQuestion:uid
};
