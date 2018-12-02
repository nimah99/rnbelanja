import React from 'react';
import { StyleSheet, Alert,Text,ImageBackground, TextInput,View,TouchableOpacity,ActivityIndicator, FlatList,RefreshControl,Platform, ScrollView, Image,SafeAreaView ,StatusBar,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { requestFetchAction,filterDataAction,refreshingList } from '../actions'

class Beranda extends React.Component {
  constructor(props){
    super(props)
  }
componentWillMount(){
  this.props.requestFetchAction();
  /* BackHandler.addEventListener('hardwareBackPress', function() {
    Alert.alert(
      'Penting',
      'Anda yakin ingin tutup Aplikasi?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   return true;
}) */
  }
  ListEmptyView = () => {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'gray',fontSize:18,fontWeight:'bold'}}>No Product Found</Text>
        <Text style={{color:'gray',fontSize:9,fontWeight:'bold'}}>Pull to Refresh</Text>
      </View>
 
    );
  }

  /* componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', function() {
      Alert.alert(
        'Thoát Khỏi Ứng Dụng',
        'Bạn có muốn thoát không?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
  })
  } */

  _Refresh(){
    this.props.refreshingList();
  }
  rupiah=(item)=>{	
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
componentDidMount(){
    this.startHeaderHeight=80
    if(Platform.OS=='android'){
        this.startHeaderHeight=80+StatusBar.currentHeight
    }
    this.statusHeight = (Platform.OS === 'android') ? 24 : 20;
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
   <SafeAreaView style={{flex:1}}>
    {/* <StatusBar backgroundColor='blue' barStyle="light-content"/> */}
   <View style={{flex:1,marginTop:StatusBar.currentHeight}}>
   <View style={{height:this.startHeaderHeight,backgroundColor:'rgba(85, 62, 214, 0.842)',borderBottomWidth:1,borderBottomColor:'#dddddd'}}>
   <ImageBackground source={require('../assets/purplecolor.png')} style={{width: '100%', height: '100%',alignItems:'center',justifyContent:'center'}}>
   <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#fff',marginHorizontal:20,shadowOffset:{width:0,height:0},shadowColor:'black',shadowOpacity:0.2,elevation:1}}>
   <Icon name='ios-search' size={20} style={{marginRight:10}}/>
   <TextInput onChangeText={(text)=> this.props.filterDataAction(text)} value={this.props.reducerpro.text} underlineColorAndroid="transparent" placeholder="Search here...." placeholderTextColor='gray' style={{flex:1,fontWeight:'700',backgroundColor:'#fff'}}></TextInput>
   </View>
  </ImageBackground>
   </View>
   
   <ScrollView 
   showsVerticalScrollIndicator={false}
   refreshControl= {
   <RefreshControl
   refreshing={this.props.reducerpro.refreshing}
   onRefresh={this._Refresh.bind(this)}
   colors={["red","green","blue"]}/> 
   }>
   <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,paddingTop:15,paddingBottom:15}}>
   <View style={{flexDirection:'row',paddingLeft:8,paddingRight:8,alignItems:'center'}}>
 </View>
     <FlatList data={this.props.reducerpro.data}
    style={{marginHorizontal:5}}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    columnWrapperStyle={{marginTop:5,marginLeft:3}}
    keyExtractor={ (item) =>item.id}
     renderItem={({ item, index })=>
     <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail',{iditem:item})} style={{padding:5,marginRight:6,alignItems:'center',height:239,width:169,borderRadius:5,backgroundColor:'#fff',borderColor:'rgb(85, 62, 214)',borderWidth:.3}}>
     <View>
     { item.gambar>0?
     <Image source={{uri:item.gambar}} style={{padding:5,width:159,height:159,borderRadius:5,justifyContent:'center'}} /> :
     <Image source={require('../assets/beos_package.png')} style={{padding:5,width:159,height:159,borderRadius:5,justifyContent:'center'}} />
     }
       <View style={{justifyContent:'center'}}>
     <Text  numberOfLines={1} style={{fontSize:16,fontWeight:'bold'}}>{item.nama}</Text>
     <Text style={styles.subdescription}>Rp{this.rupiah(item.harga)}</Text>
     </View>
     </View>
     </TouchableOpacity>
    }
    extraData={this.props.reducerpro.data}
   ListEmptyComponent={this.ListEmptyView}
   /> 
   </View> 
   </ScrollView>
   </View>
       </SafeAreaView>
 );
}
}

function mapStateToProps (state) {
  return {
    reducerpro:state.reducerpro,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    requestFetchAction: () => dispatch(requestFetchAction()),   
    filterDataAction:(text)=>dispatch(filterDataAction(text)),
    refreshingList: () => dispatch(refreshingList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda)
const styles = StyleSheet.create({
      containerlist: {
        flex: 1
      },
  list:{ 
    alignSelf:'stretch',
    borderBottomColor:'gray',
    borderBottomWidth:1,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5,
    flexDirection:'row'
  },
  descriptions:{
    flex:2
  },
  img:{
    alignItems:'center',
    justifyContent:'center',
    padding:5,
    marginRight:5
  },
  description:{
    fontSize:18,
    fontWeight:'bold'
  },
  subdescription:{
    fontSize:12,
    marginRight:5
  }
});
