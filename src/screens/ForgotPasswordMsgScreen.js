import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const ForgotPasswordMsgScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Verification Status</Header>
    <Paragraph>
      Your login ID and password is sent to your email ID and registered mobile number. If you don't get the details in 5 min, please contact the admin.
    Admin E-mail ID: abc@gmail.com
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
      Back to Login
    </Button>
  </Background>
);

export default memo(ForgotPasswordMsgScreen);
