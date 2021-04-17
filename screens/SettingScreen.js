import firebase from 'firebase';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import db from '../config';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      firstname:'',
      lastname:'',
      address:'',
      contact:'',
      docId:''
    }
  }

  getDetails(){
    var user = firebase.auth().currentUser;
    var email = user.email

    db.collection('User').where('user_name','==',email).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        var data = doc.data()
        this.setState({
          firstname:data.first_name,
          lastname:data.last_name,
          address:data.Address,
          contact:data.mobile_number,
          docId:doc.id
        })
      })
    })
  }

  componentDidMount(){
    this.getDetails();
  }

  updateData=()=>{
    db.collection('User').doc(this.state.docId)
    .update({
      'first_name':this.state.firstname,
      'last_name':this.state.lastname,
      'Address':this.state.address,
      'mobile_number':this.state.contact
    })
    alert("Update successful")
  }

    render(){
      return(
        <View style={styles.container}>
          <View style={styles.container}>
            <TextInput style = {styles.formTextInput}
            placeholder={"first name"}
            maxLength={10}
            onChangeText={(text)=>{
              this.setState({
                firstname:text
              })
            }}
            value={this.state.firstname}/>

            <TextInput style = {styles.formTextInput}
            placeholder={"last name"}
            maxLength={10}
            onChangeText={(text)=>{
              this.setState({
                lastname:text
              })
            }}
            value={this.state.lastname}/>

            <TextInput style = {styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text)=>{
              this.setState({
                address:text
              })
            }}
            value={this.state.address}/>

            <TextInput style = {styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                contact:text
              })
            }}
            value={this.state.contact}/>
          </View>
          <TouchableOpacity style={styles.button}
          onPress={()=>{this.updateData()}}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },
})