import { handleActions } from 'redux-actions'
import actions from '../actions'
import uuid from 'uuid-v4'

export const initialState = {
  editorText: '',
  peer: createPeerConnection(),
  clientId: uuid(),
  host: false,
  mode: 'ruby'
}

export default handleActions(
  {
    [actions.initHost]: state => ({
      ...state,
      host: true
    }),
    [actions.edit]: (state, action) => ({
      ...state,
      editorText: action.payload.text
    }),
    [actions.setDataChannel]: (state, action) => ({
      ...state,
      dataChannel: action.payload.dataChannel
    }),
    [actions.setHostId]: (state, action) => ({
      ...state,
      hostId: action.payload.to,
      host: action.payload.host
    }),
    [actions.changeMode]: (state, action) => ({
      ...state,
      mode: action.payload.mode
    })
  },
  initialState
)

const iceServers = [{ urls: 'stun:stun.l.google.com:19302' }]

function createPeerConnection() {
  return new RTCPeerConnection({
    iceServers,
    iceTransportPorlicy: 'all'
  })
}
