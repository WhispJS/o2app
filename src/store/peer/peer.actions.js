import {SAVE_PEER_ID, SAVE_CURRENT_IPS} from './peer.actiontypes';

export const savePeerId = peerId => ({
  type: SAVE_PEER_ID,
  payload: {data: peerId},
});
export const saveCurrentIps = ips => ({
  type: SAVE_CURRENT_IPS,
  payload: {data: ips},
});
