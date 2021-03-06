import React,{Component} from 'react'

import { TextInput,Modal,TouchableOpacity,ActivityIndicator,Image,View,Text,StyleSheet,ScrollView} from 'react-native'
import { connect } from 'react-redux';
// import {  getResumeHeading, postHeading } from '../Redux/actions/resumeActions';
import {getResumeEducation,postEducation,deleteEducationInfo} from '../Redux/actions/educationActions';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AddEducation from './components/addEducation';
import EducationSection from './components/EducationSection';



class Education extends Component{
    state = {
        addModal:false,
        education:[],
        formDate: {
          name:"",
          mobile: "",
          linkedIn: "",
          introduction:""
        },
        message: ""
      };
      onChangeText = (name, text) => {
        var formDate = this.state.formDate;
        formDate[name] = text;
        this.setState({ formDate: formDate});
      };
      
    deleteEducation=(data)=>{
      this.props.deleteEducationInfo({token:this.props.token.token,id:data.id})
      this.props.navigation.navigate('Home')
                    
    }
    closeModal=()=>{
        this.setState({addModal:false})
        this.props.navigation.navigate('Home')

    }
      render() {

          console.log('-----render education---')
          console.log(this.props)
          if(this.props.education.loading){
              this.props.getResumeEducation(this.props.token.token);
              return(
                <View>
                    <ActivityIndicator></ActivityIndicator>
                </View>
              )
          }else{
        return (
          this.props.education.loading  ? (
           
            <View>
              
              {console.log('-------------here in loaading-----------')}
              <ActivityIndicator size="large"></ActivityIndicator>
            </View>
      
           ):(
            
  
            <View style={{flex:1,padding:10,backgroundColor:"#f7f3ff"}}>
                <View style={{flex:1,alignItems:'center'}}>
                    <Icon name="book-open" size={40} color="#5DADE2"></Icon>
                    <Text style={{textAlign:'center',fontSize:30,color:'#5DADE2'}}> Education Info</Text>
                </View>
                <View style={{flex:4}}>
                {/* {this.state.education.length==0  ? (<Text>You have not added any Education detail yet</Text>) :( */}
                    <ScrollView style={{ flex: 1, padding: 2 }}> 
                        {
                            this.props.education.education.map((education)=>{
                                return (
                                    <EducationSection
                                      key={education.education_id}
                                      education={education} 
                                                      deleteEducation={(data)=>this.deleteEducation(data)}
                                    ></EducationSection> 
                                 )
                            })
                        }
           
                    </ScrollView>

                 {/* )} */}
                 </View>
                 <View style={{alignItems:'center',paddingTop:20}}>
                        <TouchableOpacity
                            onPress={()=>this.setState({addModal:true})}
                            style={{borderColor:'blue'}}
                        >
                            <Icon name="plus" size={60} color="#5DADE2" ></Icon>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.addModal}
                            
                            >
                                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                <AddEducation closeModal={()=>this.closeModal()}></AddEducation>
                             
                                </View>
                                </View>
                            </Modal>

                    </View>
            </View>
             ));

            }
      }
}
const styles=StyleSheet.create({
  tinyLogo: { width: 50, height: 50 }, 
  updateButton:{
    borderBottomLeftRadius:20,
    backgroundColor:'#ff4242',
    borderTopRightRadius:20,
    borderWidth:1,
    width:'60%'

  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})

const mapStateToProps = state => ({
  token: state.token,
  heading:state.resume,
  education:state.education
});


const mapDispatchToProps = dispatch => ({
  postEducation: (data) => dispatch(postEducation(data)),
  getResumeEducation:(data)=>dispatch(getResumeEducation(data)),
  deleteEducationInfo:(data)=>dispatch(deleteEducationInfo(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Education);