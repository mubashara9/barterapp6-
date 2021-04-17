import * as React from 'react';
import {View,Text, TouchableOpacity, FlatList,StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem } from 'react-native-elements'

export default class MyBarters extends React.Component{
    static navigationOptions={header:null};

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allExchange:[]
        }
        this.requestref=null;
    }

    getAllExchange=()=>{
        this.requestref = db.collection('MyBarters').where('userId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allExchange = snapshot.docs.map(document=>document.data());
            this.setState({
                allExchange:allExchange
            })
        })
    }

    keyExtractor=(item,index)=>index.toString();

    renderItem =({item,i})=>{
        console.log(item.item_name)
        return(
            
            <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            titleStyle={{color:'black', fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.props.navigation.navigate('UserDetailScreen',{"details":item})
                }}
                ><Text styles={{color:'black'}}>Exchange</Text></TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
render(){
    return(
        <View style={{flex:1}}>
            {
                this.state.allExchange.length===0
                ?(
                    <View style={styles.subtitle}>
                        <Text style={{fontSize:20}}>List of all Barters</Text>
                    </View>
                ):
                (
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allExchange}
                    renderItem={this.renderItem}
                    />
                )
            }
        </View>
    )
}
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })