getProduct = async()=>{
    try{
  const response= await fetch('http://192.168:4000/file_produk');
  const dta= await response.json();
  return dta;
    }catch(error){
      console.log(error);
    }
  }

  removepro=async(proid)=>{
    try{
   const response = await fetch('http://192.168:4000/file_produk/delete',{
      method:'post',
       headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }, 
      body:JSON.stringify({
        id:proid
      })
    })
    const dta= await response.json();
  return dta;
  }catch(error){
console.log(error);
  }
  }

  uploadProduct=async(formData)=>{
    try{
    const response=  await fetch('http://192.168:4000/file_produk/insert',{
     method:'post',
     body:formData,
     headers:{ 
       'Accept':'applicaton/json',
       'Content-Type':'multipart/form-data'
     },
   })
   const dta= await response.json();
  return dta;
}catch(error){
  console.log(error);
}
 }

 updatepro=async(datapro)=>{
  try{
    const response=  await fetch('http://192.168:4000/file_produk/update',{
    method:'post', 
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      id:datapro.id,
      nama:datapro.nama,
      harga:datapro.harga,
      qty:datapro.qty,
      satuan:datapro.satuan,
      keterangan:datapro.keterangan
    })
  })
  const dta= await response.json();
   return dta;
}catch(error){
  console.log(error)
}
}


getUsers = async()=>{
  try{
const response= await fetch('http://192.168:4000/file_users');
const dta= await response.json();
return dta;
  }catch(error){
    console.log(error);
  }
}
uploadUser=async(UserformData)=>{
  try{
  const response=  await fetch('http://192.168:4000/file_users/insert',{
   method:'post',
   body:UserformData,
   headers:{ 
     'Accept':'applicaton/json',
     'Content-Type':'multipart/form-data'
   },
 })
 const dta= await response.json();
return dta;
}catch(error){
console.log(error);
}
}
removeuser=async(Userid)=>{
  try{
 const response = await fetch('http://192.168:4000/file_users/delete',{
    method:'post',
     headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }, 
    body:JSON.stringify({
      iduser:Userid
    })
  })
  const dta= await response.json();
return dta;
}catch(error){
console.log(error);
}
}

insertCart=async(cart)=>{
  try{
    await fetch('http://192.168:4000/file/tampilkanarray',{
      method:'post',
       headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }, 
      body:JSON.stringify(cart)
    })
   .then(response=>console.log(response.json()))
    .catch(err=>console.error(err))
}catch(error){
console.log(error);
}
}
 const ApiServer={
  getProduct:getProduct(),
  removepro,
  uploadProduct,
  updatepro,
  getUsers:getUsers(),
  uploadUser,
  removeuser,
  insertCart
} 
export default ApiServer;