import { eventChannel } from 'redux-saga'
import { takeEvery, take, fork, select, call, put } from 'redux-saga/effects'
import 'babel-polyfill'
import actions from '../actions'
import firebase from 'firebase'
import { db } from '../../../firebase/firebase'



const dataChannelOption = {
  order: true
}
const ref = db.collection('sessions')

function subscribeSignaling({ clientId, hostId }) {
  // const ref = db.ref(`sessions/${hostId}`)

  return eventChannel(emit => {
    // ref.on('child_added', data => {
    //   const { from, type } = data.val()
    //   if (from !== clientId && type) {
    //     emit(actions[type]({ ...data.val() }))
    //   }
    // })
    ref.doc(hostId)
      .onSnapshot(doc => {
        // console.log(doc.data())
        if (typeof doc.data() !== "undefined") {
          const { from, type } = doc.data()
          if (from !== clientId && type) {
            emit(actions[type]({ ...doc.data() }))
          }
        }
      })
    return () => { }
  })
}

function subscribeCandidate(peer) {
  return eventChannel(emit => {
    peer.onicecandidate = e => {
      if (e.candidate) {
        console.log(43,e);
        
        emit(actions.setHostCandidate({ candidate: e.candidate }))
      }
    }
    return () => { }
  })
}

function subscribeDataChannel(peer) {
  return eventChannel(emit => {
    peer.ondatachannel = e => {
      console.log(53,e);
      
      emit(actions.setDataChannel({ dataChannel: e.channel }))
    }
    return () => { }
  })
}

function subscribeMessage(dataChannel) {
  return eventChannel(emit => {
    dataChannel.onmessage = e => {
      const data = JSON.parse(e.data)
      emit(actions[data.type](data))
    }
    return () => { }
  })
}

function* handleSendOffer(action) {
  const { to } = action.payload
  yield put(actions.setHostId({ to, host: false }))
  const { peer, clientId } = yield select()
  try {
    const dataChannel = yield call(() =>
      peer.createDataChannel('editor', dataChannelOption)
    )
    console.log(dataChannel);
    
    yield put(actions.setDataChannel({ dataChannel }))
    const sdp = yield call(() => peer.createOffer())
    yield call(() => peer.setLocalDescription(sdp))
    yield call(() => {
      console.log('hoge2')
      ref.doc(to).set({
        kuso:"hoge",
        from: clientId,
        ...sdp.toJSON()
      }, { merge: true })
    })
  } catch (e) {
    console.error(e)
  }
}

function* handleOffer(action) {
  const { peer, clientId } = yield select()
  const { sdp, type } = action.payload
  try {
    yield call(() =>
      peer.setRemoteDescription(new RTCSessionDescription({ sdp, type }))
    )
    const answerSdp = yield call(() => peer.createAnswer())
    yield call(() => peer.setLocalDescription(answerSdp))
    yield call(() => {
      console.log('hoge3')
      ref
        .doc(clientId)
        .set({ from: clientId, ...answerSdp.toJSON() }, { merge: true })
    })
  } catch (e) {
    console.error(e)
  }
}

function* handleAnswer(action) {
  const { peer } = yield select()
  const { sdp, type } = action.payload
  yield call(() =>
    peer.setRemoteDescription(new RTCSessionDescription({ sdp, type }))
  )
}

function* watchMessage() {
  yield take(actions.setDataChannel)
  const { dataChannel } = yield select()
  yield fork(commonWatcher, subscribeMessage, dataChannel)
}

function* watchEvents() {
  yield take(actions.setHostId)
  const { clientId, hostId, peer } = yield select()
  yield fork(commonWatcher, subscribeSignaling, { clientId, hostId })
  yield fork(commonWatcher, subscribeCandidate, peer)
  yield fork(commonWatcher, subscribeDataChannel, peer)
}

function* commonWatcher(subscribe, ...args) {
  const channel = yield call(subscribe, ...args)
  yield takeEvery(channel, function* (action) {
    yield put(action)
  })
}

function* setHostCandidate(action) {
  const { peer, clientId } = yield select()
  const { candidate } = action.payload
  // const ref = db.ref(`sessions/${clientId}`)
  const candidateObj = new RTCIceCandidate(candidate)
  if (peer.remoteDescription && peer.remoteDescription.type) {
    try {
      yield call(() => peer.addIceCandidate(candidateObj))
      yield call(() =>
        ref.doc(clientId).set({
          type: 'setGuestCandidate',
          from: clientId,
          candidate: JSON.stringify(candidate)
        }, { merge: true })
      )
    } catch (e) {
      console.error(e)
    }
  }
}

function* setGuestCandidate(action) {
  const { peer } = yield select()
  const { candidate } = action.payload
  yield call(() =>
    peer.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)))
  )
}

function* initHost() {
  const { clientId } = yield select()
  yield put(actions.setHostId({ to: clientId, host: true }))
}

export default function* rootSaga() {
  yield fork(watchEvents)
  yield fork(watchMessage)
  yield takeEvery(actions.initHost, initHost)
  yield takeEvery(actions.offer, handleOffer)
  yield takeEvery(actions.sendOffer, handleSendOffer)
  yield takeEvery(actions.answer, handleAnswer)
  yield takeEvery(actions.setHostCandidate, setHostCandidate)
  yield takeEvery(actions.setGuestCandidate, setGuestCandidate)
}
