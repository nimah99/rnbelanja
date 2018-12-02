import React , { Component }from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image,ScrollView,Picker,AsyncStorage,FlatList } from 'react-native';
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { requestProfile } from '../actions'
class Profile extends Component {
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
  componentWillMount(){
    this.props.requestProfile();
  }
  tutup=async()=>{
    try {
      await AsyncStorage.removeItem('email').then(()=>this.props.navigation.navigate('Login'))
    }
    catch(error) {
     console.log(error)
    }
  }
  render() { 
    let { image } = this.state;
    return (
      <View style={styles.container}>
       <FlatList data={this.props.reducerpro.profile}
   showsVerticalScrollIndicator={false}
   keyExtractor={ (item) =>item.email}
     renderItem={({ item, index })=>
     <View style={styles.list}>
     <View style={styles.img}>
     { item.foto>0?
     <Image source={{uri:item.foto}} style={{ width: 40, height: 40, borderRadius:25}} />:
     <Image source={require('../assets/default-avatar.png')} style={{ width: 40, height: 40, borderRadius:25}} />
     }
     </View>
       <View style={styles.descriptions}>
     <Text numberOfLines={1} style={styles.description}>{item.username}</Text>
     <View style={{flexDirection:'row'}}>
     <Text style={styles.subdescription}>Date Created : </Text>
     <Text style={styles.subdescription}>{item.created}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
     <Text style={styles.subdescription}>Email Address : </Text>
     <Text style={styles.subdescription}>{item.email}</Text>
    </View>
     </View>
      </View>
    }
   extraData={this.props.reducerpro.profile}
   ListEmptyComponent={this.ListEmptyView}
   />
      <TouchableOpacity style={styles.submit} onPress={this.tutup}><Text style={styles.submittext}>Sign Out <Icon name='ios-log-out' size={20} style={{color:'#fff',marginRight:10}}/></Text></TouchableOpacity>
   </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    reducerpro: state.reducerpro
  }
}
function mapDispatchToProps (dispatch) {
  return {
    requestProfile:()=>dispatch(requestProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
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
