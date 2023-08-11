import { INPUT_CHANGE, PRESS_ENTER, LOADING_DATA, LOADING_DATA_OK, LOADING_ERROR, LOADING_DATA_OK_CO_DU_LIEU, CLEAR_INPUT,RESTORE_INPUT } from "../constants/dubaoConstants";

const initialState = {
    inputCity:"",
    loadingData: false,
    loadingDataError: false,
    inputCity2:"",
    showDuLieuA: false,
    today:{},
    nextDay1:{},
    nextDay2:{},
    nextDay3:{},
    nextDay4:{},
    cityName:"",

}



const duBaoReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case (INPUT_CHANGE):
            state.inputCity = action.payload
            break;
        case (PRESS_ENTER):
            state.inputCity = action.payload
            break;
        case (LOADING_DATA):
            state.loadingData = true
            break;
        
        case (LOADING_DATA_OK):
            state.loadingData = false
            break;

        case (LOADING_ERROR):
            state.loadingDataError = true;
            state.showDuLieuA = false
            break;

        case (LOADING_DATA_OK_CO_DU_LIEU):
            state.loadingData = false;
            state.showDuLieuA = true;
            state.today = action.data5 [0];
            state.nextDay1 = action.data5 [8];
            state.nextDay2 = action.data5 [16];
            state.nextDay3 = action.data5 [24];
            state.nextDay4 = action.data5 [32];
            state.cityName = state.inputCity
            break;

        case (CLEAR_INPUT):
            state.inputCity = action.payload;
            state.loadingDataError = false
            break;

        case (RESTORE_INPUT):
            break;


        default:
            break;
    }
    return {...state}
}

export default duBaoReducer