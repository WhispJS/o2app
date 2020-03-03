import React from 'react';
import StaticServer from 'react-native-static-server';
import {View, Linking} from 'react-native';
import {useEffect} from 'react';
import {useState} from 'react';
import RNFS from 'react-native-fs';
import {Button} from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import {useDispatch} from 'react-redux';
import {signIn} from '../../store/auth/auth.actions';

const getPath = () => {
  return Platform.OS === 'android'
    ? RNFS.DocumentDirectoryPath + '/www'
    : RNFS.MainBundlePath + '/www';
};
//TO-DO automatically find the subfolders and add its content to files
const getFilesFromAssets = async () => {
  let assets = await RNFS.readDirAssets('www');
  return assets.filter(content => content.isFile()).map(file => file.path);
};

const moveAndroidFiles = async () => {
  if (Platform.OS === 'android') {
    try {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/www');
      const files = await getFilesFromAssets();
      files.forEach(async file => {
        await RNFS.copyFileAssets(
          file,
          RNFS.DocumentDirectoryPath + '/' + file,
        );
      });
    } catch (error) {}
  }
};

const Blockstack = ({authResponse}) => {
  const [serverUrl, setServerUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    moveAndroidFiles();
    parseUserData();
    let path = getPath();
    const server = new StaticServer(8080, path, {
      localOnly: true,
      keepAlive: true,
    });
    server.start().then(url => {
      setServerUrl(url);
      console.log('server started on' + url);
    });
    return () => {
      if (server && server.isRunning()) {
        server.stop();
      }
    };
  }, []);

  const parseUserData = async () => {
    const url = await Linking.getInitialURL();
    if (url && url.indexOf('userData') > -1 && url.indexOf('pubKey') > -1) {
      console.log(url);
      const urlArgs = url.split('o2app://')[1].split('?');
      console.log({urlArgs});
      const userData = JSON.parse(decodeURI(urlArgs[0].split('=')[1]));
      const pubKey = urlArgs[1].split('=')[1];
      console.log(pubKey);
      dispatch(signIn(userData, pubKey));
    }
  };
  const blockStackSignIn = () => {
    WebBrowser.openBrowserAsync(serverUrl);
  };
  return (
    <View>
      <Button onPress={blockStackSignIn} title="Sign in using Blockstack" />
    </View>
  );
};

export default Blockstack;
