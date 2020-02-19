import { db, FieldValue, functions } from "./firebase";
const talks = db.collection("talks");
const user = db.collection("user");
const ogpParser = functions.httpsCallable("ogpParser");
export const chatDB = {
  postMessage: async (roomId, uid, message) => {
    let type = "string";
    if (isUrl(message)) {
      type = "link";
      await ogpParser(message).then(res => {
        if (res.data[0] === "ogp") {
          message = [res.data[1], res.data[2], res.data[3], res.data[4]];
        }
      });
    }
    // urlの識別追加する。
    return talks
      .doc(roomId)
      .collection("talk")
      .doc()
      .set({
        message: message,
        user: user.doc(uid),
        uid: uid,
        createdAt: FieldValue.serverTimestamp(),
        type: type
      });
  }
};

const isUrl = str => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  if (!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
};
