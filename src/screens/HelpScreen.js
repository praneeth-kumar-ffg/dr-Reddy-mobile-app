import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {  Icon } from 'react-native-elements';
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import config from '../config/index.js';
import { userSubmitHelp, userSubmitEmptyDetails,clearDetails } from '../actions';


class HelpScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.error);
    if (!_.isEmpty(nextProps.user)) {
      this.props.navigation.navigate('Dashboard', nextProps.user);
    }
  }
  isActive = false;
   Alert = null;
  state={
    problemType:[],
    selectedProblemType:"",
    validationError:"",
    problemDetails:[],
    selectedProblemDetails:"",
    additionalDetails:"",
    dummyvl:["test1","test2"],
    error:"Please fill required details"
  };

  submitDetails(){
    const { prblmType,prblmDesc,additionalDetails,user } = this.props;
    console.debug('submit Details');
    console.log("inside submit "+this.state.selectedProblemType);
    if(this.state.selectedProblemType=='' || this.state.selectedProblemType == null || this.state.selectedProblemDetails=='' || this.state.selectedProblemDetails==null){
      this.props.userSubmitEmptyDetails(this.state.selectedProblemType,this.state.selectedProblemDetails, this.state.additionalDetails)
    }
   else{
      let aspirantId= this.props.user.aspirantId;
      let centerId=this.props.user.centerId;
      console.debug(this.props.additionalDetails);
      this.props.userSubmitHelp(this.state.selectedProblemType,this.state.selectedProblemDetails, this.state.additionalDetails,aspirantId,centerId );
   }
  }

  showError() {
    if (this.props.error) {
      console.log("Inside props error");
      this.isActive=true; 
      return(<View style={{ backgroundColor: 'lightblue',flexDirection: 'row'}}>
        <Paragraph >{this.props.error}</Paragraph>
        <Icon name = 'clear' size = {25}  onPress = {() => this.clear(this)} />
        </View> );
    }
    else{
      return ;
    } 
  }
  clear(){
  if(this.isActive){
    this.props.clearDetails();
    return<Paragraph></Paragraph>
  }
  }
  showButton(){
    if (this.props.loading) {
      return (
        <View>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    else{
      return (
    <Button mode="contained" onPress={this.submitDetails.bind(this) }>
      Submit
    </Button>
      );
    }

  }
  componentDidMount(){
    const headers = { 'Content-Type': 'application/json' }
    fetch(config.baseurl+"/api/v1/helpDetails/help_type='Problem Type'",{headers},{mode:"no-cors"})
    .then(response =>{
      if (response.status != 200){
        setLoaderVisibility(false)
        setAlertParameters({message: "Unable to fetch jobs, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
        setAlertVisibility(true)
    }
    else{
        return response.json()
}
}).then(data =>{
        console.log("data=>"+data);
        console.log("problemType=>"+data);
        this.setState({
          problemType: data,
        });

      }).catch(error=>{
        console.error();
      });

    fetch(config.baseurl+"/api/v1/helpDetails/help_type='Problem Details'",{headers},{mode:"no-cors"})
    .then(response =>
      response.json()

    )
       .then(data =>{
        console.log("data=>"+data);
        console.log("problemType=>"+data);
        this.setState({
          problemDetails:data
        });

      }).catch(error=>{
        console.error();
      });
  }
  render(){
    return(
      <Background>
    <BackButton goBack={() => this.props.navigation.navigate('UserHomeScreen')} />
    <Logo />
    <Paragraph>Need help - Tell us more</Paragraph>
    {this.showError()}
    <View style={styles.container}>
      <RNPickerSelect
            placeholder={{
              label: 'Select a Problem Type',
              value: null,
            }}
            value={this.state.selectedProblemType}
            style={pickerStyle}
            onValueChange={e=>{console.log(e);
            this.setState(
              {
                selectedProblemType : e
              }
            )}
         }
            items={this.state.problemType.map(j=>({value:j.helpValue,label:j.helpValue}))}
          />
      </View>
    <View style={styles.container}>
      <RNPickerSelect
            placeholder={{
              label: 'Select Problem Details',
              value: null,
            }}
            value={this.state.selectedProblemDetails}
            style={pickerStyle}
            onValueChange={e =>
              this.setState({
                selectedProblemDetails: e
              })}
            items={this.state.problemDetails.map(j=>({value:j.helpValue,label:j.helpValue}))}
          />
    </View>
  
    <TextInput
      label="Additional-Details"
      multiline={true}
      numberOfLines={10}
      style={styles.input}
      value= {this.state.additionalDetails}
      onChangeText={text =>
        this.setState({additionalDetails:text})
       // this.props.userSubmitHelp({additionalDetails:text})
      }
    />
   
    {this.showButton()}
    
    
  </Background>
  
 );
  }
}
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    color: '#999',
    borderColor: 'black',
  }
});
const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    textAlignVertical: 'top',
    //height: 120,
    width:'100%',
    paddingTop:0,
    paddingBottom:0,
  },
  container: {
    borderWidth: 1,
    width: '100%',
    marginVertical: 12,
  },

  formStyle:{
    backgroundColor: theme.colors.surface
  }
});
const mapStateToProps = state => {
  return {
    user:state.auth.user,
    prblmType:state.help.problemType,
    prblmDesc:state.help.prblmDesc,
    additionalDetails: state.help.additionalDetails,
    userHelpDetails: state.help.userHelpDetails,
    error:state.help.error,
  };
};
export default connect(mapStateToProps, { userSubmitHelp, userSubmitEmptyDetails,clearDetails })(
  HelpScreen
);