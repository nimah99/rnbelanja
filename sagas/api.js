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
    console.log('Successfuly Deleted '+proid+' .....')
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
      produk:datapro.produk,
      harga:datapro.harga,
      qty:datapro.qty,
      description:datapro.description
    })
  })
  const dta= await response.json();
   console.log("Successfuly Updated")
   return dta;
}catch(error){
  console.log(error)
}
}

 const Api={
  getProduct:getProduct(),
  removepro,
  uploadProduct,
  updatepro
} 
export default Api;