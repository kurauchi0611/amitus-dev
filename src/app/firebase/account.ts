import { storage, auth, functions, db, FieldValue } from "./firebase";
import firebase from "firebase";
const user = db.collection("users");
export const accountDB = {
  loginUser: async account => {
    console.log("startLogin");
    return await auth.signInWithEmailAndPassword(
      account.email,
      account.password
    );
  },
  logoutUser: () => {
    auth.signOut();
  },
  getUser: uid => {
    return user.doc(uid).get();
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
  updateName: async name => {
    const userinfo = auth.currentUser;
    if (userinfo) {
      userinfo
        .updateProfile({
          displayName: name
        })
        .then(async () => {
          // Update successful.
          const updateName = await user
            .doc(userinfo.uid)
            .set({ name: name }, { merge: true });
          return updateName;
        });
    }
    return false;
  },
  updateEmail: async (newEmail, password) => {
    const userinfo = auth.currentUser;
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
          const updateEmail = await user.doc(userinfo.uid).set(
            {
              email: newEmail,
              updateAt: FieldValue.serverTimestamp()
            },
            { merge: true }
          );
          return updateEmail;
        });
      });
    }
    return false;
  },
  updatePassword: async (oldPassword, newPassword) => {
    // const authentication = assoc('updatedAt', Firestore.serverTimestamp(), { password: password });
    // return authenticationRef(id).set(authentication, { merge: true });
    // firebaseのログイン情報をuserinfoに持っておく
    const userinfo = auth.currentUser;
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
          const updatePassword = await userinfo.updatePassword(newPassword);
          return updatePassword;
        })
        .catch(error => {
          // An error happened.
          console.log(error);
        });
    }
    return false;
  },
  updateIntroduction: async text => {
    const userinfo = auth.currentUser;
    if (userinfo) {
      const updateIntroduction = await user.doc(userinfo.uid).set(
        {
          introduction: text
        },
        { merge: true }
      );
      return updateIntroduction;
    }
    return false;
  },
  updateLanguage: async lang => {
    const userinfo = auth.currentUser;
    if (userinfo) {
      const updateLanguage = await user.doc(userinfo.uid).set(
        {
          language: lang
        },
        { merge: true }
      );
      return updateLanguage;
    }
    return false;
  },
};



