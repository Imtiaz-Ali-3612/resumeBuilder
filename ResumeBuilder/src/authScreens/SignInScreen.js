import React,{Component} from 'react'

import {View,Text,StyleSheet, ActivityIndicator} from 'react-native'

import isValid from "../config/validation";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { TouchableOpacity } from 'react-native-gesture-handler';
import App from '../../App';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {  postLogin, setUserToken } from '../Redux/actions/actions';

class SignInScreen extends Component{
    state = {
        formDate: {
          email: {
            value: "",
            isValid: true
          },
          password: {
            value: "",
            isValid: true
          },
          valid: false
        },
        message: ""
      };
      onChangeText = (name, text) => {
        var formDate = this.state.formDate;
        formDate[name].value = text;
        var valid = isValid(name, text);
        formDate[name].isValid = valid;
        console.log(formDate.email.isValid && formDate.password.isValid)
        valid = formDate.email.isValid && formDate.password.isValid;
        this.setState({ formDate: formDate, valid: valid });
      };
      
      signIn = (data) => {
        console.log(data)
        this.props.postLogin(data);
        console.log('----signIn--')
        console.log(this.props.token)        
        if(!this.props.token.error){
          console.log("----------here -----")
         
        }else{
          this.setState({message:'Failed to login'})
        }
    };

      beforeSubmit=()=>{
          var form=this.state.formDate;
          return form.email.isValid && form.password.isValid;
            
      }
      submit = () => {
        var formDate = this.state.formDate;
        console.log(formDate)
        if (this.beforeSubmit()) {
          console.log(formDate);
          // this.storeData(true)
          var data={email:formDate.email.value,password:formDate.password.value}
          var response=this.signIn(data)

          // App();
          // this.props.navigation.navigate('home');
        }else{
          this.setState({message:'Please Enter Valid '})
        }
      };
      render() {
        if(this.props.token.loading){
          return(
          <ActivityIndicator></ActivityIndicator>
          )
        }else{

        return (
          <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.textInputView}>
                    <CustomTextInput
                      placeholder="Enter Email"
                      style={[styles.textInputStyle,this.state.formDate.email.isValid ? ({borderColor:'green'}):({borderColor:'red',borderRadius:40})]}
                      onChangeText={text => this.onChangeText("email", text)}
                    />
                    </View>
                    <View style={styles.textInputView}>
                    <CustomTextInput
                      placeholder="Enter password"
                      secureTextEntry={true}
                      style={[styles.textInputStyle,this.state.formDate.password.isValid ? ({borderColor:'green'}):({borderColor:'red',borderRadius:40})]}
                      onChangeText={text => this.onChangeText("password", text)}
                    />
                    </View>
                    <View style={styles.textInputView}>
                    <CustomButton
                      onClick={() => this.submit()}
                    //   disabled={!this.state.formDate.valid}
                      style={styles.buttonStyle}
                    >
                      <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:18}}>Login</Text>
                    </CustomButton>
                    </View>
                     <Text>{this.state.message}</Text>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                        onPress={()=>this.props.navigation.navigate('SignUp')}
                    >
                    <Text>   Make A New Account {">"} </Text>
                    </TouchableOpacity>
              </View>
          </View>
        );
        }

      }
}
const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        padding:20,
        // backgroundColor:'#69bdd2'
        backgroundColor:'#f7f3ff'
        // #eef5fd
    },
    box:{
      shadowOpacity:1000,
      width:'100%',
      padding:40,
      // borderRadius:60,
      // backgroundColor:'#69bdd2',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
          

    },
    textInputStyle:{
        textAlign:"center",
        fontSize:20,
        color:'black'
    },
    textInputView:{
        paddingBottom:30,
        alignSelf:"center",
        width:"90%"
    },
    buttonStyle:{
      padding:5,
      marginTop:10,
      elevation:10,
      backgroundColor:'#5DADE2'    
    }
})

const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  postLogin: (data) => dispatch(postLogin(data)),
  setUserToken:(token)=>dispatch(setUserToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);