import { db, FieldValue } from "./firebase";
const questions = db.collection("questions");
export const questionDB = {
  postQuestion: async fields => {
    let res: string | null = null;
    const { title, tags, text, userData } = fields;
    const users = db
      .collection("users")
      .doc(userData.uid)
      .collection("myQuestions");
    await questions
      .add({
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
      })
      .then(async result => {
        await users
          .doc(result.id)
          .set({
            title: title,
            tags: tags,
            createdAt: FieldValue.serverTimestamp(),
            isResolve: false
          })
          .then(() => {
            res = result.id;
          });
      });
    return res;
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
    const getComments = await questions
      .doc(uid)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();
    return { question: getQuestion, comments: getComments };
  },
  showMyQuestions: async uid => {
    const getMyQuestions = await db
      .collection("users")
      .doc(uid)
      .collection("myQuestions")
      .orderBy("createdAt","desc")
      .limit(5)
      .get();
    return getMyQuestions;
  },
  postComment: fields => {
    const { text, userData, uid } = fields;
    return questions
      .doc(uid)
      .collection("comments")
      .add({
        text: text,
        userData: {
          uid: userData.uid,
          displayName: userData.displayName,
          photoURL: userData.photoURL
        },
        createdAt: FieldValue.serverTimestamp()
      });
  },
  getFavoriteQuestions:async()=>{
    const favoriteQuestions=await questions.orderBy("pageView","desc").limit(5).get();
    return favoriteQuestions;
  }
};
