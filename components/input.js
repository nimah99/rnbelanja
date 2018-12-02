import React from 'react';
import { StyleSheet, Alert,Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity, Picker, Image,ScrollView, ActivityIndicator,RefreshControl,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'
import { requestAddProducts } from '../actions'
class Input extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      produk:'',
      harga:'',
      qty:'',
      description:'',
      jenis:'',
      image:null,
      imagesupload: ''
      };
  }
  cancel=()=>{
    this.produk.clear();
    this.harga.clear();
    this.qty.clear();
    this.description.clear();
    this.setState({jenis:'',image:null,imagesupload:''})
    //this.props.navigation.navigate('Produk');
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
    const formData=new FormData();
     formData.append('photo',{uri:this.state.imagesupload,name:uriParts,type}); //file(nodejs) photo(php)
     formData.append('nama',this.state.produk);
     formData.append('harga',this.state.harga);
     formData.append('qty',this.state.qty);
     formData.append('satuan',this.state.jenis);
     formData.append('keterangan',this.state.description);
     this.props.requestAddProducts(formData);
    // this.props.dispatch({type:'PRODUCTS_ADD_REQUEST',formData});
   // .then(ToastAndroid.show('Berhasil tersimpan',ToastAndroid.SHORT,5000))
  }


  toastberhasil(){
      ToastAndroid.show('Berhasil tersimpan',ToastAndroid.SHORT,5000)
  }
  render() {
    let { image } = this.state; 
    return (
      <View style={styles.forminput}>
      <ScrollView>
        <View style={{flex:1,paddingLeft:15,paddingRight:15,paddingBottom:15,paddingTop:25}}>
        <TextInput ref={input => { this.produk = input }} onChangeText={(TextInputValue)=>this.setState({produk:TextInputValue})} style={styles.textinput} returnKeyType="next" onSubmitEditing={() => this.harga.focus()} placeholder="Product Name" underlineColorAndroid={'transparent'}/>
        <TextInput ref={input => { this.harga = input }} onChangeText={(TextInputValue)=>this.setState({harga:TextInputValue})} style={styles.textinput} returnKeyType="next" onSubmitEditing={() => this.qty.focus()} placeholder="Price" keyboardType="numeric" underlineColorAndroid={'transparent'}/>
        <TextInput ref={input => { this.qty = input }} onChangeText={(TextInputValue)=>this.setState({qty:TextInputValue})} style={styles.textinput} returnKeyType="next" onSubmitEditing={() => this.description.focus()} placeholder="Qty" keyboardType="numeric" underlineColorAndroid={'transparent'}/>
        <Picker
  selectedValue={this.state.jenis}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue, itemIndex) => this.setState({jenis: itemValue})}>
  <Picker.Item label="--- Unit Type ---" value="" />
  <Picker.Item label="Box" value="Box" />
  <Picker.Item label="Dus" value="Dus" />
  <Picker.Item label="Gram" value="Gram" />
  <Picker.Item label="Kilogram" value="Kilogram" />
  <Picker.Item label="Sheet" value="Sheet" />
  <Picker.Item label="Pieces" value="Pieces" />
</Picker>
        <TextInput ref={input => { this.description = input }} onChangeText={(TextInputValue)=>this.setState({description:TextInputValue})} multiline={true}
    numberOfLines={4} style={styles.textinputarea} placeholder="Description" underlineColorAndroid={'transparent'}/>
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
    requestAddProducts:(formData)=>dispatch(requestAddProducts(formData))
  }
} 
export default connect(null,mapDispatchToProps)(Input)
const styles = StyleSheet.create({
      forminput:{
        flex:1,
        backgroundColor:'#fff'
      },
  header:{
    marginTop:15,
    fontSize:22,
    fontWeight:'bold',
    color:'rgba(85, 62, 214, 0.842)',
    marginBottom:25,
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
  },
  combobox:{
    alignSelf:'stretch',
    height:25,
    paddingBottom:3,
    marginBottom:15,
    color:'rgb(85, 62, 214)',
    borderBottomColor:'rgba(85, 62, 214, 0.842)',
    borderBottomWidth:1,
    padding:1
  },textinputarea:{
    alignSelf:'stretch',
    height:39,
    paddingBottom:3,
    marginBottom:15,
    color:'rgb(85, 62, 214)',
    borderBottomColor:'rgba(85, 62, 214, 0.842)',
    borderBottomWidth:1,
    fontSize:16,
    padding:1
  },
  descriptions:{
    flex:2
  },
  action:{
    alignItems:'center',
    justifyContent:'center'
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
