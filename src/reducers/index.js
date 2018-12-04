// reducer
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectProdukReducer from './SelectProdukReducer';

export default combineReducers({ 
    namaDiReducers : () => 'Jamal Fazlur',
    // username: AuthReducer
    auth: AuthReducer,
    selectedProduk: SelectProdukReducer
});