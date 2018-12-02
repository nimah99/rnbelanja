import React , { Component }from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image,ScrollView,Picker,FlatList } from 'react-native';
import { createMaterialTopTabNavigator  } from 'react-navigation'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { requestUserAdd } from '../actions'
class UserInput extends Component {
  constructor(props){
    super(props) 
    this.state = {
        username:'',
        password:'',
        email:'',
        user_level:'',
        address:'',
        image:null,
        imagesupload: ''
    }
  }
  cancel=()=>{
    this.username.clear();
    this.password.clear();
    this.email.clear();
    this.address.clear();
    this.setState({user_level:'',image:null,imagesupload:''})
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, imagesupload:result.uri}); 
    }
  };
  upload =()=> {
    const uri=this.state.imagesupload;
    const uriParts=uri.split('/').pop();  
    const match= /\.(\w+)$/.exec(uriParts);
    const type=match ? `image/${match[1]}` : `image`; 
    const UserformData=new FormData();
    UserformData.append('file',{uri:this.state.imagesupload,name:uriParts,type}); //file diganti photo untuk php
    UserformData.append('username',this.state.username);
    UserformData.append('password',this.state.password);
    UserformData.append('email',this.state.email);
    UserformData.append('address',this.state.address);
    UserformData.append('user_level',this.state.user_level);
     this.props.requestUserAdd(UserformData);
  }
  render() { 
    let { image } = this.state;
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={{flex:1,paddingLeft:15,paddingRight:15,paddingBottom:15,paddingTop:25}}>
        <TextInput ref={input => { this.username = input }} onChangeText={(TextInputValue)=>this.setState({username:TextInputValue})} style={styles.textinput} returnKeyType="next" onSubmitEditing={() => this.password.focus()} placeholder="Full Name" underlineColorAndroid={'transparent'}/>
        <TextInput ref={input => { this.password = input }} onChangeText={(TextInputValue)=>this.setState({password:TextInputValue})} style={styles.textinput} secureTextEntry={true} returnKeyType="next" onSubmitEditing={() => this.email.focus()} placeholder="Password" underlineColorAndroid={'transparent'}/>
        <TextInput ref={input => { this.email = input }} onChangeText={(TextInputValue)=>this.setState({email:TextInputValue})} style={styles.textinput} returnKeyType="next" onSubmitEditing={() => this.address.focus()} placeholder="Email Address" underlineColorAndroid={'transparent'}/>
        <TextInput ref={input => { this.address = input }} onChangeText={(TextInputValue)=>this.setState({address:TextInputValue})} multiline={true}
    numberOfLines={4} style={styles.textinput} placeholder="Address" underlineColorAndroid={'transparent'}/>
       <Picker
  selectedValue={this.state.user_level}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue, itemIndex) => this.setState({user_level: itemValue})}>
  <Picker.Item label="--- Level ---" value="" />
  <Picker.Item label="Administrator" value="Administrator" />
  <Picker.Item label="User" value="User" />
</Picker>
      
       <TouchableOpacity style={styles.pilihimage} onPress={this._pickImage}><Text style={styles.textpilihimage}>Choose Image</Text></TouchableOpacity> 
       {image &&
        <Image source={{ uri: image }} style={{ width: 135, height: 135, marginBottom:15}} />}
        
        <TouchableOpacity style={styles.submit} onPress={this.upload}><Text style={styles.submittext}>Submit</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={this.cancel}><Text style={styles.submittext}>Cancel</Text></TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    requestUserAdd:(UserformData)=>dispatch(requestUserAdd(UserformData))
  }
}

export default connect(null, mapDispatchToProps)(UserInput)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  textinput:{
    alignSelf:'stretch',
    height:25,
    paddingBottom:3,
    marginBottom:15,
    color:'rgb(85, 62, 214)',
    borderBottomColor:'rgba(85, 62, 214, 0.842)',
    borderBottomWidth:1,
    fontSize:16,
    padding:1 
  },combobox:{
    alignSelf:'stretch',
    height:25,
    paddingBottom:3,
    marginBottom:15,
    color:'rgb(85, 62, 214)',
    borderBottomColor:'rgba(85, 62, 214, 0.842)',
    borderBottomWidth:1,
    padding:1
  },
  submit:{
    backgroundColor:"rgba(85, 62, 214, 0.842)",
    padding:15,
    alignSelf:"stretch",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15,
    borderRadius:5
  },cancel:{
    backgroundColor:"rgba(212, 19, 19, 0.842)",
    padding:15,
    alignSelf:"stretch",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
  },
  submittext:{
    color:"#fff",
    fontSize:18
  },
  textpilihimage:{
    color:'rgb(85, 62, 214)',
    fontSize:16
  },
  pilihimage:{
    margin:15
  }
});
