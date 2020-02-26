import { db, FieldValue } from "./firebase";
const tickets = db.collection("timeTickets");
export const ticketDB = {
  postTicket: async fields => {
    let res: string | null = null;
    const { title, tags, text, userData, amount } = fields;
    const users = db
      .collection("users")
      .doc(userData.uid)
      .collection("myTickets");
    await tickets
      .add({
        title: title,
        tags: tags,
        text: text,
        isPost: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: null,
        amount: amount,
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
            amount: amount
          })
          .then(() => {
            res = result.id;
          });
      });
    return res;
  },
  draftTickets: fields => {
    const { title, tags, text, userData, amount } = fields;
    return db
      .collection("users")
      .doc(userData.uid)
      .collection("draftTickets")
      .doc()
      .set({
        title: title,
        tags: tags,
        text: text,
        amount: amount
      });
  },
  showTickets: async uid => {
    const getTicket = await tickets.doc(uid).get();
    return getTicket.data();
  },
  showMyTickets: async uid => {
    const getMyTickets = await db
      .collection("users")
      .doc(uid)
      .collection("myTickets")
      .orderBy("createdAt","desc")
      .limit(5)
      .get();
    return getMyTickets;
  }
};
