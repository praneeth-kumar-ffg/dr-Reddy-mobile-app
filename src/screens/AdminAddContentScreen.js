import React, { memo, useState, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import _ from 'lodash';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { authContentChange, addContent } from '../actions';
import {} from '../core/utils';
import PropTypes from 'prop-types';
import config from '../config/index.js';
const contentTypeOptions = [
  { label: 'Video', value: 'Video' },
  { label: 'Document', value: 'Document' },
  { label: 'Website', value: 'Website' },
];

class AdminAddContentScreen extends React.Component {

  handleSubmit = () => {
    console.log('submitContent');
    const { contentURL, contentType, contentDesc, assessmentURL } = this.props;
    console.log(contentURL + contentType + contentDesc + assessmentURL);
    if(!contentURL.length) {alert('Content URL should not be empty'); return;}
    if(!contentType.length) {alert('Content Type should not be empty'); return;}
    if(!contentDesc.length) {alert('Content Description should not be empty'); return; }
     fetch(config.baseurl+'/api/v1/content/request', {
                 method: 'POST',
                 body: JSON.stringify({
                 contentURL: this.props.contentURL,
                 contentType: this.props.contentType,
                 contentDesc: this.props.contentDesc,
                 assessmentURL: this.props.assessmentURL
              }),
              headers: {
                 'Content-Type': 'application/json',
               }})
               .then(response => {
                   console.log('reponse received!' + response.status);
                   if (response.status != 200){
                           console.log("Error occured while saving data");
                           setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                   }
                   else {
                            console.log("added successfully");
                            alert("Data added successfully");
                            this.resetContent();
                   }
                   })
                   .catch(err => {
                        console.log("error occurred while adding");
                     })
  }

  resetContent = () => {
    console.log('reset content');
    this.props.authContentChange ({field: 'contentURL',value: ''});
    this.props.authContentChange ({field: 'Content Type', value: ''});
    this.props.authContentChange ({field: 'contentDesc', value: ''});
    this.props.authContentChange ({field: 'assessmentURL',value: ''});
  }

  render() {
    return (
      <ScrollView>
        <Background>
          <BackButton
            goBack={() => this.props.navigation.navigate('AdminContentManagement')}
          />
          <Logo />
          <Header>Dr. Reddy's Foundation</Header>
          <Header>Add New Content</Header>
          <View style={styles.formStyle}>
              <TextInput label="Content URL" returnKeyType="next" value={this.props.contentURL}
                onChangeText={value => this.props.authContentChange({field: 'contentURL',value: value, })}/>
              <RNPickerSelect placeholder={{ label: 'Content Type', value: '' }} value={this.props.contentType}
                style={pickerStyle} onValueChange={value => this.props.authContentChange({ field: 'contentType', value: value, })} items={contentTypeOptions}/>
              <TextInput label="Description" returnKeyType="next" value={this.props.contentDesc}
                onChangeText={value => this.props.authContentChange({ field: 'contentDesc', value: value,})}/>
              <TextInput label="Assessment URL" returnKeyType="next" value={this.props.assessmentURL}
                onChangeText={value => this.props.authContentChange({field: 'assessmentURL',value: value, })}/>
          </View>

          <Button mode="contained" onPress={this.handleSubmit.bind(this)}> SAVE </Button>
          <Button mode="contained" onPress={this.resetContent.bind(this)}> RESET </Button>
        </Background>
      </ScrollView>
    );
  }
}
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    backgroundColor: theme.colors.surface,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 4,
    borderRadius: 4,
    width: '100%',
    marginVertical: 12,
    color: '#999',
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
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    contentURL: state.addContent.contentURL,
    contentType: state.addContent.contentType,
    contentDesc: state.addContent.contentDesc,
    assessmentURL: state.addContent.assessmentURL,
    loading: state.addContent.loading,
  };
};

export default connect(mapStateToProps, { authContentChange })(
  AdminAddContentScreen
);
