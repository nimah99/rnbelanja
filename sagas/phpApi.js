getProduct = async()=>{
    try{
  const response= await fetch('http://www.com/siak/data.php');
  const dta= await response.json();
  return dta;
    }catch(error){
      console.log(error);
    }
  }

  removepro=async(proid)=>{
    try{
   const response = await fetch('http://www.com/siak/delete.php',{
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
    const response=  await fetch('http://www.com/siak/insert.php',{
     method:'post',
     body:formData,
     headers:{ 
       'Accept':'applicaton/json',
       'Content-Type':'multipart/form-data'
     },
   })
   const dta= await response.json();
   console.log("Successfuly Added")
  return dta;
}catch(error){
  console.log(error);
}
 }

 updatepro=async(datapro)=>{
  try{
    const response=  await fetch('http://www.com/siak/update.php',{
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
   console.log("Successfuly Updated")
   return dta;
}catch(error){
  console.log(error)
}
}


getUsers = async()=>{
  try{
const response= await fetch('http://www.com/siak/users.php');
const dta= await response.json();
return dta;
  }catch(error){
    console.log(error);
  }
}
uploadUser=async(UserformData)=>{
  try{
  const response=  await fetch('http://www.com/siak/user.php',{
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
 const response = await fetch('http://www.com/siak/deleteuser.php',{
    method:'post',
     headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }, 
    body:JSON.stringify({
      email:Userid
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
    console.log(JSON.stringify(cart))
  const response=  await fetch('http://www.com/siak/simpanCart.php',{
   method:'post',
   headers:{ 
     'Accept':'applicaton/json',
     'Content-Type':'applicaton/json'
   },
   body:JSON.stringify(cart)
 })
 const dta= await response.json();
 console.log("Successfuly Inserted")
return dta;
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