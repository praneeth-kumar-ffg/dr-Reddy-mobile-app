import React, { useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {  StyleSheet, ScrollView} from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import {memo, Component } from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {PASSWORD_CHANGE_SUCCESS} from '../actions/actionTypes.js';
import {changePassword} from '../actions'
import config from '../config/index.js'


const ChangePasswordScreen = ({ navigation,user, changePassword }) => {
  var [password, setPassword] = useState({ value: '', error: '' });
  var [submitButtonLoading, setButtonLoading] = useState(false)
  var [reEnteredPassword, setReEnteredPassword] = useState({ value: '', error: '' });


  const changePasswordValidator = password => {
    const re2= /^\w+$/;
   const re = /[0-9]/;
    if (!password.value || password.value.length <= 0) {
      return 'Password cannot be empty.';
    }else if(re2.test(password.value)){
      return 'Password must include any one of !, @, #, $, %';
    }
    else if(password.value.length<6){
      return 'Password must contain atleast 6 letters';
    }
    else if(!re.test(password.value)) {
      return 'password must contain at least one number (0-9)!';
    }
  };

  const _onSendPressed = () => {
    const passwordError = changePasswordValidator(password);
    if (passwordError){
      setPassword({value: password.value, error: passwordError });
      const repasswordError = changePasswordValidator(password);
      if (repasswordError){
        setReEnteredPassword({value: reEnteredPassword.value, error: repasswordError });
      }
      return;
    }
    if (password.value!=reEnteredPassword.value) {
      setReEnteredPassword({value: reEnteredPassword.value, error: "Passwords don't match" })
      return;
    }

    setPassword({value: password.value, error: "" });
    setReEnteredPassword({value: reEnteredPassword.value, error: "" })
    setButtonLoading(true)
    fetch(config.baseurl+'/api/v1/updatePassword', {
      method: 'POST',
      body: JSON.stringify({
          emailId: user.emailId,
          password: password.value,
      }),
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
      })
      .then(response => {
        setButtonLoading(false)
          if (response.status == 200){
            console.log("Reached here!!")
              changePassword()
              navigation.navigate('HomeScreen');
          }
          else{

            setReqResponse({message:'Error: Cannot change password'})
            setPassword({value: password.value, error: "Error: cannot change Password"});
            setReEnteredPassword({value: reEnteredPassword.value, error: "Error: cannot change Password" })
          }
      })
      .catch(err => {
        setButtonLoading(false)
        console.log(err)
        setPassword({value: password.value, error: "Error: cannot change Password"});
        setReEnteredPassword({value: reEnteredPassword.value, error: "Error: cannot change Password" })
      })
  };


  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate('ProfileScreen')} />
        <Logo />
        <Header>Dr. Reddy's Foundation</Header>

        <TextInput
          label="Enter New Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />   

        <TextInput
          label="Re-Enter Password"
          returnKeyType="done"
          value={reEnteredPassword.value}
          onChangeText={text => setReEnteredPassword({ value: text, error: '' })}
          error={!!reEnteredPassword.error}
          errorText={reEnteredPassword.error}
          secureTextEntry
        />       

        <Button
          mode="contained"
          loading = {submitButtonLoading}
          onPress={_onSendPressed}
          style={styles.button}
        >            Submit
          </Button>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
});

const mapPropstoState = state => {
  return {
      user: state.auth.user 
  }
}

export default connect(mapPropstoState, {changePassword})(memo(ChangePasswordScreen))
