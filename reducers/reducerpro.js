import {SUKSES_MASUK,FETCH_PROFILEASYNC,FETCH_PROFILESUCCESSED,REQ_REFRESH_ASYNC, REFRESHDATAASYNC, UP_QTY,DOWN_QTY,DEL_USERREQ,DEL_USERSUCCESSED,FETCH_USER,FETCH_USERSUCCESSED,USER_ADD_RECEIVE, DEL_ASYNC_SUCCESS,FETCH_ASYNCSUCCESSED,FETCH_DATAASYNC,PRODUCTS_ADDASYNC_RECEIVE,FETCH_DATA,FETCH_SUCCESSED,DEL_SUCCESSED,FILTER_SUCCESSED,PRODUCTS_ADD_RECEIVE,UPDATE_SUCCESSED,REFRESHDATA, REQ_REFRESH} from '../actions'

  const initialState = {
    data:[],
    dtapro:[],
    userdata:[],
    profile:[],
    isLoading:true,
    refreshing:false
  }
export default function reducerpro(state=initialState,action){
  switch(action.type){
    //Server
    case FETCH_DATA: return {...state, data: [], isLoading:true}
    case FETCH_SUCCESSED: return {...state, data: action.data, isLoading:false} 
    case PRODUCTS_ADD_RECEIVE: return {...state,data:action.data,isLoading:false}
    case DEL_SUCCESSED: return{...state,data:action.data,isLoading:false}
    case UPDATE_SUCCESSED: return{...state,data:action.data,isLoading:false}
    case FILTER_SUCCESSED:
    const works = state.data.filter((val) =>{return val.nama.toLowerCase().indexOf(action.text.toLowerCase()) > -1});
    return {...state, data:works,text:action.text};
    //case FILTER_SUCCESSED: return{...state,data:state.data.filter(item => { return item.nama.toLowerCase().includes(action.text.toLowerCase()) })}  
    case REQ_REFRESH: return {...state, data: [], refreshing:true}
    case REFRESHDATA: return {...state, data: action.data,refreshing:false} 
    //AsyncStorage
    case FETCH_DATAASYNC: return {...state, dtapro: [], isLoading:true}
    case FETCH_ASYNCSUCCESSED: return {...state, dtapro: action.dtapro, isLoading:false}
    case PRODUCTS_ADDASYNC_RECEIVE: return {...state,dtapro:action.dtapro, isLoading:false}
    case DEL_ASYNC_SUCCESS: return {...state,dtapro:action.dtapro, isLoading:false} 
    case REQ_REFRESH_ASYNC: return {...state, dtapro: [], refreshing:true}
    case REFRESHDATAASYNC: return {...state, dtapro: action.dtapro,refreshing:false} 
    //Cart
    case UP_QTY: 
    const dta=[...state.dtapro];
    const dtqty=++dta[action.idx].qty;
    dta[action.idx].jumlah=dta[action.idx].qty * dta[action.idx].harga;
    return {...state,dtapro:dta, isLoading:false}
    case DOWN_QTY:
    const dt=[...state.dtapro];
    const dtaqty=--dt[action.idx].qty;
    dt[action.idx].jumlah=dt[action.idx].qty * dt[action.idx].harga;
    return {...state,dtapro:dt, isLoading:false}
    //Server User
    case FETCH_USER: return {...state, userdata: [], isLoading:true}
    case FETCH_USERSUCCESSED: return {...state, userdata: action.userdata, isLoading:false} 
    case USER_ADD_RECEIVE: return {...state,userdata:action.userdata,isLoading:false}
    case DEL_USERSUCCESSED: return{...state,userdata:action.userdata,isLoading:false}
    //AsyncProfile
    case FETCH_PROFILEASYNC: return {...state, profile: [], isLoading:true}
    case FETCH_PROFILESUCCESSED: return {...state, profile: action.profile, isLoading:false}
    case SUKSES_MASUK: return {...state,profile:action.profile,isLoading:false}

    default:
    return state;
  }
}