'use strict';
/*
 * Listener Node
 */

const PeerId = require('peer-id');
const PeerInfo = require('peer-info');
const Node = require('./libp2p-bundle');
const pipe = require('it-pipe');
const fs = require('fs');
var rn_bridge = require('rn-bridge');

let username;
const currentUserPeerInfo = async () => {
  let listenerId;
  try {
    const file = require(`${rn_bridge.app.datadir()}/${username}`);
    listenerId = await PeerId.createFromJSON(file);
  } catch (error) {
    listenerId = await PeerId.create();
    const fileContent = JSON.stringify(listenerId.toJSON(), null, 2);
    fs.writeFile(
      `${rn_bridge.app.datadir()}/${username}.json`,
      fileContent,
      'utf8',
      err => {
        if (err) {
          throw err;
        }
      },
    );
  }
  // Listener libp2p node
  const listenerPeerInfo = new PeerInfo(listenerId);
  listenerPeerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/10333');
  return {listenerPeerInfo, listenerId};
};

async function init() {
  const {listenerPeerInfo, listenerId} = await currentUserPeerInfo();
  const listenerNode = new Node({
    peerInfo: listenerPeerInfo,
  });
  let message = '';
  listenerNode.peerInfo.multiaddrs.forEach(ma => {
    message += ma.toString() + '/p2p/' + listenerId.toB58String() + '\n';
  });
  rn_bridge.channel.send(message);
}

async function dial(friendRequest) {
  const listenerId = new PeerId(friendRequest.peerId);
  rn_bridge.channel.send('Extracted listener id = ' + listenerId);
  const listenerPeerInfo = new PeerInfo(friendRequest.peerId);
  rn_bridge.channel.send('Peer info id = ' + listenerPeerInfo.id.toB58String());
  friendRequest.ips.forEach(ip => {
    listenerPeerInfo.multiaddrs.add(`/ip4/${ip}/tcp/0`);
  });
  const {dialerPeerInfo} = await currentUserPeerInfo();
  dialerPeerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0');
  const dialerNode = new Node({peerInfo: dialerPeerInfo});
  await dialerNode.start();
  rn_bridge.channel.send('Dialer ready');
  const {stream} = await dialerNode.dialProtocol(
    listenerPeerInfo,
    '/echo/1.0.0',
  );
  pipe(
    // Source data
    ['hey'],
    // Write to the stream, and pass its output to the next function
    stream,
    // Sink function
    async function(source) {
      // For each chunk of data
      for await (const data of source) {
        // Output the data
        rn_bridge.channel.send('received echo:', data.toString());
      }
    },
  );
}
const extractInfoFromMessage = (message, prefix) => {
  const parsedMessage = message.split('/');
  const indexOfInfo = parsedMessage.indexOf(prefix) + 1;
  return parsedMessage[indexOfInfo];
};
// Echo every message received from react-native.
rn_bridge.channel.on('message', msg => {
  rn_bridge.channel.send('received' + msg);
  if (msg.indexOf('init') > -1) {
    username = extractInfoFromMessage(msg, 'username');
    rn_bridge.channel.send('Initializing the server for ' + username);
    init(username);
  } else {
    const friendRequest = JSON.parse(msg);
    rn_bridge.channel.send('Attempting to dial ' + friendRequest.username);
    dial(friendRequest);
  }
});
