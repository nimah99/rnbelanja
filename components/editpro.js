import React from 'react';
import { StyleSheet, Alert,Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity, Picker,ScrollView, ActivityIndicator,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { updateDataAction } from '../actions'
class EditProduk extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        rupiah:'',
        eid:'',
        eproduk:'',
        eharga:'',
        eqty:'',
        esatuan:'',
        edescription:'',
      };
  }
  cancel=()=>{
    this.props.navigation.navigate('DetailProduk');
  }
  fEdit=(item)=>{
    this.state.eid=item.id;
    this.state.enama=item.nama;
    this.state.eharga=item.harga;
    this.state.eqty=item.qty;
    this.state.esatuan=item.satuan;
    this.state.edescription=item.keterangan;
  }  
  updatepress(){
    const dataprop={
        id:this.state.eid,
        nama:this.state.enama,
        harga:this.state.eharga,
        qty:this.state.eqty,
        satuan:this.state.esatuan,
        keterangan:this.state.edescription
      }
      this.props.updateDataAction(dataprop)
  }

  render() {
    const {navigation}=this.props;
    const item=navigation.getParam('iditem')
    return (
      <View style={styles.forminput}>
      <ScrollView>
        <View style={{flex:1,paddingLeft:15,paddingRight:15,paddingBottom:15,paddingTop:25}}>
        <TextInput value={this.state.enama} onChangeText={(TextInputValue)=>this.setState({enama:TextInputValue})} style={styles.textinput} placeholder="Nama Produk" underlineColorAndroid={'transparent'}/>
        <TextInput value={this.state.eharga} onChangeText={(TextInputValue)=>this.setState({eharga:TextInputValue})} style={styles.textinput} placeholder="Harga" keyboardType="numeric" underlineColorAndroid={'transparent'}/>
        <TextInput value={(this.state.eqty).toString()} onChangeText={(TextInputValue)=>this.setState({eqty:TextInputValue})} style={styles.textinput} placeholder="Qty" keyboardType="numeric" underlineColorAndroid={'transparent'}/>
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
        <TextInput value={this.state.edescription} onChangeText={(TextInputValue)=>this.setState({edescription:TextInputValue})} multiline={true}
    numberOfLines={4} style={styles.textinputarea} placeholder="Description" underlineColorAndroid={'transparent'}/>
        <TouchableOpacity style={styles.submit} onPress={()=>this.updatepress()}><Text style={styles.submittext}>Update</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={this.cancel}><Text style={styles.submittext}>Cancel</Text></TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
  }
}
 function mapDispatchToProps (dispatch) {
  return {
    updateDataAction:(datapro)=>dispatch(updateDataAction(datapro))
  }
} 
export default connect(null,mapDispatchToProps)(EditProduk)
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
