import { db, FieldValue, talkStorage } from "./firebase";

const talks = db.collection("talks");
const user = db.collection("user");
// const ogpParser = functions.httpsCallable("ogpParser");
export const chatDB = {
  postMessage: async (roomId, uid, message) => {
    let type = "string";
    if (isUrl(message)) type = "link";
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
  },
  postImage: async (roomId, uid, file) => {
    console.log(roomId);
    console.log(uid);
    console.log(file);
    const type = file.name.split(".");
    const uploadName = `${roomId}-${uid}-${generateUuid()}.${
      type[type.length - 1]
    }`;
    console.log(uploadName);
    talkStorage
      .ref()
      .child(`talkImages/${uploadName}`)
      .put(file)
      .then(snapshot => {
        console.log(snapshot);
        talkStorage
          .ref()
          .child(`talkImages/${uploadName}`)
          .getDownloadURL()
          .then(url => {
            return talks
              .doc(roomId)
              .collection("talk")
              .doc()
              .set({
                message: url,
                user: user.doc(uid),
                uid: uid,
                createdAt: FieldValue.serverTimestamp(),
                type: "image"
              });
          });
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

// uuid作成
const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
    .replace(/y/g, () => (Math.floor(Math.random() * 4) + 8).toString(16));
};
