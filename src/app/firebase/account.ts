import { storage, auth, functions, db, FieldValue } from "./firebase";
import firebase from "firebase";
const user=db.collection('users');
export const accountDB = {
  loginUser: async account => {
    console.log("startLogin");
    return await auth.signInWithEmailAndPassword(
      account.email,
      account.password
    );
  },
  createUser: async account => {
    let result = false;
    console.log("startRegist");
    const createUser = functions.httpsCallable("createUser");
    await createUser(account)
      .then(res => {
        console.log("compoleteRegist");
        console.log(res);
        result = true;
      })
      .catch(error => {
        console.log("failedRegist");
        console.log(error);
      });
    return result;
  },
  updatePassword: async (oldPassword, newPassword) => {
    // const authentication = assoc('updatedAt', Firestore.serverTimestamp(), { password: password });
    // return authenticationRef(id).set(authentication, { merge: true });
    // firebaseのログイン情報をuserinfoに持っておく
    const userinfo = auth.currentUser;
    let res = false;
    if (userinfo) {
      const email: any | null = userinfo.email;
      // 直近にログインしてないと(5分くらいらしい)弾かれるのでreauthしてからパスワード変更
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        oldPassword
      );
      await userinfo
        .reauthenticateWithCredential(credential)
        .then(async () => {
          // User re-authenticated.
          await userinfo
            .updatePassword(newPassword)
            .then(() => {
              // Update successful.
              console.log("change success");
              res = true;
            })
            .catch(error => {
              // An error happened.
              console.log(error);
            });
        })
        .catch(error => {
          // An error happened.
          console.log(error);
        });
    }
    return res;
  },
  updateAuthStatus: () => {},
  fileUpload: (file, id) => {
    const collection = "staffs";
    const storageRef = storage.ref();
    storageRef.child(`${collection}/${id}`).put(file);
  },
  getUploadUrl: snapshot => snapshot.ref.getDownloadURL(),

  resetPassword: async email => {
    let res = false;
    const actionCodeSettings = {
      url: window.location.href
    };
    await auth
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        // Email sent.
        res = true;
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
    return res;
  },
  changeEmail: async (newEmail, password) => {
    const userinfo = auth.currentUser;
    let res = false;
    if (userinfo) {
      const email: any | null = userinfo.email;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      await userinfo.reauthenticateWithCredential(credential).then(async () => {
        // User re-authenticated.
        await userinfo.updateEmail(newEmail).then(async () => {
          // Update successful.
          const accounts = db.collection("accounts").doc(userinfo.uid);
          await accounts
            .set(
              {
                email: newEmail,
                updateAt: FieldValue.serverTimestamp()
              },
              { merge: true }
            )
            .then(async () => {
              // ここからサブコレクション"authentications"のメールアドレスの変更。ふようになったら消す
              const auth = accounts.collection("authentications");
              await auth
                .doc(userinfo.uid)
                .set(
                  {
                    email: newEmail,
                    updatedAt: FieldValue.serverTimestamp()
                  },
                  { merge: true }
                )
                .then(async () => {
                  res = true;
                })
                .catch(error => {
                  // An error happened.
                  console.log(error);
                });
              // ここまでサブコレクション。消したら↓のコメントを有効化する。
              // res = true
            })
            .catch(error => {
              // An error happened.
              console.log(error);
            });
        });
      });
    }
    return res;
  },
  logoutUser: () => {
    auth.signOut();
  },
  getUser:(uid)=>{
    return user.doc(uid).get();
  }
};
