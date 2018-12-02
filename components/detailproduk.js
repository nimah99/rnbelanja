import React from 'react';
import { StyleSheet, Alert,Text, TextInput,View,TouchableOpacity,Picker,ActivityIndicator,Image,ScrollView,KeyboardAvoidingView, Modal, Dimensions,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { updateDataAction } from '../actions'
class DetailProduk extends React.Component {  
  constructor(props){
    super(props)
    this.state={
      rupiah:'',
      eid:'',
      eproduk:'',
      eharga:'',
      eqty:'',
      esatuan:'',
      edescription:'',
      modalVisible: false
    }
  }
  fEdit=(item)=>{
    this.state.eid=item.id;
    this.state.eproduk=item.nama;
    this.state.eharga=item.harga;
    this.state.eqty=item.qty;
    this.state.esatuan=item.satuan;
    this.state.edescription=item.keterangan;
  } 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  updatepress(){
    const dataprop={
      id:this.state.eid,
      nama:this.state.eproduk,
      harga:this.state.eharga,
      qty:this.state.eqty,
      satuan:this.state.esatuan,
      keterangan:this.state.edescription
    }
    this.props.updateDataAction(dataprop)
    this.setModalVisible(!this.state.modalVisible)
  }
  rupiah(item){	
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  render() {
    const {navigation}=this.props;
    const item=navigation.getParam('iditem')
    const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
     return(
       <View style={styles.container}>
       <ScrollView style={styles.card}>
       <View style={{flexDirection:'row',margin:12,alignItems:'center',borderBottomColor:'gray'}}>
       <Text style={{flex:2,fontSize:18,fontWeight:'bold'}}>{item.nama}</Text>
      {/*  <TouchableOpacity onPress={()=>this.beli(item)} style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(85, 62, 214)',padding:8,borderRadius:5}}><Text style={{color:'white',fontSize:14}}>Buy </Text><Icon name="ios-basket" color="white" size={16}/></TouchableOpacity>
      */} 
      </View>     
      { item.gambar>0?
        <Image source={{uri:item.gambar}} style={{width: imageWidth,height:335}}/>:
        <Image source={require('../assets/beos_package.png')} style={{width: imageWidth,height:335}}/>
      }
        <View style={{flexDirection:'row',alignItems:'center',padding:15}}>
       <Text style={{flex:2,fontSize:22,color:'green',fontWeight:'bold'}}>Rp{this.rupiah(item.harga)}</Text>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderRadius:5,margin:5}} onPress={()=>{this.setModalVisible(true), this.fEdit(item)}}><View style={styles.ikon}><Icon name="ios-create" size={24}/></View></TouchableOpacity>
        </View>
         <View style={{flexDirection:'row',padding:15,borderBottomColor:'gray',borderBottomWidth:.3}}>            
       <Text style={{flex:1,fontSize:12}}>Stok</Text>    
       <Text style={{flex:2,fontSize:12}}>{this.rupiah(item.qty)} {item.satuan}</Text>
         </View>
         <View style={{flexDirection:'row',padding:15}}>            
       <Text style={{flex:1,fontSize:12}}>Deskripsi</Text>    
       <Text style={{flex:2,fontSize:12,textAlign:'justify'}}>{item.keterangan}</Text>
         </View>
       </ScrollView>

        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onBackdropPress={()=>{this.setModalVisible(false);}}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',paddingTop:'15%',paddingLeft:35,paddingRight:35,paddingBottom:'12.5%'}}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',padding:9,backgroundColor:'rgb(85, 62, 214)'}}><Text style={{color:'#fff',flex:2,fontSize:16,fontWeight:'bold'}}>Edit</Text><TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}><Icon name="ios-close-circle"color="#fff" size={24} /></TouchableOpacity></View>
                 <ScrollView>
              <View style={{flex:1,backgroundColor:'#fff',paddingTop:9,paddingLeft:15,paddingRight:15,paddingBottom:15}}>
        <Text style={{fontWeight:'bold'}}>Nama</Text>
        <TextInput onChangeText={(TextInputValue)=>this.setState({eproduk:TextInputValue})} style={styles.textinput} value={this.state.eproduk} underlineColorAndroid={'transparent'}/>
        <Text style={{fontWeight:'bold'}}>Harga (Rp)</Text>
        <TextInput onChangeText={(TextInputValue)=>this.setState({eharga:TextInputValue})} style={styles.textinput} value={(this.state.eharga).toString()} keyboardType="numeric" underlineColorAndroid={'transparent'}/>
        <Text style={{fontWeight:'bold'}}>Qty</Text>
        <TextInput onChangeText={(TextInputValue)=>this.setState({eqty:TextInputValue})} style={styles.textinput} value={(this.state.eqty).toString()} keyboardType="numeric" underlineColorAndroid={'transparent'}/>
        <Text style={{fontWeight:'bold'}}>Satuan</Text>
        <Picker
  selectedValue={this.state.esatuan}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue, itemIndex) => this.setState({esatuan: itemValue})}>
  <Picker.Item label="--- Pilih Satuan ---" value="" />
  <Picker.Item label="Box" value="Box" />
  <Picker.Item label="Dus" value="Dus" />
  <Picker.Item label="Gram" value="Gram" />
  <Picker.Item label="Kilogram" value="Kilogram" />
  <Picker.Item label="Lembar" value="Lembar" />
  <Picker.Item label="Pcs" value="Pcs" />
</Picker>
        <Text style={{fontWeight:'bold'}}>Description</Text>
        <TextInput onChangeText={(TextInputValue)=>this.setState({edescription:TextInputValue})} style={styles.textinput} value={this.state.edescription}  multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
              <TouchableOpacity style={{backgroundColor:'rgb(85, 62, 214)',alignSelf:'stretch', padding:15,alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.updatepress()}>
                <Text style={{color:'#fff',fontSize:14, fontWeight:'bold'}}>Update</Text>
              </TouchableOpacity>
              </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

     </View>

     );
  }
}
function mapDispatchToProps (dispatch) {
    return {
       updateDataAction:(datapro)=>dispatch(updateDataAction(datapro))
    }
  }
  
  export default connect(null,mapDispatchToProps)(DetailProduk)
const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      card:{
        flex:1,
        backgroundColor:'white',
        marginBottom:.4
      },
      textinput:{
        alignSelf:'stretch',
        height:25,
        paddingBottom:3,
        marginBottom:15,
        borderBottomColor:'rgb(85, 62, 214)',
        borderBottomWidth:1
      },
      combobox:{
        alignSelf:'stretch',
        height:25,
        paddingBottom:3,
        marginBottom:15,
        borderBottomColor:'rgb(85, 62, 214)',
        borderBottomWidth:1
      }
});
