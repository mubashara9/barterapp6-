import * as React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'

export default class UserDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            userName  :'',
            recieverId:this.props.navigation.getParam('details')["userId"],
            exchangeId:this.props.navigation.getParam('details')["exchangeId"],
            itemname:this.props.navigation.getParam('details')["item_name"],
            description:this.props.navigation.getParam('details')["description"],
            exchangername:'',
            exchangercontact:'',
            exchangeraddress:'',
            exchangerId:'',
            
        }
    }

    getUserDetails=(userId)=>{
      db.collection("User").where('user_name','==', userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            userName  :doc.data().first_name + " " + doc.data().last_name
          })
        })
      })
    }


getreceiverDetails(){
  console.log("receiver ",this.state.recieverId);
  db.collection('User').where('user_name','==',this.state.recieverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        exchangername    : doc.data().first_name,
        exchangercontact : doc.data().mobile_number,
        exchangeraddress : doc.data().address,
      })
    })
  });

  db.collection('Items').where('userId','==',this.state.exchangeId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({exchangerId:doc.id})
   })
})}

componentDidMount(){
    this.getUserDetails(this.state.userId);
    this.getreceiverDetails();
}

addBarters=()=>{
    db.collection('MyBarters').add({
        item_name:this.state.itemname,
        exchanger_name:this.state.exchangername,
        exchanger_contact:this.state.exchangercontact,
        exchanger_address:this.state.exchangeraddress,
        exchangerId:this.state.exchangerId,
        status:"exchanged"
    })
}
addNotification=()=>{
  console.log("in the function ",this.state.rec)
  var message = this.state.userName + " has shown interest in exchanging the item"
  db.collection("all_notifications").add({
    "targeted_user_id"    : this.state.recieverId,
    "donor_id"            : this.state.userId,
    "exchangeId"          : this.state.exchangeId,
    "item_name"           : this.state.itemName,
    "date"                : firebase.firestore.FieldValue.serverTimestamp(),
    "notification_status" : "unread",
    "message"             : message
  })
}

render(){
    return(
        <View style ={styles.container}>
            <View style={{flex:0.5}}>
            <Card
              title={"Item Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.itemname}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.description}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Exchanger Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.exchangername}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.exchangercontact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.exchangeraddress}</Text>
            </Card>
          </Card>
          <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.addBarters();
                    this.addNotification()
                    this.props.navigation.navigate('MyBarters')
                  }}>
                <Text>I want to Exchange</Text>
              </TouchableOpacity>
            )
            : (
              <View><Text>something wrong</Text>
                </View>
            )
          }
        </View>
            </View>
            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })