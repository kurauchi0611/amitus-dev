import { db, FieldValue, talkStorage } from "./firebase";

const talks = db.collection("talks");
const user = db.collection("users");
// const ogpParser = functions.httpsCallable("ogpParser");
export const chatDB = {
  createRoom: (uid1, uid2) => {
    return talks.add({
      isLecture:false,
      member: [uid1, uid2],
      member1: user.doc(uid1),
      member2: user.doc(uid2),
      updatedAt: FieldValue.serverTimestamp()
    });
  },
  postMessage: async (roomId, uid, message) => {
    // console.log(roomId);
    // console.log(uid);
    // console.log(message);
    let type = "string";
    if (isUrl(message)) type = "link";
    if (message.match(/\.(jpg|png|gif)$/)) {
      type="image";
      message=[message,message]
    }
    // urlの識別追加する。
    updateTime(roomId);
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
    // console.log(roomId);
    // console.log(uid);
    // console.log(file);
    const type = file.name.split(".");
    const uploadName = `${roomId}-${uid}-${generateUuid()}.${
      type[type.length - 1]
    }`;
    // console.log(uploadName);
    talkStorage
      .ref()
      .child(`talkImages/${uploadName}`)
      .put(file)
      .then(snapshot => {
        if(false)console.log(snapshot);
        talkStorage
          .ref()
          .child(`talkImages/${uploadName}`)
          .getDownloadURL()
          .then(url => {
            updateTime(uid);
            return talks
              .doc(roomId)
              .collection("talk")
              .doc()
              .set({
                message: [url, url],
                user: user.doc(uid),
                uid: uid,
                createdAt: FieldValue.serverTimestamp(),
                type: "image"
              });
          });
      });
  },
  isOnline:(roomId,memberNum)=>{
    let setData={};
    if(memberNum===0)setData={member1Online:true};
    else setData={member2Online:true};
    return talks.doc(roomId).set(setData,{merge:true});
  },
  isOffline:(roomId,memberNum)=>{
    let setData={};
    if(memberNum===0)setData={member1Online:false};
    else setData={member2Online:false};
    return talks.doc(roomId).set(setData,{merge:true});
  }
};

const updateTime = uid => {
  return talks.doc(uid).set(
    {
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
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
// usersのサブコレクションにnotificationsを追加
// トークルームにisOnline [bool,bool]を追加する。 ok
// そのルームに入ったときにそのルームの自分の方のisOnlineをtrueにする ok
// ルームに入ったときにnotifications内の該当ルームidを削除
// 投稿時に、自分じゃないほうのisOnlineがfalseの場合userのnotificationsにルームのuidのドキュメントを作成
// dm閉じたらルームのisOnlineをfalseにする。 ok

