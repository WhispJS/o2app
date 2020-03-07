'use strict';

const TCP = require('libp2p-tcp');
const WS = require('libp2p-websockets');
const mplex = require('libp2p-mplex');
const secio = require('libp2p-secio');
const defaultsDeep = require('@nodeutils/defaults-deep');
const Libp2p = require('libp2p');
const MulticastDNS = require('libp2p-mdns');
const KadDHT = require('libp2p-kad-dht');
const Bootstrap = require('libp2p-bootstrap');
// Find this list at: https://github.com/ipfs/js-ipfs/blob/master/src/core/runtime/config-nodejs.json
const bootstrapers = [
  '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  '/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
  '/ip4/104.236.179.241/tcp/4001/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
  '/ip4/162.243.248.213/tcp/4001/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
  '/ip4/128.199.219.111/tcp/4001/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
  '/ip4/104.236.76.40/tcp/4001/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
  '/ip4/178.62.158.247/tcp/4001/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
  '/ip4/178.62.61.185/tcp/4001/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
  '/ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx',
];

class Node extends Libp2p {
  constructor(_options) {
    const defaults = {
      modules: {
        transport: [TCP, WS],
        streamMuxer: [mplex],
        connEncryption: [secio],
        peerDiscovery: [MulticastDNS, Bootstrap],
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
          bootstrap: {
            interval: 60e3,
            enabled: true,
            list: bootstrapers,
          },
        },
      },
    };

    super(defaultsDeep(_options, defaults));
  }
}

module.exports = Node;
