import React from 'react';
import {Text, Button, Platform} from 'react-native';
import {textStyles} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getUserData, getUserPubKey} from '../store/auth/auth.selectors';
import {signOut} from '../store/auth/auth.actions';
import {useEffect} from 'react';
import nodejs from 'nodejs-mobile-react-native';
import {useState} from 'react';
import Share from 'react-native-share';
import {getCurrentIps, getPeerId} from '../store/peer/peer.selectors';
import {saveCurrentIps, savePeerId} from '../store/peer/peer.actions';
import {Linking} from 'react-native';

const Profile = () => {
  const [message, setMessage] = useState('');
  const currentIps = useSelector(getCurrentIps);
  const peerId = useSelector(getPeerId);
  const currentTheme = useSelector(getCurrentTheme);
  const userData = useSelector(getUserData);
  const userPubKey = useSelector(getUserPubKey);
  const IP4_PREFIX = {server: 'ip4', url: 'ip'};
  const P2P_PREFIX = {server: 'p2p', url: 'peerId'};
  const dispatch = useDispatch();

  useEffect(() => {
    startNodeServer();
    processFriendRequest();
    nodejs.channel.send(`/init/1.0.0/username/${userData.username}`);
  }, []);

  const processFriendRequest = async () => {
    const url = await Linking.getInitialURL();
    if (
      url &&
      url.indexOf(IP4_PREFIX.url) > -1 &&
      url.indexOf(P2P_PREFIX.url) > -1
    ) {
      const friendRequest = {
        username: extractInfoFromMultiaddr(url, 'username'),
        ips: JSON.parse(
          decodeURI(extractInfoFromMultiaddr(url, IP4_PREFIX.url)),
        ),
        peerId: extractInfoFromMultiaddr(url, P2P_PREFIX.url),
      };
      nodejs.channel.send(JSON.stringify(friendRequest));
      console.log({friendRequest});
    }
  };

  const extractInfoFromMultiaddr = (multiaddr, prefix) => {
    const parsedMultiaddr = multiaddr.split('/');
    const indexOfInfo = parsedMultiaddr.indexOf(prefix) + 1;
    return parsedMultiaddr[indexOfInfo];
  };

  const startNodeServer = () => {
    nodejs.start('main.js');
    nodejs.channel.addListener('message', msg => {
      console.log('FROM SERVER: ' + msg);
      setMessage(msg);
      //  if (msg.indexOf(IP4_PREFIX.server) > -1) {
      //    const multiaddresses = msg.split('\n');
      //    const ips = (multiaddresses || [])
      //      .map(multiaddr =>
      //        extractInfoFromMultiaddr(multiaddr, IP4_PREFIX.server),
      //      )
      //      .filter(ip => ip.length > 0);
      //    console.log({ips});
      //    dispatch(
      //      savePeerId(
      //        extractInfoFromMultiaddr(multiaddresses[0], P2P_PREFIX.server),
      //      ),
      //    );
      //    dispatch(saveCurrentIps(ips));
      //  }
    });
  };

  const onPressSignOut = () => {
    dispatch(signOut());
  };
  const onPressSendFriendRequest = () => {
    console.log({currentIps, peerId});
    if (peerId && currentIps) {
      const url = encodeURI(
        `https://o2app.io/${IP4_PREFIX.url}/${JSON.stringify(currentIps)}/${
          P2P_PREFIX.url
        }/${peerId}/username/${userData.username}`,
      );
      const title = 'Friend request o2';
      const message = 'O2 friend request.';
      const options = Platform.select({
        ios: {
          activityItemSources: [
            {
              placeholderItem: {type: 'url', content: url},
              item: {
                default: {type: 'url', content: url},
              },
              subject: {
                default: title,
              },
              linkMetadata: {originalUrl: url, url, title},
            },
            {
              placeholderItem: {type: 'text', content: message},
              item: {
                default: {type: 'text', content: message},
                message: null, // Specify no text to share via Messages app.
              },
            },
          ],
        },
        default: {
          title,
          subject: title,
          message: `${message} ${url}`,
        },
      });

      Share.open(options);
    }
  };
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>Profile</Text>
      <Text style={textStyles(currentTheme).general}>
        Decentralized ID = {userData.decentralizedID}
      </Text>
      <Text style={textStyles(currentTheme).general}>
        Username = {userData.username}
      </Text>
      <Text style={textStyles(currentTheme).general}>
        Pubkey = {userPubKey}
      </Text>
      <Text>From nodejs = {message}</Text>
      <Button title="Sign out" onPress={onPressSignOut} />
      <Button title="Send friend request" onPress={onPressSendFriendRequest} />
    </Page>
  );
};

export default Profile;
