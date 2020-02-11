import { db, FieldValue } from "./firebase";
const questions = db.collection("questions");
export const questionDB = {
  postQuestion: fields => {
    const { title, tags, text, userData } = fields;
    return questions.add({
      title: title,
      tags: tags,
      text: text,
      isPost: true,
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
  draftQuestion: fields => {
    const { title, tags, text, userData } = fields;
    return db
      .collection("users")
      .doc(userData.uid)
      .collection("draftQuestions")
      .doc()
      .set({
        title: title,
        tags: tags,
        text: text
      });
  },
  showQuestion: async uid => {
    const getQuestion = await questions.doc(uid).get();
    return getQuestion;
  }
};
