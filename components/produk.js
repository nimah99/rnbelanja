import React from 'react';
import { StyleSheet, Alert,Text,TextInput, View,TouchableOpacity,ActivityIndicator, FlatList,KeyboardAvoidingView, Modal, RefreshControl, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { requestFetchAction, delDataAction } from '../actions'

class Produk extends React.Component {
  constructor(props){
    super(props)
  }
componentDidMount(){
  this.props.requestFetchAction();
  }
  ListEmptyView = () => {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'gray',fontSize:14}}>No Product Found...</Text>
      </View>
 
    );
  } 
  rupiah=(item)=>{
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  alertHapus(item){
    Alert.alert(
      'Penting',
      'Anda yakin ingin menghapus '+'"'+ item.nama +'"'+' ?',
      [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this.props.delDataAction(item.id)},
      ],
      { cancelable: false }
      )
  }
render() {
   if (this.props.reducerpro.isLoading) {
    return (
      <View style={{flex: 1, justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="rgb(85, 62, 214)"/>
      </View>
    );
  } 
  
 return(
   <View style={styles.containerlist}>
<FlatList data={this.props.reducerpro.data}
   keyExtractor={ (item) =>item.id.toString()}
     renderItem={({ item, index })=>
     <View style={styles.list}>
     <View style={styles.img}>
     { item.gambar>0?
     <Image source={{uri:item.gambar}} style={{ width: 40, height: 40, borderRadius:25}} />:
     <Image source={require('../assets/beos_package.png')} style={{ width: 40, height: 40, borderRadius:25}} />
     }
     </View>
       <View style={styles.descriptions}>
       <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailProduk',{iditem:item})}>
     <Text numberOfLines={1} style={styles.description}>{item.nama}</Text>
     <View style={{flexDirection:'row'}}>
     <Text style={styles.subdescription}>Rp{this.rupiah(item.harga)}</Text>
    </View>
    </TouchableOpacity>
     </View>
      <TouchableOpacity onPress={()=>this.alertHapus(item)}><Icon name="ios-trash" color="gray" size={24}/></TouchableOpacity>    
     </View>
    }
   extraData={this.props.reducerpro.data}
   showsVerticalScrollIndicator={false}
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
    requestFetchAction: () => dispatch(requestFetchAction()),
     delDataAction:(proid)=>dispatch(delDataAction(proid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Produk)
const styles = StyleSheet.create({
      containerlist: {
        flex: 1
      },
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
  },
  fadebtn:{
    width:66,
    height:66,
    borderRadius:50,
    backgroundColor:'rgba(85, 62, 214,0.8)',
    position:'absolute',
    bottom:15,
    right:15,
    alignItems:'center',
    justifyContent:'center',
    shadowOpacity:0.75,
    shadowRadius:5,
    shadowColor:'black'
   },
   textinput:{
    alignSelf:'stretch',
    height:33,
    paddingBottom:3,
    marginBottom:15,
    borderBottomColor:'rgb(85, 62, 214)',
    borderBottomWidth:1
  },
});
