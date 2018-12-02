import { NavigationActions } from 'react-navigation';
import { COBA_MASUK,SUKSES_MASUK,FETCH_PROFILEASYNC,FETCH_PROFILESUCCESSED,SAVE_REQUEST,SAVE_RECEIVE,UP_QTY_SUCCESS,REFRESHDATAASYNC,REQ_REFRESH_ASYNC,REQ_REFRESH,REFRESHDATA, DEL_USERREQ,DEL_USERSUCCESSED, FETCH_USER,FETCH_USERSUCCESSED,USER_ADD_RECEIVE,USER_ADD_REQUEST,DEL_ASYNC,DEL_ASYNC_SUCCESS,FETCH_ASYNCSUCCESSED,FETCH_DATAASYNC,PRODUCTS_ADDASYNC_REQUEST,PRODUCTS_ADDASYNC_RECEIVE,FETCH_DATA,DEL_REQ,DEL_SUCCESSED,FETCH_SUCCESSED,PRODUCTS_ADD_RECEIVE,PRODUCTS_ADD_REQUEST, UPDATE_SUCCESSED, UPDATE_REQ, UP_QTY } from '../actions'
import { all, put, takeEvery, takeLatest} from 'redux-saga/effects'
//import ApiServer from './phpApi';
import ApiServer from './nodejsApi';
import dtaasyncApi from './asyncstorageapi';
//Server
function* fetchdta (action) {
  try {
    const data = yield ApiServer.getProduct;
    yield put({ type: FETCH_SUCCESSED,data:data.hasil }); //langsung data aja untuk api yang dari php
  } catch (e) {console.log(e)}
}
function* addProduk(action) {      
  try {
    const data = yield ApiServer.uploadProduct(action.formData);
    yield put ({type:PRODUCTS_ADD_RECEIVE,data:data.hasil})
  } catch (error) {console.log(error)}
} 
function* delt(action) {   
  try {
    const data = yield ApiServer.removepro(action.proid);
    yield put ({type:DEL_SUCCESSED,data:data.hasil})
  } catch (error) {console.log(error)}
}
function* updte(action) {   
  try {
    const data = yield ApiServer.updatepro(action.datapro);
    yield put ({type:UPDATE_SUCCESSED,data:data.hasil})
  } catch (error) {console.log(error)}
}
//Refreshing
function* fetchdtaRefresh (action) {
  try {
    const data = yield ApiServer.getProduct;
    yield put({ type: REFRESHDATA,data:data.hasil });
  } catch (e) {console.log(e)}
}
function* fetchdtaAsyncRefresh (action) {
  try {
    const dtapro = yield ApiServer.getdtaAsync;
    yield put({ type: REFRESHDATAASYNC,dtapro });
  } catch (e) {console.log(e)}
}
//AsyncStorage
function* Asynfetchdta (action) {
  try {
    const dtapro = yield dtaasyncApi.getdtaAsync;
    yield put({ type: FETCH_ASYNCSUCCESSED,dtapro});
  } catch (e){console.log(e)}
}
function* addProdukAsync(action) {      
  try {
    const dtapro = yield dtaasyncApi.addtoasync(action.idpro);
    yield put ({type:PRODUCTS_ADDASYNC_RECEIVE,dtapro})
    //yield put (NavigationActions.navigate({ routeName: 'Input' }))
  } catch (error){console.log(error)}
} 
function* deltAsync(action) {   
  try {
    const dtapro = yield dtaasyncApi.removeAsync(action.produkid);
    yield put ({type:DEL_ASYNC_SUCCESS,dtapro})
  } catch (error) {console.log(error)}
} 
function* fetchdtaUser (action) {
  try {
    const userdata = yield ApiServer.getUsers;
    yield put({ type: FETCH_USERSUCCESSED,userdata:userdata.hasil });
  } catch (e) {console.log(e)}
}
function* addUser(action) {      
  try {
    const userdata = yield ApiServer.uploadUser(action.UserformData);
    yield put ({type:USER_ADD_RECEIVE,userdata:userdata.hasil})
  } catch (error) {console.log(error)}
} 
function* deltUser(action) {  
  try {
    const userdata = yield ApiServer.removeuser(action.Userid);
    yield put ({type:DEL_USERSUCCESSED,userdata:userdata.hasil})
  } catch (error) {console.log(error)}
}
//Save Cart
function* saveCart(action) {      
  try {
    const data = yield ApiServer.insertCart(action.cart);
   // yield put ({type:SAVE_RECEIVE,data:data.hasil})
  } catch (error) {console.log(error)}
} 
//Profile
function* Asynfetchprofile (action) {
  try {
    const profile = yield dtaasyncApi.getProfileAsync;
    yield put({ type: FETCH_PROFILESUCCESSED,profile});
  } catch (e){console.log(e)}
}
function* addProfileAsync(action) {      
  try {
    const dtaprofile = yield dtaasyncApi.addProfile(action.userprofile);
    yield put ({type:SUKSES_MASUK,dtaprofile})
  } catch (error){console.log(error)}
} 

export function* mySaga () {
  yield takeLatest(FETCH_DATA, fetchdta)
}
export function* mySagaaddProduk () {
  yield takeLatest(PRODUCTS_ADD_REQUEST, addProduk)
}
export function* mySagadel () {
  yield takeLatest(DEL_REQ, delt)
}
export function* mySagaup () {
  yield takeLatest(UPDATE_REQ, updte)
}
//Refresh
export function* mySagaRefresh () {
  yield takeLatest(REQ_REFRESH, fetchdtaRefresh)
}
export function* mySagaRefreshAsync () {
  yield takeLatest(REQ_REFRESH_ASYNC, fetchdtaAsyncRefresh)
}
//AsyncStorage
 export function* mySagadtaAsync () {
  yield takeLatest(FETCH_DATAASYNC, Asynfetchdta)
}
export function* mySagaAddToAsync () {
  yield takeLatest(PRODUCTS_ADDASYNC_REQUEST, addProdukAsync)
}
 export function* mySagadelAsync () {
  yield takeLatest(DEL_ASYNC, deltAsync)
}
//User
export function* mySagaUser () {
  yield takeLatest(FETCH_USER, fetchdtaUser)
}
export function* mySagaaddUser () {
  yield takeLatest(USER_ADD_REQUEST, addUser)
}
export function* mySagadelUser () {
  yield takeLatest(DEL_USERREQ, deltUser)
}
//Save Cart
export function* mySagaSaveCart () {
  yield takeLatest(SAVE_REQUEST, saveCart)
}
//Profile
export function* mySagaProfile () {
  yield takeLatest(FETCH_PROFILEASYNC, Asynfetchprofile)
}
export function* mySagaListProfile(){
  yield takeLatest(COBA_MASUK,addProfileAsync)
}
export default function* rootSaga() {
  yield all([
    mySaga(),
    mySagadel(),
    mySagaaddProduk(),
    mySagaup(),
    mySagadtaAsync(),
    mySagaAddToAsync(),
    mySagadelAsync(),
    mySagaUser(),
    mySagaaddUser(),
    mySagadelUser(),
    mySagaRefresh(),
    mySagaSaveCart(),
    mySagaProfile(),
    mySagaListProfile()
  ])
}