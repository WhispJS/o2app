'use strict';
/*
 * Listener Node
 */

const PeerId = require('peer-id');
const PeerInfo = require('peer-info');
const Node = require('./libp2p-bundle');
const pipe = require('it-pipe');
const fs = require('fs');
const lp = require('it-length-prefixed');
var rn_bridge = require('rn-bridge');
const all = require('it-all');
const CID = require('cids');

let username;
const currentUserPeerInfo = async () => {
  let peerId;
  try {
    const file = require(`${rn_bridge.app.datadir()}/${username}`);
    peerId = await PeerId.createFromJSON(file);
  } catch (error) {
    peerId = await PeerId.create();
    const fileContent = JSON.stringify(peerId.toJSON(), null, 2);
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
  const peerInfo = new PeerInfo(peerId);
  peerInfo.multiaddrs.add(`/ip4/0.0.0.0/tcp/0`);
  return {peerId, peerInfo};
};

async function init() {
  const {peerInfo, peerId} = await currentUserPeerInfo();
  const listenerNode = new Node({
    peerInfo,
  });
  let message = '';
  listenerNode.peerInfo.multiaddrs.forEach(ma => {
    message += ma.toString() + '/p2p/' + peerId.toB58String() + '\n';
  });
  rn_bridge.channel.send(message);
}

async function dial(friendRequest) {
  const listenerId = PeerId.createFromB58String(friendRequest.peerId);
  const listenerPeerInfo = new PeerInfo(listenerId);
  const {peerInfo} = await currentUserPeerInfo();
  peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0');
  const dialerNode = new Node({peerInfo});
  await dialerNode.start();

  rn_bridge.channel.send(
    'Trying to find providers for :' + friendRequest.peerId,
  );
  const cid = new CID(friendRequest.peerId);
  const providers = await all(
    dialerNode.contentRouting.findProviders(cid, {timeout: 3000}),
  );
  rn_bridge.channel.send('Found provider:', providers[0].id.toB58String());
  //  const peer = await dialerNode.peerRouting.findPeer(listenerPeerInfo.id);
  //  rn_bridge.channel.send('Found it, multiaddrs are:');
  //  peer.multiaddrs.forEach(ma => rn_bridge.channel.send(ma.toString()));
  //  const listenerId = PeerId.createFromB58String(friendRequest.peerId);
  //  const listenerPeerInfo = new PeerInfo(listenerId);
  //  friendRequest.ips.forEach(ip => {
  //    listenerPeerInfo.multiaddrs.add(
  //      `/ip4/${ip}/tcp/10334/p2p/${listenerPeerInfo.id.toB58String()}`,
  //    );
  //  });
  //  const {peerInfo} = await currentUserPeerInfo();
  //  const dialerNode = new Node({peerInfo});
  //  rn_bridge.channel.send('Dialer ready');
  //  dialerNode.peerInfo.multiaddrs.forEach(ma => {
  //    rn_bridge.channel.send(
  //      `${ma.toString()}/p2p/${dialerNode.peerInfo.id.toB58String()}`,
  //    );
  //  });
  //  dialerNode.handle('/echo/1.0.0', async ({stream}) => {
  //    pipe(
  //      // Read from the stream (the source)
  //      stream.source,
  //      // Decode length-prefixed data
  //      lp.decode(),
  //      // Sink function
  //      async function(source) {
  //        // For each chunk of data
  //        for await (const msg of source) {
  //          // Output the data as a utf8 string
  //          rn_bridge.channel.send('> ' + msg.toString('utf8').replace('\n', ''));
  //        }
  //      },
  //    );
  //  });
  //  await dialerNode.start();
  //  const {stream} = await dialerNode.dialProtocol(
  //    listenerPeerInfo,
  //    '/echo/1.0.0',
  //  );
  //  pipe(
  //    // Source data
  //    ['hey'],
  //    // Write to the stream, and pass its output to the next function
  //    lp.encode(),
  //    // Sink function
  //    stream.sink,
  //  );
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
