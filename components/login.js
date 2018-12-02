import React from 'react';
import { StyleSheet, Alert,Text, TextInput,View,TouchableOpacity,ActivityIndicator,Platform, Image,SafeAreaView,AsyncStorage ,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo';
import { connect } from 'react-redux'
import { LoginFetchAction } from '../actions'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        email:'',
        sandi:''
    }
  }
  tutup=()=>{
   this.email.clear();
   this.sandi.clear();
  }
  login=async()=>{
    if(this.state.email !== null || this.state.sandi!==null){
    await fetch('http://192.168:4000/user_login',{
      method:'post', 
      headers:{           
    'Accept':'application/json',
    'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.sandi
      })
    })
    .then(response=>response.json())
    .then(res=>{
      if(res.success===true){
          try{
            for(i=0;i<res.hasil.length;i++){
              let userprofile=res.hasil[i];
              this.props.LoginFetchAction(userprofile);
            }
             this.tutup();
             this.props.navigation.navigate('Home');
          }catch (error){
         console.log(error); 
         }
      }else{
        Alert.alert(
          'Penting',
          res.message,
          [
          {text: 'Tutup', onPress: () => this.tutup()}
          ],
          { cancelable: false }
          )
      }
    })
    .catch(err=>console.error(err))
  }else{
    console.log("Username & Password harus diisi!!!!!");
  }
  }
render() {
 return(
   <SafeAreaView style={{flex:1}}> 
   <View style={{flex:1,marginTop:StatusBar.currentHeight,marginBottom:0}}>
   <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center'}}
   colors={['rgba(85, 62, 214, 0.842)', 'rgb(42, 3, 68)', 'rgb(42, 3, 68)']}>
   <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#fff',marginVertical:10,marginHorizontal:20,shadowOffset:{width:0,height:0},shadowColor:'black',shadowOpacity:0.2,elevation:1}}>
   <Icon name='ios-mail' size={20} style={{marginRight:10}}/>
   <TextInput ref={input => { this.email = input }} onChangeText={(TextInputValue)=>this.setState({email:TextInputValue})} returnKeyType="next" onSubmitEditing={() => this.sandi.focus()} underlineColorAndroid="transparent" placeholder="Email Address" placeholderTextColor='gray' style={{flex:1,fontWeight:'700',backgroundColor:'#fff'}}></TextInput>
   </View>
   <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#fff',marginVertical:10,marginHorizontal:20,shadowOffset:{width:0,height:0},shadowColor:'black',shadowOpacity:0.2,elevation:1}}>
   <Icon name='ios-lock' size={20} style={{marginRight:10}}/>
   <TextInput ref={input => { this.sandi = input }} onChangeText={(TextInputValue)=>this.setState({sandi:TextInputValue})} secureTextEntry={true} underlineColorAndroid="transparent" placeholder="Password" placeholderTextColor='gray' style={{flex:1,fontWeight:'700',backgroundColor:'#fff'}}></TextInput>
   </View>
   <TouchableOpacity style={styles.submit} onPress={this.login}><Text style={styles.submittext}>Sign in <Icon name='ios-log-in' size={20} style={{color:'#fff',marginRight:10}}/></Text></TouchableOpacity>
   <View style={{alignItems:'center',padding:10,marginHorizontal:20,marginVertical:35,borderWidth:1,borderColor:'#fff'}}>
       <Text style={{color:'#fff',fontSize:10,alignItems:'center',justifyContent:'center'}}>Ini merupakan Aplikasi Online Shop sederhana untuk dijadikan Portfolio guna melamar pekerjaan sebagai Mobile Developer</Text>
  </View>
  <View style={{alignItems:'center',padding:10,marginHorizontal:20,marginVertical:15}}>
   <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}><Text style={{color:'#fff', fontWeight:'bold',fontSize:12}}>Sign Up for Free !</Text></TouchableOpacity>
  </View>
   </LinearGradient>
   </View>
       </SafeAreaView>
 );
}
}
function mapDispatchToProps (dispatch) {
  return {
    LoginFetchAction:(userprofile)=>dispatch(LoginFetchAction(userprofile))
  }
}

export default connect(null, mapDispatchToProps)(Login)
const styles = StyleSheet.create({
      containerlist: {
        flex: 1
      },
      submit:{
        backgroundColor:"rgba(85, 62, 214, 0.842)",
        padding:15,
        alignSelf:"stretch",
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:15,
        borderRadius:5
      },
      submittext:{
        color:"#fff",
        fontSize:18
      },
});
