import React, { memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { emailValidator, passwordValidator } from '../core/utils';
import { connect } from 'react-redux';
import { authInputChange, login } from '../actions';
import Paragraph from '../components/Paragraph';
import _ from 'lodash';

class LoginScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.user)) {
      if (nextProps.user.isAdmin == "N")
        this.props.navigation.navigate('UserHomeScreen', nextProps.user);
      else
        this.props.navigation.navigate('AdminHomeScreen', nextProps.user);
    }
  }

  submitLogin() {
    console.debug('submitLogin');
    //console.debug({ this.email, this.props.emailpassword });
    const { emailId, password } = this.props;
    console.debug(emailId);

    this.props.login({ emailId, password });
  }

  showButton() {
    if (this.props.loading) {
      return (
        <View>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return (
        <Button mode="contained" onPress={this.submitLogin.bind(this)}>
          Login
        </Button>
      );
    }
  }

  showError() {
    if (this.props.error) {
      return <Paragraph>{this.props.error}</Paragraph>;
    }
  }
  render() {
    return (
      <ScrollView>
        <Background>
          <Logo />
          <Header>Dr. Reddy's Foundation</Header>

          <TextInput
            label="Email"
            returnKeyType="next"
            value={this.props.emailId}
            onChangeText={text =>
              this.props.authInputChange({ field: 'emailId', value: text })
            }
            autoCapitalize="none"
            autocompletetype="emailId"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={this.props.password}
            onChangeText={text =>
              this.props.authInputChange({ field: 'password', value: text })
            }
            secureTextEntry
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ForgotPasswordScreen')
              }
            >
              <Text style={styles.normalLink}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          {this.showError()}
          {this.showButton()}

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterScreen')}
            >
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  normalLink: {
    color: theme.colors.primary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

const mapStateToProps = state => {
  return {
    emailId: state.auth.emailId,
    password: state.auth.password,
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.auth.error,
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
  };
}; */
//{ authInputChange, login } mapDispatchToProps
export default connect(mapStateToProps, { authInputChange, login })(
  LoginScreen
);
