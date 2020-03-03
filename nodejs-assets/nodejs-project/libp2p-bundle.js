'use strict';

const TCP = require('libp2p-tcp');
const WS = require('libp2p-websockets');
const mplex = require('libp2p-mplex');
const secio = require('libp2p-secio');
const defaultsDeep = require('@nodeutils/defaults-deep');
const Libp2p = require('libp2p');
const MulticastDNS = require('libp2p-mdns');
const KadDHT = require('libp2p-kad-dht');

class Node extends Libp2p {
  constructor(_options) {
    const defaults = {
      modules: {
        transport: [TCP, WS],
        streamMuxer: [mplex],
        connEncryption: [secio],
        peerDiscovery: [MulticastDNS],
        dht: KadDHT,
      },
      config: {
        dht: {
          // dht must be enabled
          enabled: true,
        },
        peerDiscovery: {
          mdns: {
            interval: 20e3,
            enabled: true,
          },
        },
      },
    };

    super(defaultsDeep(_options, defaults));
  }
}

module.exports = Node;
