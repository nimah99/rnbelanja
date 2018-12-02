import React, { Component } from 'react';
import { Text, View,StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {connect } from "react-redux";
import { addNavigationHelpers, createBottomTabNavigator,createStackNavigator, createMaterialTopTabNavigator  } from 'react-navigation';
import Login from '../components/login'
import Signup from '../components/signup'
import Beranda from '../components/form1'
import Input from '../components/input'
import Produk from '../components/produk'
import Detail from '../components/detail'
import Cart from '../components/cart'
import More from '../components/more'
import DetailProduk from '../components/detailproduk'
import UserList from '../components/users'
import UserInput from '../components/user'
import Profile from '../components/profile'

const toptab= createMaterialTopTabNavigator  ({
  Users:{screen:UserList
  },
  Add:{screen:UserInput
  },
  Profile:{screen:Profile
  }
},{
  initialRouteName:'Add',
  order:['Add', 'Users','Profile'],
  navigationOptions:{
    tabBarVisible:true
  },
  tabBarOptions:{
    activeTintColor:'#fff',
    inactiveTintColor:'rgba(195, 172, 238, 0.925)', //rgba(235, 219, 243, 0.719)
    indicatorStyle:{backgroundColor:'rgba(112, 8, 8, 0.925)'},
    pressColor :'rgba(112, 8, 8, 0.925)',
    labelStyle : {fontSize:14,fontWeight:'bold'},
    style:{
      backgroundColor:'rgba(85, 62, 214, 0.842)',
      marginTop: StatusBar.currentHeight,
    }
  }
});
const stacknav=createStackNavigator({
  dataproduk:{screen:Produk,
    navigationOptions:({navigation})=>({
      headerTitle:()=><View style={{flex:1}}><View style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>navigation.navigate('Form2')} style={{flex:3,flexDirection:'row',paddingLeft:15,paddingRight:15,alignItems:'center'}} ><Icon name="ios-search" color='black' size={29}/><Text style={{fontSize:18, color:'gray'}}> Search</Text></TouchableOpacity>
      <TouchableOpacity style={{flex:1,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    marginRight:15,
    backgroundColor:'rgba(85, 62, 214,0.8)',}} onPress={()=>navigation.navigate('Input')}><Text style={{color:'white',fontSize:14}}>ADD</Text></TouchableOpacity></View></View>,
   
   })
 }
});
const stacknavCart=createStackNavigator({
  CartList:{screen:Cart,
    navigationOptions:{
      title:'Shopping Cart'
    }
 }
});
const stacknavset=createStackNavigator({
  settingpro:{screen:More,
    navigationOptions:{
      title:'Settings'
   }
 }
});
const Bottomtab= createBottomTabNavigator ({
  Beranda:{screen:Beranda,
   navigationOptions:{
    tabBarIcon:({tintColor})=>(<Icon name="ios-home" color={tintColor} size={29}/>),
    tabBarOptions:{
      activeTintColor:'white',
      inactiveTintColor:'rgba(195, 172, 238, 0.925)',
      style:{
        backgroundColor:'rgb(85, 62, 214)'
      }
    }
  } 
},
Produk:{screen:stacknav,
  navigationOptions:{
   tabBarIcon:({tintColor})=>(<Icon name="ios-pricetags" color={tintColor} size={29}/>),
   tabBarOptions:{
     activeTintColor:'white',
     inactiveTintColor:'rgba(195, 172, 238, 0.925)',
     style:{
       backgroundColor:'rgb(85, 62, 214)'
     }
   }
 } 
},
UsersList:{screen:toptab,
   navigationOptions:{
    tabBarIcon:({tintColor})=>(<Icon name="ios-contact" color={tintColor} size={29}/>),
    tabBarOptions:{
      activeTintColor:'white',
      inactiveTintColor:'rgba(195, 172, 238, 0.925)',
      style:{
        backgroundColor:'rgb(85, 62, 214)'
      }
    }
  } 
},
Cart:{screen:stacknavCart,
  navigationOptions:{
   tabBarIcon:({tintColor})=>(<Icon name="ios-cart" color={tintColor} size={29}/>),
   tabBarOptions:{
     activeTintColor:'white',
     inactiveTintColor:'rgba(195, 172, 238, 0.925)',
     style:{
       backgroundColor:'rgb(85, 62, 214)'
     }
   }
 } 
}
}
,{
  initialRouteName:'Beranda',
  order:['Beranda','Produk','Cart','UsersList'],
  navigationOptions:{
    tabBarVisible:true,
    showLabel:true
  }
});
 export const AppNavigation= createStackNavigator ({
  Login:{screen:Login,navigationOptions:{header:null}},
  Home:{screen:Bottomtab,navigationOptions:{header:null}},
  Input:{screen:Input,navigationOptions:{title:'Input Produk'}},
  Detail:{screen:Detail,navigationOptions:{title:'Detail Produk'}},
  DetailProduk:{screen:DetailProduk,navigationOptions:{title:'Detail Produk'}},
  Signup:{screen:Signup,navigationOptions:{header:null}},
}); 

export default AppNavigation;