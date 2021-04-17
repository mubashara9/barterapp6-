import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity , TextInput, KeyboardAvoidingView} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
//import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component{
constructor(){
    super();
    this.state={
        userId : firebase.auth().currentUser.email,
        name:'',
        description:'',
    }
}

addItem=(name, descr)=>{
var userId = this.state.userId;

db.collection('Items').add({
    'userId':userId,
    'item_name': name,
    'description':descr,
})

this.setState({
    name:'',
    description:'',
})
}

render(){
    return(
        <View>

            <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput style = {styles.formTextInput}
            placeholder={"Item Name"}
            onChangeText={(text)=>{
                this.setState({name:text})
            }}
            value={this.state.name}
            />

            <TextInput style = {styles.formTextInput}
            placeholder={"Item description"}
            multiline 
            numberOfLines={8}
            onChangeText={(text)=>{
                this.setState({description:text})
            }}
            value={this.state.description}
            />

            <TouchableOpacity style={styles.button}
            onPress={()=>{this.addItem(this.state.name, this.state.description)}}
            >
            <Text>Add Item</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

}

const styles = StyleSheet.create({
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
        keyBoardStyle : {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          },
})