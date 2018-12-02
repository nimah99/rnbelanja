import React , { Component }from 'react';
import { StyleSheet, Text, View, ActivityIndicator,Image,TouchableOpacity,ScrollView,Alert,FlatList } from 'react-native';
import { createMaterialTopTabNavigator  } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { requestFetchUser, delUserAction } from '../actions'
class UserList extends Component {
  constructor(props){
    super(props)
  }
componentDidMount(){
 this.props.requestFetchUser();
  }
  ListEmptyView = () => {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'gray',fontSize:14}}> No User Data Found</Text>
      </View>
 
    );
  }
  alertHapus(item){
    Alert.alert(
      'Penting',
      'Anda yakin ingin menghapus '+'"'+ item.username +'"'+' ?',
      [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this.props.delUserAction(item.email)},
      ],
      { cancelable: false }
      )
  }
render() {
  if (this.props.reducerpro.isLoading) {
    return (
      <View style={{flex: 1, justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="rgba(85, 62, 214, 0.842)"/>
      </View>
    );
  } 
 return(
   <View style={{flex:1}}>
   <FlatList data={this.props.reducerpro.userdata}
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
      <TouchableOpacity onPress={()=>this.alertHapus(item)}><Icon name="ios-trash" color="gray" size={24}/></TouchableOpacity>    
     </View>
    }
   extraData={this.props.reducerpro.data}
   ListEmptyComponent={this.ListEmptyView}
   />
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
    requestFetchUser: () => dispatch(requestFetchUser()),
    delUserAction:(Userid)=>dispatch(delUserAction(Userid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
const styles = StyleSheet.create({
    list:{ 
        alignSelf:'stretch',
        borderBottomColor:'rgb(207, 203, 203)',
        borderBottomWidth:.3,
        paddingLeft:5,
        paddingRight:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
      },
      descriptions:{
        flex:2
      },
      img:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:5,
        paddingRight:5,
        marginRight:5
      },
      description:{
        fontSize:18,
        marginRight:15
      },
      subdescription:{
        fontSize:12,
        color:'gray'
      }
});
