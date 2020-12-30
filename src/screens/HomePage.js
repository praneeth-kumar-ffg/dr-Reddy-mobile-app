import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native'
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect} from 'react';
import { TouchableOpacity,StatusBar, StyleSheet} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import config from '../config/index.js';
import * as Linking from 'expo-linking';

const HomePage = ({ props, navigation }) => {
    var [data, setData] = useState({value:[]})
    var [dataBackup, setDataBackup] = useState({value:[]})
    var [searchText, setSearchText] = useState({value:''})
    var [dialogVisibility, setdialogVisibility] = useState(false)
    var [contentSelected, setContentSelected] = useState({})
    var [showLoader, setLoaderVisibility] = useState(true)
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''})
    var [yesButtonLoading, setButtonLoading] = useState(false)
    var [showAlert, setAlertVisibility] = useState(false)

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


    //Alert view Component; Created dynamically based on request response status
    const resAlert = (
        <View style = {{flex:1, flexDirection: 'row', paddingTop: "5%", paddingHorizontal: "5%", paddingBottom: "10%", backgroundColor: alertParameters.backgroundColor}}>
            <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {25} style = {{flex:1}} />
            <Text style = {{fontSize: 20, flex: 5,}}>{alertParameters.message}</Text>
            <Icon name = 'clear' color = {alertParameters.iconColor} size = {25} style = {{flex:1}} onPress = {() => setAlertVisibility(false)} />
        </View>
    )


    //Touchable opacity view component
    const TouchableOpacityView = (
        <TouchableOpacity style = {styles.touchOpacity} onPress ={ ()=>{setdialogVisibility(false)}}></TouchableOpacity>
    )

    useEffect(() => {
              fetch(config.baseurl+"/api/v1/content/details")
              .then(response => {
                  if (response.status != 200){
                      setLoaderVisibility(false)
                      setAlertParameters({message: "Unable to fetch content, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                      setAlertVisibility(true)
                  }
                  else{
                      return response.json()
              }})
              .then(contents => {
                  setLoaderVisibility(false)
                  if (Array.isArray(contents) && contents.length) {
                  setData({value: contents});
                  setDataBackup({value: contents});
                  }
                  else {
                      setAlertParameters({message: "No contents found", backgroundColor: '#f0eabd', icon: 'warning', iconColor: '#665c10'})
                      setAlertVisibility(true)
                  }
              })
              .catch(err => {
                  setLoaderVisibility(false)
                  setAlertParameters({message: "Unable to fetch contents", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
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


    const searchContent = (text) => {
        setSearchText({value: text})
        searchText = text.trim().toLowerCase();
        if (!searchText == "") {
            var filteredData = dataBackup.value.filter(l => {
                return l.contentDesc.trim().toLowerCase().startsWith( searchText );
            });
            setData({value: filteredData})
        }
        else {
            setData({value: dataBackup.value})
        }
    }

    const isDisabled = (val) => {
        if(val == "" || val == null)
            return true;
        return false;
    }
    const getIconName = (name) => {
        console.log("content type  : "+ name);
        if(name == "Video")     return require('../assets/content-type/play.png');
        if(name == "Document")  return require('../assets/content-type/file.png');
        if(name == "Website")   return require('../assets/content-type/web.png');
        else return require('../assets/content-type/play.png');
    }

    return (
        <ScrollView >
        <View>
        <StatusBar backgroundColor = '#262629' barStyle = 'light-content'></StatusBar>
        <SearchBar
             containerStyle = {{backgroundColor: "#151517"}}
             inputContainerStyle = {{marginLeft: '10%',width:'88%', marginTop: '2%', marginBottom: '2%', backgroundColor: '#202024'}}
             darkTheme
             clearIcon
             placeholder='Search Content'
            onChangeText={text=>searchContent(text)}
            value = {searchText.value}
        />
        <TouchableOpacity onPress={() => {navigation.navigate("UserHomeScreen")}} style={styles.backContainer}>
               <Image style={styles.backImage} source={require('../assets/arrow_back.png')} />
        </TouchableOpacity>
            {loader}
            {Alert}
            {data.value.map((j,index)=>(<View style={styles.viewStyle}>
                <Card key={j.content_id} wrapperStyle={styles.content} containerStyle={styles.container} >
                    <TouchableOpacity onPress={()=>Linking.openURL(j.contentURL)}>
                    <Image source={getIconName(j.contentType)}  onPress={()=>Linking.openURL(j.contentURL)} style={styles.image}/>
                    </TouchableOpacity>
                    <Text style = {styles.popupText}>{j.contentDesc}</Text>
                    <TouchableOpacity onPress={()=>Linking.openURL(j.assessmentURL)}>
                    <Button mode="contained" disabled = {isDisabled(j.assessmentURL)}>Quiz</Button>
                    </TouchableOpacity>
                </Card>
                </View>
            ))}
            {showTouchOpacity}
        </View>
        </ScrollView>
    );
};

//StyleSheet object
const styles = StyleSheet.create({
    image: {
          width: 40,
          height: 40,
    },
    container: {
        width:'80%',
        shadowOffset: {
                     	width: 1,
                     	height: 3,
                     },
        shadowOpacity: 0.6,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 25
    },
    content: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
      viewStyle: {
       flexDirection:'row',
       justifyContent:'space-around',
    },
    icon: {
        marginLeft:'0.25%',
        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        color: 'white'
  },
  yesButton: {
        flex: 0.5,
        marginRight: "20%",
        marginLeft: "2%",
        marginVertical: '3%',
        backgroundColor: '#3f9e3a'
  },
  noButton: {
        flex: 0.5,
        marginLeft: "20%",
        marginRight: "2%",
        marginVertical: '3%',
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
        marginTop: "2%", width: '100%',
        fontSize: 22,
        color: '#1a2638',
        fontWeight: "bold"
      },
    popupText: {
        flex: 1,
        fontSize: 18,
        marginLeft: "1%",
        color:'#426db3',
        textAlign: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
        top:  22,
        left: 10,
      },
      backImage: {
        width: 24,
        height: 24,
        tintColor: "#86939e"
      },
});

const mapStateToProps = state => {
return {
        content: state.auth.content
    }
};

export default connect(mapStateToProps)(memo(HomePage));