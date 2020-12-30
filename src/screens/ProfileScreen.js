import React, { memo, useState, useEffect, Component} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { View,Text, StyleSheet,TouchableOpacity,ScrollView,Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {updateProfile} from '../actions';
import config from '../config/index.js';
import {
  companyValidator,
  phoneValidator,
  stateValidator,
  cityValidator
} from '../core/utils';



const ProfileScreen = (props) => {
  var [name, setName] = useState({ value: props.user.firstName + ' ' + props.user.lastName, error: '' });
  var [email, setEmail] = useState({ value: props.user.emailId, error: '' });
  var [mobile, setMobile] = useState({ value: props.user.phone, error: '' });
  
    var [city, setCity] = useState({value: []});
    var[state, setState] = useState({value:[]});
    var[ cityData, setCityData]= useState([]);
    var[ stateData, setStateData] = useState([]);
    var [cityId, setCityId] = useState(null);
    var [currentStateId, setStateId] = useState(null);
    var [selectedStateItem,setSelectedState]= useState(props.user.stateName);
    var [selectedCityItem,setSelectedCityItem]=useState(props.user.cityName) ;
  var [CurrentCompany, setCurrentCompany] = useState({ value: props.user.currentOrganization, error: '' });
  var [showAlert, setAlertVisibility] = useState(false);
  var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''});
  var [submitButtonLoading, setButtonLoading] = useState(false)
  var stateId = null;
  var Alert = null;

  const resAlert = (
    <View style = {{flex:1, flexDirection: 'row', paddingHorizontal: "5%", backgroundColor: alertParameters.backgroundColor}}>
          <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {25} style = {{flex:1}} />
          <Paragraph style = {{fontSize: 20, flex: 5,}}>{alertParameters.message}</Paragraph>
          <Icon name = 'clear' color = {alertParameters.iconColor} size = {25} style = {{flex:1}} onPress = {() => setAlertVisibility(false)} />
      </View> 
);
if (showAlert){
  Alert = resAlert;
}
  

  const stateFetch=() =>{
    fetch(config.baseurl+'/api/v1/stateDetails') 
    .then(response => {
      if (response.status != 200){
          setLoaderVisibility(false)
          setAlertParameters({message: "Unable to fetch jobs, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
          setAlertVisibility(true)
      }
      else{
          return response.json()
      }})
        .then(json => {
          setStateData(json);
          let citylist=[];
          let statelist=[];
          json.forEach(i =>{
            statelist.push({label:i.stateName, value: i.stateName});
          })
          setState({value:statelist});
        })
      }

    useEffect(() => {
        stateFetch();
      },[]);

  const getCityId=(selectedCity)=>{
      setSelectedCityItem(selectedCity);
      if(selectedCity != '' && selectedCity != null){
      let selectedcityList= cityData.filter(i => {
        return i.cityName == selectedCity;
      });
      setCityId(selectedcityList[0].cityId);
      }
  
    }


const getState=(selectedState)=>{
 let citylist=[];
 setSelectedState(selectedState);
  if(selectedState !='' && selectedState != null){   
  let selectedStateList = stateData.filter(i => {
    return i.stateName == selectedState;
  });
  stateId = selectedStateList[0].stateId;
  setStateId(stateId)
  const headers = { 'Content-Type': 'application/json' }
  fetch(config.baseurl+'/api/v1/cityDetails/'+stateId,{headers},{mode:"no-cors"})
  .then(response =>  {
    if (response.status != 200){
        setLoaderVisibility(false)
        setAlertParameters({message: "Unable to fetch jobs, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
        setAlertVisibility(true)
    }
    else{
        return response.json()
  }})
  .then(json => {
    setCityData(json);
    json.forEach(i =>{
      citylist.push({label: i.cityName, value: i.cityName});
      cityData.push(i.cityName);
    })
    setCity({value:citylist});
  }).catch(err => {})

  }
}

  const fieldValidation = () => {
    var valPass = true
    var mobileError = phoneValidator(mobile.value)
    var companyError = companyValidator(CurrentCompany.value)
    var cityError = cityValidator(selectedCityItem)
    if (mobileError){
      setMobile({value: mobile.value, error: mobileError})
      valPass = false
    }
    if (companyError){
      setCurrentCompany({value: CurrentCompany.value, error: companyError})
      valPass = false
    }
    if (cityError) {
      setAlertParameters({message: "City cannot be empty", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
      setAlertVisibility(true)
      valPass = false
    }
    return valPass
  }

  const _onProfileUpdateSuccess = () => {
      var newUserDetails = {
        aspirantId:props.user.aspirantId,
        firstName:props.user.firstName,
        lastName:props.user.lastName,
        emailId:props.user.emailId,
        phone:mobile.value,
        dob:props.user.dob,
        currentOrganization:CurrentCompany.value,
        cityId:cityId,
        cityName:selectedCityItem,
        stateId:currentStateId,
        stateName:selectedStateItem,
        centerId:props.user.centerId,
        centerName:props.user.centerName,
        isAdmin:props.user.isAdmin
      } 
      props.updateProfile(newUserDetails)
  }

  const _onSavePressed = () => {
      if (!fieldValidation()){
        return "Input Incorrect"
      }  
      setButtonLoading(true)
      fetch(config.baseurl+'/api/v1/updateProfile', {
        method: 'POST',
        headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            emailId:props.user.emailId,
            phone:mobile.value,
            cityId:cityId,
            currentOrganization:CurrentCompany.value
             }),
           })
           .then(response => {
           setButtonLoading(false)
           if (response.status == 200){
            setAlertParameters({message: "Profile details successfully updated", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'});
            setAlertVisibility(true);
            setTimeout(()=>{
                  _onProfileUpdateSuccess()
            },4000)
          }
          else{
            setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'});
            setAlertVisibility(true);
          }
        })
            .catch(error => {
              setButtonLoading(false)
              setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'});
              setAlertVisibility(true);
            });
      
    }

    const _onPasswordChange = () => {
      props.navigation.navigate('ChangePasswordScreen');
    };

  

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => {
          if(props.user.isAdmin=="N")
            props.navigation.navigate('UserHomeScreen');
          else
            props.navigation.navigate('AdminHomeScreen');
            }} />
        <Logo />
        {Alert}

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          editable={false}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="* Mobile"
          returnKeyType="next"
          value={mobile.value.toString()}
          onChangeText={text => setMobile({ value: text, error: '' })}
          error={!!mobile.error}
          errorText={mobile.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          editable={false}
        />


    <View style={styles.container}>
          <RNPickerSelect
          value={selectedStateItem}
            onValueChange={e => getState(e)}
            items={state.value}
            style={pickerStyle}
          />
        </View>

        <View style={styles.container}>
           <RNPickerSelect
           placeholder={{
             label: '* Select a City Name',
             value: null,
           }}
            value={selectedCityItem}
            onValueChange={e => getCityId(e)}
            items={city.value}
            style={pickerStyle}
          />

        </View>


<TextInput
          label="* Current Company"
          returnKeyType="next"
          value={CurrentCompany.value}
          onChangeText={text => setCurrentCompany({ value: text, error: '' })}
          error={!!CurrentCompany.error}
          errorText={CurrentCompany.error}
        />

        <Button
          mode="contained"
          loading = {submitButtonLoading}
          onPress={_onSavePressed}
          style={styles.button}
        >
          Save
        </Button>

        <Button
          mode="contained"
          onPress={_onPasswordChange}
          style={styles.button}
        >            Change Password
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
    width: '100%',
    paddingTop: 17,
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
});
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    backgroundColor: theme.colors.surface,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    borderColor: '#808080',
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, {updateProfile })(memo(ProfileScreen));
