import React, { memo, useState, useEffect,Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
//import DatePicker from 'react-date-picker';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import config from '../config/index.js';
import { connect } from 'react-redux';
import { onboardInputChange,signup } from '../actions';
import Paragraph from '../components/Paragraph';

import {
  nameValidator,
  studentIDValidator,
  phoneValidator,
  dateOfBirthValidator,
  emailValidator,
  centerNameValidator,
} from '../core/utils';
const options = [
  { label: 'Panjagutta', value: 'Panjagutta' },
  { label: 'Nalgonda', value: 'Nalgonda' },
  { label: 'Medchal', value: 'Medchal' },
  { label: 'Patancheru', value: 'Patancheru' },
];
class RegisterScreen extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.signup_valid);
        console.log(nextProps.error);
        console.log(nextProps.user);
        if(nextProps.user!=null){
           if(nextProps.user.email!=null){
           // if (!_.isEmpty(nextProps.user)) {
                this.props.navigation.navigate('SignUpSuccessScreen', nextProps.user);
            }
        }
    }

    showButton(){
      if (this.props.signup_loading) {
        return (
          <View>
            <ActivityIndicator size="small" />
          </View>
        );
      } else {
        return (
          <Button mode="contained" onPress={this.onSignUpPressed}>
            Signup
          </Button>
        );
      }
    }

    showError() {
      if (this.props.error) {
        return <Paragraph>{this.props.error}</Paragraph>;
      }
      else{
        return ;
      }
    }

    componentDidMount(){
    fetch(config.baseurl+'/api/v1/centreDetails', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(response => response.json())
                .then(res => {
                  console.debug(res);
                  this.props.onboardInputChange({ field: 'centres', value:res});
                })
                .catch(error => {
                console.log(error);
                });
    }

  onSignUpPressed = () => {
       console.log('fref');
       console.log(this.props.firstName.value);
      // const firstNameError = nameValidator(this.props.firstName.value);
       //const lastNameError = nameValidator(this.props.lastName.value);
       const studentIDError = studentIDValidator(this.props.studentID.value);
       const phoneError = phoneValidator(this.props.phone.value);
       const dateOfBirthError = dateOfBirthValidator(this.props.dateOfBirth.value);
       const emailError = emailValidator(this.props.email.value);
       //const centerNameError = centerNameValidator(this.props.centerName.value);
       console.log('onsignup');
       if (
         /*firstNameError ||
         lastNameError ||
         */studentIDError ||
         phoneError ||
         dateOfBirthError ||
         emailError /*||
         centerNameError*/
       ) {
         /*this.props.onboardInputChange({field:'firstName', value:{value:this.props.firstName.value,error:firstNameError}});
         this.props.onboardInputChange({field:'lastName', value:{value:this.props.lastName.value,error:lastNameError}});
         */this.props.onboardInputChange({field:'studentID', value:{value:this.props.studentID.value,error:studentIDError}});
         this.props.onboardInputChange({field:'phone', value:{value:this.props.phone.value,error:phoneError}});
         this.props.onboardInputChange({field:'dateOfBirth', value:{value:this.props.dateOfBirth.value,error:dateOfBirthError}});
         this.props.onboardInputChange({field:'email', value:{value:this.props.email.value,error:emailError}});
         //this.props.onboardInputChange({field:'centerName', value:{value:this.props.centerName.value,error:centerNameError}});
        console.log(this.props.centerName.error);
         return ;
       }
       console.log('before redux');
       this.props.signup(this.props);

  };

  render(){
    return (
        <ScrollView>
          <Background>
            <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />
            <Logo />
            <Header>Create Account</Header>
            <View style={styles.formStyle}>

                <TextInput
                  label="First Name"
                  returnKeyType="next"
                  value={this.props.firstName.value}
                  onChangeText={text => //this.setState({ name:{value:text,error:''} })}
                  this.props.onboardInputChange({ field: 'firstName', value: {value:text,error:''}})}

                  error={!!this.props.firstName.error}
                  errorText={this.props.firstName.error}
                />
                <TextInput
                  label="Last Name"
                  returnKeyType="next"
                  value={this.props.lastName.value}
                  onChangeText={text => //this.setState({ name:{value:text,error:''} })}
                  this.props.onboardInputChange({ field: 'lastName', value: {value:text,error:''}})}

                  error={!!this.props.lastName.error}
                  errorText={this.props.lastName.error}
                />

                <TextInput
                  label="* Student ID"
                  returnKeyType="next"
                  value={this.props.studentID.value}
                  onChangeText={text => //this.setState({ studentID:{value: text, error: ''} })}
                  this.props.onboardInputChange({ field: 'studentID', value: {value:text,error:'' } })}
                  error={!!this.props.studentID.error}
                  errorText={this.props.studentID.error}
                />
                <TextInput
                  label="Date Of Birth(YYYY-MM-DD)"
                  returnKeyType="next"
                  value={this.props.dateOfBirth.value}
                  onChangeText={text => //this.setState({ dateOfBirth:{value: text, error: '' }})}
                  this.props.onboardInputChange({ field: 'dateOfBirth', value: {value:text,error:'' } })}
                  error={!!this.props.dateOfBirth.error}
                  errorText={this.props.dateOfBirth.error}
                />
                <TextInput
                  label="* Mobile"
                  returnKeyType="next"
                  value={this.props.phone.value}
                  onChangeText={text => //this.setState({ phone:{value: text, error: '' }})}
                  this.props.onboardInputChange({ field: 'phone', value: {value:text,error:'' } })}
                  error={!!this.props.phone.error}
                  errorText={this.props.phone.error}
                />

                <TextInput
                  label="* Email"
                  returnKeyType="next"
                  value={this.props.email.value}
                  onChangeText={text => //this.setState({ email:{value: text, error: '' }})}
                  this.props.onboardInputChange({ field: 'email', value: {value:text,error:'' } })}
                  error={!!this.props.email.error}
                  errorText={this.props.email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />

                <View style={styles.container}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle="false"
                    placeholder={{
                      label: 'Select a Center Name',
                      value: null,
                    }}
                    value={this.props.centerName.value}
                    style={pickerStyle}
                    onValueChange={value => this.props.onboardInputChange({ field: 'centerName', value: {value:value,error:'' } })}
                    items={this.props.centres.map(j=>({value:j.centreName,label:j.centreName}))}
                  />
                  </View>
                  {this.props.centerName.error ? (
                    <Text style={styles.error}>{this.props.centerName.error}</Text>
                  ) : null}

            </View>

            {this.showError()}
            {this.showButton()}
            <View style={styles.row}>
              <Text style={styles.label}>Already have an account? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </Background>
        </ScrollView>
      );
  }
}
const pickerStyle = StyleSheet.create({
    inputAndroid: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 4,
      borderRadius: 4,
      width: '100%',
      marginVertical: 6,
      color: 'black',
      borderColor: '#808080',
    },
  });

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  formStyle: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button: {
    marginTop: 24,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  container: {
    borderWidth : 1,
    width: '100%',
    marginVertical: 15,
    borderRadius: 4,
    borderColor: '#808080',
  },
});

const mapStateToProps = state => {
  return {
    firstName: state.onboard.firstName,
    lastName: state.onboard.lastName,
    studentID: state.onboard.studentID,
    phone: state.onboard.phone,
    dateOfBirth: state.onboard.dateOfBirth,
    email: state.onboard.email,
    centerName: state.onboard.centerName,
    user: state.onboard.user,
    error: state.onboard.error,
    signup_loading: state.onboard.signup_loading,
    signup_valid: state.onboard.signup_valid,
    centres: state.onboard.centres
  };
};

export default connect(mapStateToProps, { onboardInputChange,signup })(
  RegisterScreen
);