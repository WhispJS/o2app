import {SAVE_PEER_ID, SAVE_CURRENT_IPS} from './peer.actiontypes';

const initialPeerState = {
  peerId: null,
  currentIps: null,
};

const peerReducer = (state = initialPeerState, action) => {
  switch (action.type) {
    case SAVE_PEER_ID:
      return {
        ...state,
        peerId: action.payload.data,
      };
    case SAVE_CURRENT_IPS:
      return {...state, currentIps: action.payload.data};
    default:
      return state;
  }
};

export default peerReducer;
