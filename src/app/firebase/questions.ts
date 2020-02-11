import { db, FieldValue } from "./firebase";
// import firebase from "firebase";
const questions = db.collection("questions");
export const questionDB = {
  postQuestion: fields => {
    const { title, tags, text, index, userData } = fields;
    return questions.add({
      title: title,
      tags: tags,
      text: text,
      index: index,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: null,
      isResolve: false,
      pageView: 0,
      user: {
        uid: userData.uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL
      }
    });
  },
  showQuestion:async uid=>{
    const getQuestion = await questions.doc(uid).get();
    return getQuestion;
  }
};
