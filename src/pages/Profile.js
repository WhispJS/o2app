import React from 'react';
import {Text, Button} from 'react-native';
import {textStyles} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getUserData, getUserPubKey} from '../store/auth/auth.selectors';
import {signOut} from '../store/auth/auth.actions';

const Profile = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const userData = useSelector(getUserData);
  const userPubKey = useSelector(getUserPubKey);
  const dispatch = useDispatch();

  const onPressSignOut = () => {
    dispatch(signOut());
  };
  return (
    <Page>
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
      <Button title="Sign out" onPress={onPressSignOut} />
    </Page>
  );
};

export default Profile;
