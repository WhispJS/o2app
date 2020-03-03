'use strict';
/* eslint-disable no-console */

/*
 * Dialer Node
 */

const PeerId = require('peer-id');
const PeerInfo = require('peer-info');
const Node = require('./libp2p-bundle');
const pipe = require('it-pipe');
const delay = require('delay');

async function run() {
  const [dialerId, listenerId] = await Promise.all([
    PeerId.createFromJSON(require('./id-d')),
    PeerId.createFromJSON(require('./id-l')),
  ]);

  // Dialer
  const dialerPeerInfo = new PeerInfo(dialerId);
  dialerPeerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0');
  const dialerNode = new Node({
    peerInfo: dialerPeerInfo,
  });

  //  dialerNode.on('peer:discovery', peer =>
  //    console.log('discovered', peer.id.toB58String()),
  //  );

  // Peer to Dial (the listener)
  const listenerPeerInfo = new PeerInfo(listenerId);
  const listenerMultiaddr =
    '/ip4/100.106.38.231/tcp/10333/p2p/QmdzU4eJn22wQiVv7npWbYasRvhA2NwNFzyamv48R66tuH';
  listenerPeerInfo.multiaddrs.add(listenerMultiaddr);
  // Start the dialer libp2p node
  await dialerNode.start();

  console.log('Dialer ready, listening on:');
  dialerPeerInfo.multiaddrs.forEach(ma =>
    console.log(ma.toString() + '/p2p/' + dialerId.toB58String()),
  );

  console.log('Dialing to peer:', listenerMultiaddr.toString());
  const {stream} = await dialerNode.dialProtocol(
    listenerPeerInfo,
    '/echo/1.0.0',
  );

  console.log('nodeA dialed to nodeB on protocol: /echo/1.0.0');
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
        console.log('received echo:', data.toString());
      }
    },
  );
}

run();