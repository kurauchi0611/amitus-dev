import { db, FieldValue } from "./firebase";
const talks = db.collection("talks");
const user=db.collection('user');
export const chatDB = {
  postMessage:(roomId,uid,message)=>{
    // urlの識別追加する。
    return talks.doc(roomId).collection('talk').doc().set({
      message: message,
      user: user.doc(uid),
      uid:uid,
      createdAt: FieldValue.serverTimestamp(),
      type: "string"
    })
  }
};

