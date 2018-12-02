import React from 'react';
import { StyleSheet, Alert,Text, View,TextInput,Button,TouchableWithoutFeedback ,TouchableOpacity,ActivityIndicator, FlatList,KeyboardAvoidingView,RefreshControl, ScrollView, Image,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect} from 'react-redux';
import { requestFetchAsync, delcartby,upQtyAction,downQtyAction,requestAddCart } from '../actions';

 class Cart extends React.Component {
  constructor(props){
    super(props)
  }
 componentDidMount(){
   this.props.requestFetchAsync();
  }
  hapusalert=(item)=>{
    Alert.alert(
      'Peringatan',
      'Hapus '+'"'+ item.nama +'"'+' dari keranjang belanja Anda?',
      [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this.props.delcartby(item.id)},
      ],
      { cancelable: false }
      )
  }
  rupiah=(item)=>{	
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  _Refresh(){
    this.props.requestFetchAsync();
  }
  lihatcart=()=>{
    let cart=this.props.reducerpro.dtapro;
    this.props.requestAddCart(cart);
  }
  ListEmptyView = () => {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center', paddingTop:25,marginBottom:5,paddingBottom:15}}>
        <Text style={{color:'gray',fontSize:14}}>Please add some Product to Cart.....</Text>
     </View>
    );
  }

render() {
  /* if (this.props.reducerpro.isLoading) {
    return (
      <View style={{flex: 1, justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="rgb(85, 62, 214)"/>
      </View>
    );
  } */
  let { dtapro } = this.props.reducerpro;
    let totalQuantity = 0;
    let totalPrice = 0;
    let dpp=0;
    let ppn=0;
    let total=0;
    dtapro.forEach((item) => {
      totalQuantity += item.qty;
      totalPrice += item.qty * item.harga;
    })
     dpp=totalPrice*(100/110);
     ppn=dpp*(10/100);
     total=totalPrice+ppn;
 return(
  <View style={{flex:1,backgroundColor:'#fff'}}>
     <View style={{backgroundColor:'rgba(85, 62, 214,0.8)',padding:9,flexDirection:'row'}}>
     <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
     <Text style={{color:'#fff',fontSize:12}}>SubTotal : </Text>
     <Text style={{color:'#fff',fontSize:12,fontWeight:'bold'}}>Rp{this.rupiah(totalPrice)} </Text>
     </View>
     <View style={{flex:1,flexDirection:'row'}}>
     <View>
     <Text style={{color:'#fff',fontSize:12}}>PPn</Text>
     <Text style={{color:'#fff',fontSize:12}}>Qty</Text>
     </View>
     <View>
     <Text style={{color:'#fff',fontSize:12,fontWeight:'bold'}}> : Rp{this.rupiah(ppn.toFixed())}</Text>
     <Text style={{color:'#fff',fontSize:12,fontWeight:'bold'}}> : {totalQuantity}</Text>
     </View>
     </View> 
     </View> 
     <View style={{flex:1}}>
     <ScrollView showsVerticalScrollIndicator={false}>
     <FlatList data={this.props.reducerpro.dtapro}
     keyExtractor={(item)=>item.id.toString()}
     renderItem={({item,index})=>
     <View style={styles.list}>
     <View style={styles.img}>
     { item.gambar>0?
     <Image source={{uri:item.gambar}} style={{ width: 40, height: 40}} />:
     <Image source={require('../assets/beos_package.png')} style={{ width: 40, height: 40}} />
     }
     </View>
       <View style={styles.descriptions}>
     <Text numberOfLines={2} style={styles.description}>{item.nama}</Text>
     <View style={{flexDirection:'row'}}>
     <Text style={{flex:3,fontSize:12}}>Rp{this.rupiah(item.harga)}</Text>
     <Text style={{flex:1,fontSize:12}}>X</Text>
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontSize:12}}>= </Text>
     <Text style={{fontSize:12,color:'red'}}>Rp{this.rupiah(item.jumlah)}</Text>
     </View>
     </View>
     <View></View>
     <View style={{flexDirection:'row',marginRight:25}}>
     <TouchableOpacity  onPress={()=>this.props.upQtyAction(index)} style={{borderWidth:1, borderColor:'rgb(85, 62, 214)',width:20,alignItems:'center',justifyContent:'center',borderTopLeftRadius:5,borderBottomLeftRadius:5}}><Text style={{color:'rgb(85, 62, 214)',fontSize:16}}>+</Text></TouchableOpacity >
       <Text style={{fontSize:14,paddingLeft:9,paddingRight:9}}>{item.qty}</Text>
      <TouchableOpacity  onPress={()=>this.props.downQtyAction(index)} style={{borderWidth:1,borderColor:'rgb(85, 62, 214)',width:20,alignItems:'center',justifyContent:'center',borderBottomRightRadius:5,borderTopRightRadius:5}}><Text style={{color:'rgb(85, 62, 214)',fontSize:16}}>-</Text></TouchableOpacity >
       </View>
     <TouchableWithoutFeedback  onPress={()=>this.hapusalert(item)}><Icon name="ios-trash" color="gray" size={24}/></TouchableWithoutFeedback >
     </View>
    }
    extraData={this.props.reducerpro.dtapro}
    showsVerticalScrollIndicator={false}
   ListEmptyComponent={this.ListEmptyView}
   />
   </ScrollView>
     </View> 
      <View style={{backgroundColor:'rgba(85, 62, 214,0.8)',padding:9,flexDirection:'row'}}>
     <View style={{flex:2,flexDirection:'row', alignItems:'center'}}>
     <Text style={{color:'#fff',fontSize:14}}>Total : </Text>
     <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Rp{this.rupiah(total.toFixed())} </Text>
     </View>
     {this.props.reducerpro.dtapro.length>0?
     <View style={{flex:1, flexDirection:'row',alignItems:'center'}}> 
     <TouchableOpacity  style={{flex:1,backgroundColor:'#fff',padding:5,borderRadius:5,alignItems:'center'}} onPress={this.lihatcart}><Text style={{color:'rgba(85, 62, 214,0.8)',fontSize:14,fontWeight:'bold'}}>Checkout</Text></TouchableOpacity>  
     </View>:  <View style={{flex:1, flexDirection:'row',alignItems:'center'}}><Text style={{color:'rgba(85, 62, 214,0.8)',fontSize:14,fontWeight:'bold'}}>Checkout</Text></View>}
    
     </View> 
     </View>
 );
}
}
function mapStateToProps (state) {
  return {
    reducerpro:state.reducerpro
  }
}
function mapDispatchToProps (dispatch) {
  return {
    requestFetchAsync: () => dispatch(requestFetchAsync()),
    delcartby:(produkid)=> dispatch(delcartby(produkid)),
    upQtyAction:(idx)=> dispatch(upQtyAction(idx)),
    downQtyAction:(idx)=> dispatch(downQtyAction(idx)),
    requestAddCart:(cart)=>dispatch(requestAddCart(cart))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
const styles = StyleSheet.create({
      containerlist: {
        flex: 1
      },
  list:{ 
    alignSelf:'stretch',
    padding:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  img:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:5
  },
  descriptions:{
    flex:2,
    paddingRight:5
  },
  description:{
    fontSize:16,
    fontWeight:'bold'
  }
});