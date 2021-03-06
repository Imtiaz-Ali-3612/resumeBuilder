import React,{Component} from 'react'

import { TextInput,Modal,TouchableOpacity,ActivityIndicator,Image,View,Text,StyleSheet,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


const ExperianceSection=(props)=>{
    console.log(props)
    return(
        <View style={styles.box}>
            <View style={{paddingLeft:20}}>
                <Text style={{fontSize:40,fontWeight:'bold'}}> {props.experiance.job_title} </Text>
                <View style={{paddingLeft:10}}>
                    <Text style={{fontSize:20,fontStyle:'italic'}}>{props.experiance.from} - {props.experiance.to}</Text>
                    <Text style={{fontSize:20,fontStyle:'italic'}}>{props.experiance.details}</Text>
                </View>
            </View>
        <View style={{flexDirection:'row-reverse',padding:10}}>
            <TouchableOpacity 
            
                onPress={()=>{
                    props.deleteExperiance({id:props.experiance.experiance_id})  
                }}
            >
                <Icon name="trash-alt" size={30} color="red"></Icon>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default ExperianceSection;
const styles=StyleSheet.create({
    box:{
        // borderWidth:2,
        marginTop:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5
        ,flex:1,backgroundColor:'#5DADE2',padding:5,paddingTop:20,flexDirection:'column'
      }
    
})