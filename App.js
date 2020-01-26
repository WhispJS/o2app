import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { DeviceEventEmitter } from "react-native";
import RNBlockstackSdk from "react-native-blockstack";
import Home from "./src/pages/Home";
import {
  containerStyles,
  defaultTheme,
  defaultSettings
} from "./src/config/style";
import { Provider } from "react-redux";
import store from "./src/store/store";

const App = ({ authResponse }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    createSession();
    let pendingAuth = false;
    DeviceEventEmitter.addListener("url", e => {
      if (e.url && !pendingAuth) {
        pendingAuth = true;
        const query = e.url.split(":");
        if (query.length > 1) {
          const parts = query[1].split("=");
          if (parts.length > 1) {
            RNBlockstackSdk.handlePendingSignIn(parts[1]).then(result => {
              setUserData({ decentralizedID: result["decentralizedID"] });
              pendingAuth = false;
            });
          }
        }
      }
    });
  }, []);

  const createSession = async () => {
    config = {
      appDomain: "https://flamboyant-darwin-d11c17.netlify.com",
      scopes: ["store_write"],
      redirectUrl: "/redirect.html"
    };
    hasSession = await RNBlockstackSdk.hasSession();
    if (!hasSession["hasSession"]) {
      result = await RNBlockstackSdk.createSession(config);
    }

    let result = null;
    if (authResponse) {
      result = await RNBlockstackSdk.handleAuthResponse(authResponse);
    } else {
      const signedIn = await RNBlockstackSdk.isUserSignedIn();
      if (signedIn["signedIn"]) {
        result = await RNBlockstackSdk.loadUserData();
      }
    }
    if (result) {
      setUserData({ decentralizedID: result["decentralizedID"] });
      console.log("RNBlockstackSdk.scopes", RNBlockstackSdk.scopes);
    }
  };

  const signIn = async () => {
    result = await RNBlockstackSdk.signIn();
    console.log("result: " + JSON.stringify(result));
    this.setState({ userData: { decentralizedID: result["decentralizedID"] } });
  };

  const signOut = async () => {
    result = await RNBlockstackSdk.signUserOut();
    console.log(JSON.stringify(result));
    if (result["signedOut"]) {
      this.setState({ userData: null });
    }
  };
  return true ? (
  // return userData ? (
    <Provider store={store}>
      <Home />
    </Provider>
  ) : (
    <View style={containerStyles(defaultSettings, defaultTheme).container}>
      <Button
        title="Sign In with Blockstack"
        onPress={signIn}
        disabled={userData != null}
      />
    </View>
  );
};

export default App;
