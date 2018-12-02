import React from 'react';
import { StyleSheet, Alert,Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity, Picker, Image,ScrollView, AsyncStorage,ActivityIndicator,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
class More extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.forminput}><View style={{flex:1,backgroundColor:"white"}}>
      <TouchableOpacity style={styles.list} onPress={()=>this.props.navigation.navigate('Foto')}><View style={styles.ikon}><Icon name="ios-heart" color="gray" size={24}/></View><Text style={styles.text}>Wishlist</Text></TouchableOpacity>
      <TouchableOpacity style={styles.list} onPress={()=>this.props.navigation.navigate('Cart')}><View style={styles.ikon}><Icon name="ios-cart" color="gray" size={24}/></View><Text style={styles.text}>Cart</Text><Text style={{fontWeight:'bold',fontSize:12,backgroundColor:'rgb(85, 62, 214)',color:'#fff',padding:5,alignItems:'center',borderRadius:5}}>
      </Text></TouchableOpacity>
      <TouchableOpacity style={styles.list}><View style={styles.ikon}><Icon name="ios-log-out" color="gray" size={24}/></View><Text style={styles.text}>Logout</Text></TouchableOpacity></View>
      </ScrollView>
    );
  }
}

export default More;
const styles = StyleSheet.create({
      forminput:{
        flex:1
      },
  header:{
    marginTop:15,
    fontSize:22,
    fontWeight:'bold',
    color:'green',
    marginBottom:25,
  },
  list:{
    flexDirection:'row',
    padding:15,
    alignItems:"center",
    borderBottomColor:"rgb(207, 203, 203)",
    borderBottomWidth:0.3
  },
  ikon:{
    marginRight:5
  },
  text:{
    flex:2
  }
});