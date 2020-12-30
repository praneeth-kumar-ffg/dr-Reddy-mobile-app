import React, { memo ,Component} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

class SignUpSuccessScreen extends React.Component {
    render(){
    return(
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      {' '}
      Your Login ID and password will be sent to registered email-id : {this.props.navigation.state.params.email}
    </Paragraph>
    <Paragraph>
      {' '}
      If you didnt get details in 5 min, please contact admin
    </Paragraph>
    <Paragraph>Admin emil id: dr.customercare@gmail.com</Paragraph>
    <Paragraph>Admin phone no:040-64532111</Paragraph>
    <Button mode="outlined" onPress={() => this.props.navigation.navigate('LoginScreen')}>
      Login
    </Button>
  </Background>
  );
}
}

export default memo(SignUpSuccessScreen);
