import { AsyncStorage } from "react-native";

getdtaAsync= async () =>{
  try{
    const response=await AsyncStorage.getItem('beliProduk');
    const dta= await JSON.parse(response);
    return dta;
  }catch(error){console.log(error);}
}
addtoasync= async (idpro) =>{
  let cart=[];
  let data={id:idpro.id,nama:idpro.nama,harga:idpro.harga,gambar:idpro.gambar,jenis:idpro.jenis,qty:1,jumlah:idpro.harga*1}
  cart.push(data);
    try{
      let response= await AsyncStorage.getItem('beliProduk');
        if(response !== null){  
          let dta= await JSON.parse(response);
                dta.push(data)
                await AsyncStorage.setItem('beliProduk',JSON.stringify(dta))
                let rspn= await AsyncStorage.getItem('beliProduk');
                let listasyncbaru= await JSON.parse(rspn);
                return listasyncbaru;
        }else{  
          await AsyncStorage.setItem('beliProduk',JSON.stringify(cart))
          let rspn= await AsyncStorage.getItem('beliProduk');
          let listasyncawal= await JSON.parse(rspn);
          return listasyncawal;
        }
    }catch(error){console.log(error)}
}
removeAsync= async (produkid) =>{
  try {
    let response=await AsyncStorage.getItem('beliProduk');
     if(response!==null){
       let idpro=await JSON.parse(response);
       for(let i=0;i<idpro.length;i++){
       let fd=idpro[i].id; 
         if(fd===produkid){
          idpro.splice(i, 1); 
          await AsyncStorage.setItem('beliProduk',JSON.stringify(idpro));
          let rspn= await AsyncStorage.getItem('beliProduk');
          let listasync= await JSON.parse(rspn);
          return listasync;
         } 
        } 
      }
  }catch(error) {console.log(error)}
}



getProfileAsync= async () =>{
  try{
    const response=await AsyncStorage.getItem('email');
    const dta= await JSON.parse(response);
    console.log(dta);
    return dta;
  }catch(error){console.log(error);}
}

addProfile= async (userprofile) =>{
  let dta=[];
  let dataprofile={email:userprofile.email,username:userprofile.username,password:userprofile.password,foto:userprofile.foto,created:userprofile.created,user_level:userprofile.user_level};
  dta.push(dataprofile);
    try{
      let res= await AsyncStorage.getItem('email');
        if(res !== null){  
          console.log("sudah login");
        }else{  
          await AsyncStorage.setItem('email',JSON.stringify(dta))
          let rspn= await AsyncStorage.getItem('email');
          let listprofile= await JSON.parse(rspn);
          return listprofile;
        }
    }catch(error){console.log(error)}
}


const dtaasyncApi={
   addtoasync,
   getdtaAsync:getdtaAsync(),
   removeAsync,
   getProfileAsync:getProfileAsync(),
   addProfile
} 
export default dtaasyncApi;