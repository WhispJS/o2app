import React from 'react';
import {Text} from 'react-native';
import {textStyles} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getUserData} from '../store/auth/auth.selectors';

const Profile = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const userData = useSelector(getUserData);
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>Profile</Text>
      <Text style={textStyles(currentTheme).general}>
        Decentralized ID = {userData.decentralizedID}
      </Text>
      <Text style={textStyles(currentTheme).general}>
        Username = {userData.username}
      </Text>
    </Page>
  );
};

export default Profile;
