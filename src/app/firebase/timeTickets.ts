import { db, FieldValue } from "./firebase";
const tickets = db.collection("timeTickets");
export const ticketDB = {
  postTicket: fields => {
    const { title, tags, text, userData, amount } = fields;
    return tickets.add({
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
    });
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
    const getTickets = await tickets.doc(uid).get();
    return getTickets.data();
  }
};
