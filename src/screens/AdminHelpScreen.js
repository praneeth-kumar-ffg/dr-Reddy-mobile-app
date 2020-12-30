import React, { useState, useEffect, useCallback } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Button } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { theme } from '../core/theme';
import { connect } from 'react-redux';
import { adminHelpRequest } from '../actions/index'
import axios from "axios";
import config from '../config/index.js';


const Showdata = ({ si, dt, sdt, inp, inpdt }) => {


  if (si === 0) {
    return (
      <ScrollView>
        <TouchableOpacity>
          {dt.map(j => (
            <Card key={j.Student_Id}>
              <CardTitle

                color={theme.colors.primary}
              />
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Student Id: {j.Student_Id}</Text></CardContent>
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Name: {j.Name}</Text></CardContent>
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Problem Type: {j.Problem_Type}</Text></CardContent>
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Problem Description: {j.Problem_description}</Text></CardContent>
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Other Details: {j.Other_Details}</Text></CardContent>
              <CardContent ><Text style={{ fontWeight: 'bold' }}>Phone No: {j.Phone_No}</Text></CardContent>
              <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                  onPress={() => {
                    inpdt([...inp, j])
                    axios.put(config.baseurl + `/api/v1/update/${j.Student_Id}/${j.Request_Status}`)
                      .then(response => console.log(response))
                      .catch(err => { setiserror(true), console.log(err) })

                    sdt(dt.filter(obj => j.Student_Id !== obj.Student_Id))

                  }}
                  alignItems='center'
                  title="Mark As In-progress"
                  color={theme.colors.primary}

                />
                {/* <CardButton
                                    onPress={() => { }}
                                    title="Attended"
                                    color={theme.colors.primary}
                                /> */}
              </CardAction>
            </Card>
          )
          )
          }
        </TouchableOpacity>
      </ScrollView>
    )
  }
  else {
    if (inp.length < 1) {
      return (
        <ScrollView>
          <Text>NO-DATA</Text>
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView>
          <TouchableOpacity>
            {inp.map(j => (
              <Card key={j.Student_Id}>
                <CardTitle
                />
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Student Id: {j.Student_Id}</Text></CardContent>
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Name: {j.Name}</Text></CardContent>
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Problem Type: {j.Problem_Type}</Text></CardContent>
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Problem Description: {j.Problem_description}</Text></CardContent>
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Other Details: {j.Other_Details}</Text></CardContent>
                <CardContent ><Text style={{ fontWeight: 'bold' }}>Phone No: {j.Phone_No}</Text></CardContent>
                <CardAction
                  separator={true}
                  inColumn={false}>

                  <CardButton
                    onPress={() => {

                      axios.put(config.baseurl + `/api/v1/update/${j.Student_Id}/${j.Request_Status}`)
                        .catch(err => { setiserror(true) })
                      inpdt(inp.filter(obj => j.Student_Id !== obj.Student_Id))
                    }}
                    title="Mark As Attended"
                    color={theme.colors.primary}
                  />
                </CardAction>
              </Card>
            )
            )
            }
          </TouchableOpacity>
        </ScrollView>
      )
    }

  }
}

const AdminHelpScreen = ({ navigation, adhreq }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([]);
  const [inprogressdata, setinprogressdata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [iserror, setiserror] = useState(false);

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index)
  }

  const FilterData = (res) => {
    var da_ta = res.data.filter(i => (i.Request_Status === "New"))
    setData(da_ta)
  }
  const FilterInprogressData = (res) => {
    var inprogress_data = res.data.filter(j => (j.Request_Status === "InProgress"))
    setinprogressdata(inprogress_data)
  }

  useEffect(() => {
    setisloading(true);
    getAllAdminHelpRequests();
  }, [])

  const getAllAdminHelpRequests = async () => {
    try {

      const response = await axios.get(config.baseurl + "/api/v1/adminhelp/")
      // setData(response.data)
      FilterData(response);
      FilterInprogressData(response);
      setisloading(false);
      adminHelpRequest(response.data)
      console.log(adhreq)
    }
    catch (err) {
      setiserror(true);
      adminHelpRequest('')
    }
  }


  if (!isloading && !iserror) {
    return (
      <Background>
        <BackButton goBack={() => navigation.navigate('AdminHomeScreen')} />
        <ScrollView style={{ width: '80%' }}>
          <Logo />
          <TouchableOpacity>
            <View>
              <SegmentedControlTab
                values={['New Requests', 'In Progress']}
                selectedIndex={selectedIndex}
                badges={[data.length, inprogressdata.length]}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                onTabPress={handleSingleIndexSelect}
              />
            </View>
            <Text>
              DRF-Admin Help Page
                    </Text>
            <Showdata si={selectedIndex} dt={data} sdt={setData} inp={inprogressdata} inpdt={setinprogressdata} />
          </TouchableOpacity>
        </ScrollView>
      </Background>
    )
  }

  if (isloading) {
    return (<View style={[styles.container, styles.container]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>)
  }
  if (iserror) {
    return (<View style={[styles.container]}>
      <Icon name="thumbs-down" size={50} color={theme.colors.secondary} />
      <Text>"ERROR GETTING DATA"</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  tabStyle: {
    flex: 1,
    borderColor: theme.colors.primary,
    borderRadius: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  activeTabStyle: {
    backgroundColor: theme.colors.primary
  },
});

const mapStateToProps = state => {
  return {
    adhreq: state.helpRequestAdmin.adminHelp,
  };
};

export default connect(mapStateToProps, { adminHelpRequest })(AdminHelpScreen);