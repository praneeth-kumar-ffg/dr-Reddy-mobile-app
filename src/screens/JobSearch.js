import { ScrollView, View, Text,StatusBar, ActivityIndicator} from 'react-native'
import { Card, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, Image,StyleSheet} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Button from '../components/Button';
import { theme } from '../core/theme';
import {connect} from 'react-redux';
import config from '../config/index.js';

//Main Job Search React Component
const JobSearch = (props) => {

    //defining states
    var [data, setData] = useState({value:[]})
    var [dataBackup, setDataBackup] = useState({value:[]})    
    var [searchText, setSearchText] = useState({value:''})
    var [dialogVisibility, setdialogVisibility] = useState(false)
    var [jobSelected, setJobSelected] = useState({})
    var [yesButtonLoading, setButtonLoading] = useState(false)
    var [showAlert, setAlertVisibility] = useState(false)
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''})
    var [showLoader, setLoaderVisibility] = useState(true)


    //Initialising variables for alert, popup, loader and touchableOpacity components
    var showPopup = null
    var showTouchOpacity = null
    var Alert = null
    var loader = null


    //Loader view component
    const loaderComp = (
        <View style = {styles.loader}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    )


    //Popup view component
    const popup = (
        <View style={styles.popupContainer}>
            <Text  style = {styles.popupHeaderText}>Confirmation</Text>
            <View style = {{flex: 1, flexDirection: 'row', marginLeft: '10%', marginTop: "5%",marginBottom: '8%'}}>
                <Icon name='assignment-ind' color="#0b2652" size={25} style = {{flex:1}}/>   
                <Text style={styles.popupText}> {jobSelected.designation}</Text>
            </View>
            <View style = {{flex: 1, flexDirection: 'row', marginLeft: '10%', marginBottom: '8%'}}>
                <Icon name='location-city' color="#0b2652" size={25} style = {{flex:1}} />   
                <Text style={styles.popupText}> {jobSelected.companyName}</Text>
            </View>
            <View style = {{flex: 1, flexDirection: 'row',  marginLeft: '10%', marginBottom: '10%'}}>
                <Icon name='place' color="#0b2652" size={25} style = {{flex:1}}/>   
                <Text style={styles.popupText}> {jobSelected.cityName}</Text>
            </View>
            <Text style={{flex:1, width: "100%"}}></Text>
            <View style = {{flex:1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey'}}>
                <PaperButton mode = "contained" labelStyle = {styles.text} style={styles.noButton} onPress = {() => {setdialogVisibility(false)}}>No</PaperButton>
                <PaperButton mode = "contained"  labelStyle = {styles.text} style={styles.yesButton} onPress = {() => sendJobRequest()} loading = {yesButtonLoading}>Yes</PaperButton>
            </View>
        </View>
    )


    //Alert view Component; Created dynamically based on request response status
    const resAlert = (
        <View style = {{flexDirection: 'row', padding: '5%', alignItems: 'center',backgroundColor: alertParameters.backgroundColor}}>
            <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {25} />
            <Text style = {{fontSize: 20, width: '90%'}}>{alertParameters.message}</Text>
            <Icon name = 'clear' color = {alertParameters.iconColor} size = {20}  onPress = {() => setAlertVisibility(false)} />
        </View>
    )


    //Touchable opacity view component
    const TouchableOpacityView = (
        <TouchableOpacity disabled = {true} style = {styles.touchOpacity} onPress ={ ()=>{setdialogVisibility(false)}}></TouchableOpacity>
    )


    //Function runs once only when Job Search screen is rendered to get job data
    useEffect(() => {
        fetch(config.baseurl+'/api/v1/jobs/'+props.user.aspirantId)
        .then(response => {
            if (response.status != 200){
                setLoaderVisibility(false)
                setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                setAlertVisibility(true)
                return "Server Error"
            }
            else{
                return response.json()
        }})
        .then(res => {
            setLoaderVisibility(false)
            if (Array.isArray(res) && res.length) {
            setData({value: res});
            setDataBackup({value: res});
            }
            else {
                if (res!="Server Error"){
                    setAlertParameters({message: "No jobs found", backgroundColor: '#f0eabd', icon: 'warning', iconColor: '#665c10'})
                    setAlertVisibility(true)
                }
            }
        })
        .catch(err => {
            setLoaderVisibility(false)
            setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
        })
        
    },[])

    
    //Conditionally rendering popup
    if (dialogVisibility) {
        showPopup = popup
        showTouchOpacity = TouchableOpacityView
    }


    //Conditionally rendering alert
    if (showAlert){
        Alert = resAlert
    }


    //Conditionally rendering loader
    if (showLoader){
        loader = loaderComp
    }


    //Filtering job data according to city provided by the user in serch box   
    const searchJob = (text) => {
        setSearchText({value: text})
        searchText = text.trim().toLowerCase();
        if (!searchText == "") {
            var filteredData = dataBackup.value.filter(l => {
                return l.cityName.trim().toLowerCase().startsWith( searchText );
            });
            setData({value: filteredData})
        }
        else {
            setData({value: dataBackup.value})
        }
    }

    
    const applyJobHandler = (index) => {
        let jobDetails = {...data.value[index], "index": index}
        setJobSelected(jobDetails)
        setdialogVisibility(true)
     }


     //Removing job entry from list after user has applied for it
     const removeAppliedJobEntry = () => {
        let UpdatedDataJobList = [...data.value]
        let UpdatedBackupJobList = [...dataBackup.value]
        let backupIndex = dataBackup.value.findIndex((jobDetails)=>{
            return jobDetails.jobId == jobSelected.jobId
        })
        UpdatedDataJobList.splice(jobSelected.index,1)
        UpdatedBackupJobList.splice(backupIndex,1)
        setData({value: UpdatedDataJobList})
        setDataBackup({value: UpdatedBackupJobList})
     }


     //Send Job Request to the backend with job and user details
     const sendJobRequest = () => {
        setButtonLoading(true)
        fetch(config.baseurl+'/api/v1/jobrequest', {
            method: 'POST',
            body: JSON.stringify({
                studentId: props.user.aspirantId,
                studentEmail: props.user.emailId,
                studentName: props.user.firstName+' '+props.user.lastName,
                jobId: jobSelected.jobId,
                jobRole: jobSelected.designation,
                jobCompanyName: jobSelected.companyName,
                jobDescription: jobSelected.jobDescription
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            setButtonLoading(false)
            setdialogVisibility(false)
            if (response.status == 200){
                setAlertParameters({message: "Request successfully sent", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'})
                removeAppliedJobEntry();
            }
            else {
                setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            }
            setAlertVisibility(true)
        })
        .catch(err => {
            setButtonLoading(false)
            setdialogVisibility(false)
            setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
        })

     }

    return (
        <View style = {{flex: 1}}>
                <StatusBar backgroundColor = '#262629' barStyle = 'light-content'></StatusBar>
                <SearchBar 
                    containerStyle = {{backgroundColor: "#151517"}}
                    inputContainerStyle = {{marginLeft: '10%',width:'88%', marginTop: '2%', marginBottom: '2%', backgroundColor: '#202024'}}
                    searchIcon
                    clearIcon
                    placeholder='Search Location'
                    onChangeText={text=>searchJob(text)}
                    value = {searchText.value}
                />
                <TouchableOpacity onPress={() => {props.navigation.navigate("UserHomeScreen")}} style={styles.backContainer}>
                    <Image style={styles.backImage} source={require('../assets/arrow_back.png')} />
                </TouchableOpacity>
  

            {loader}
            {Alert}

            <ScrollView>
                {data.value.map((j,index)=>(
                <Card
                key={j.jobId}
                title={j.designation}
                style={{marginTop: 20 ,width: '95%'}} >
                <Text style={{marginBottom: 8}}>
                        Company: {j.companyName}
                    </Text>
                    <Text style={{marginBottom: 8}}>
                        Location: {j.cityName}
                    </Text>
                    <Text style={{marginBottom: 8}}>
                        Description: {j.jobDescription}
                    </Text>
                <Button mode="contained" onPress = {() => {applyJobHandler(index)}}>Apply Now</Button>
                </Card>))}
            </ScrollView>
            
            {showTouchOpacity}
            {showPopup}
        </View>  
    );

};


//StyleSheet object
const styles = StyleSheet.create({
    text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: 'white'
  },
  yesButton: {
    flex: 0.5,
    margin: '3%',
    backgroundColor: '#3f9e3a'
  },
  noButton: {
    flex: 0.5, 
     margin: '3%',
    backgroundColor: '#e35b5b'
  },
popupContainer: {
    borderRadius: 20,
    position: 'absolute',
    zIndex: 5,
    flex: 1,
    width: '70%', 
    marginTop: '25%',
    marginHorizontal: '15%',
    flexDirection: 'column',
    padding: '3%',
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width:2, height: 2},
    borderBottomWidth: 1,
    borderBottomColor: '#1c3466'
  },
popupHeaderText: {
    flex: 1, 
    textAlign: 'center', 
    marginTop: "2%",
    marginBottom: '5%',
    width: '100%', 
    fontSize: 22,
    color: '#1a2638',
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
popupText: {
    flex: 1,
    fontSize: 18, 
    marginLeft: "1%",
    color:'#426db3'
  },
loader: {
    flex:1, 
    justifyContent: 'center',
    padding: "5%"
  },
touchOpacity: {
    width: "100%", 
    height: "100%",
    backgroundColor: "black", 
    opacity: 0.7, 
    position: "absolute"
  },
  backContainer: {
    position: 'absolute',
    top: 22,
    left: '3%',
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: "#86939e"
  },
});


//Connecting to Redux and getting user details as props
const mapPropstoState = state => {
    return {
        user: state.auth.user 
    }
}

export default connect(mapPropstoState)(memo(JobSearch));
