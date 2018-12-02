import React from 'react';
import { StyleSheet, Alert,Text, View,TouchableOpacity,ActivityIndicator,Image,ScrollView, AsyncStorage,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { AddProductToAsync } from '../actions'
class Detail extends React.Component { 
  constructor(props){
    super(props)
  }
  rupiah(item){	
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  render() {
    const {navigation}=this.props;
    const idpro=navigation.getParam('iditem')
    const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
     return(
       <View style={styles.container}>
       <ScrollView style={styles.card}>
       <View style={{flexDirection:'row',margin:12,alignItems:'center',borderBottomColor:'gray'}}>
       <Text style={{flex:2,fontSize:18,fontWeight:'bold'}}>{idpro.nama}</Text>
       <TouchableOpacity onPress={()=>this.props.AddProductToAsync(idpro)} style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(85, 62, 214)',padding:8,borderRadius:5}}><Text style={{color:'white',fontSize:14}}>Buy </Text><Icon name="ios-basket" color="white" size={16}/></TouchableOpacity>
      </View>   
      { idpro.gambar>0?
        <Image source={{uri:idpro.gambar}} style={{width: imageWidth,height:335}}/>:
        <Image source={require('../assets/beos_package.png')} style={{width: imageWidth,height:335}}/>//275
      }
        <View style={{flexDirection:'row',alignItems:'center',padding:15}}>
       <Text style={{flex:2,fontSize:22,color:'green',fontWeight:'bold'}}>Rp{this.rupiah(idpro.harga)}</Text>
       <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderRadius:5,margin:5}} onPress={()=>console.log("Wishlist")}><View style={styles.ikon}><Icon name="ios-heart-outline" size={24}/></View></TouchableOpacity>
        </View>
         <View style={{flexDirection:'row',padding:15,borderBottomColor:'gray',borderBottomWidth:.3}}>            
       <Text style={{flex:1,fontSize:12}}>Stok</Text>    
       <Text style={{flex:2,fontSize:12}}>{this.rupiah(idpro.qty)} {idpro.satuan}</Text>
         </View>
         <View style={{flexDirection:'row',padding:15}}>            
       <Text style={{flex:1,fontSize:12}}>Deskripsi</Text>    
       <Text style={{flex:2,fontSize:12,textAlign:'justify'}}>{idpro.keterangan}</Text>
         </View>
       </ScrollView> 
     </View>

     );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    AddProductToAsync:(idpro)=>dispatch(AddProductToAsync(idpro))
  }
}
export default connect(null,mapDispatchToProps)(Detail)
const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      card:{
        flex:1,
        backgroundColor:'white',
        marginBottom:.4
      }
});
