export const PRODUCTS_ADD_RECEIVE = 'PRODUCTS_ADD_RECEIVE'
export const PRODUCTS_ADD_REQUEST = 'PRODUCTS_ADD_REQUEST'
export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_SUCCESSED = 'FETCH_SUCCESSED'
export const DEL_REQ = 'DEL_REQ'
export const DEL_SUCCESSED = 'DEL_SUCCESSED'
export const UPDATE_REQ = 'UPDATE_REQ'
export const UPDATE_SUCCESSED = 'UPDATE_SUCCESSED'
export const FILTER_DATA = 'FILTER_DATA'
export const FILTER_SUCCESSED = 'FILTER_SUCCESSED'
export const REQ_REFRESH = 'REQ_REFRESH'
export const REFRESHDATA = 'REFRESHDATA'

export const PRODUCTS_ADDASYNC_REQUEST = 'PRODUCTS_ADDASYNC_REQUEST'
export const PRODUCTS_ADDASYNC_RECEIVE = 'PRODUCTS_ADDASYNC_RECEIVE'
export const DEL_ASYNC = 'DEL_ASYNC'
export const DEL_ASYNC_SUCCESS = 'DEL_ASYNC_SUCCESS'
export const FETCH_DATAASYNC = 'FETCH_DATAASYNC'
export const FETCH_ASYNCSUCCESSED = 'FETCH_ASYNCSUCCESSED'
export const REFRESHDATAASYNC = 'REFRESHDATAASYNC'
export const REQ_REFRESH_ASYNC= 'REQ_REFRESH_ASYNC'

export const UP_QTY = 'UP_QTY'
export const DOWN_QTY = 'DOWN_QTY'

export const USER_ADD_RECEIVE = 'USER_ADD_RECEIVE'
export const USER_ADD_REQUEST = 'USER_ADD_REQUEST'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USERSUCCESSED = 'FETCH_USERSUCCESSED'
export const DEL_USERREQ = 'DEL_USERREQ'
export const DEL_USERSUCCESSED = 'DEL_USERSUCCESSED'

export const SAVE_RECEIVE = 'SAVE_RECEIVE'
export const SAVE_REQUEST = 'SAVE_REQUEST'
export const FETCH_CART = 'FETCH_CART'
export const FETCH_CART_RECEIVE = 'FETCH_CART_RECEIVE'
export const DEL_CARTREQ = 'DEL_CARTREQ'
export const DEL_CARTSUCCESSED = 'DEL_CARTSUCCESSED'
//Login
export const COBA_MASUK = 'COBA_MASUK'
export const SUKSES_MASUK = 'SUKSES_MASUK'
export const FETCH_PROFILEASYNC ='FETCH_PROFILEASYNC'
export const FETCH_PROFILESUCCESSED='FETCH_PROFILESUCCESSED'
//Produk
export const requestFetchAction = () => ({ type: FETCH_DATA });
export const delDataAction = proid => ({type: DEL_REQ, proid});  
export const updateDataAction = datapro => ({type: UPDATE_REQ, datapro});  
export const requestAddProducts = formData => ({ type: PRODUCTS_ADD_REQUEST, formData });
export const filterDataAction = text => ({ type: FILTER_SUCCESSED, text});  
export const refreshingList=()=>({type:REQ_REFRESH}); 
//CartQty
export const upQtyAction = idx => ({type: UP_QTY, idx});
export const downQtyAction = idx => ({type: DOWN_QTY, idx}); 
//Asyncstorage
export const requestFetchAsync = () => ({ type: FETCH_DATAASYNC });
export const AddProductToAsync = idpro => ({ type: PRODUCTS_ADDASYNC_REQUEST, idpro });
export const delcartby= produkid =>({type:DEL_ASYNC, produkid}); 
export const refreshingListAsync=()=>({type:REQ_REFRESH_ASYNC});
//User
export const requestFetchUser=()=>({type:FETCH_USER});
export const requestUserAdd = UserformData => ({ type: USER_ADD_REQUEST, UserformData });
export const delUserAction = Userid => ({type: DEL_USERREQ, Userid});  
//Cart
export const requestCartAction = () => ({ type: FETCH_CART });
export const delCartAction = cartid => ({type: DEL_CARTREQ, cartid});  
export const requestAddCart = cart => ({ type: SAVE_REQUEST, cart });
//Login
export const LoginFetchAction=(userprofile)=>({type: COBA_MASUK, userprofile})
export const requestProfile=()=>({type:FETCH_PROFILEASYNC});