import {createStore} from 'redux';

const initialState = {
  loading: false,
  isLogin: false,
  profile: {
    email: null,
    fullname: null,
    pekerjaan: null,
    photo: null,
    uid: null,
  },
  news: [],
  hospitals: [],
  ratedDoctors: [],
  categoryDoctors: [],
  categoryEachDoctors: [],
  newsDetail: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      };

    case 'SAVE_USER':
      return {
        ...state,
        isLogin: true,
        profile: {
          ...state.profile,
          email: action.value.email,
          fullname: action.value.fullname,
          pekerjaan: action.value.pekerjaan,
          photo: action.value.photo,
          uid: action.value.uid,
        },
      };

    case 'UPLOAD_FOTO':
      return {
        ...state,
        profile: {
          ...state.profile,
          photo: action.value.photo,
        },
      };

    case 'LOG_OUT':
      return initialState;

    case 'GET_NEWS':
      return {
        ...state,
        news: action.value,
      };

    case 'GET_NEWS_DETAIL':
      return {
        ...state,
        newsDetail: action.value,
      };

    case 'GET_HOSPITALS':
      return {
        ...state,
        hospitals: action.value,
      };

    case 'GET_CATEGORY_DOCTOR':
      return {
        ...state,
        categoryDoctors: action.value,
      };

    case 'GET_CATEGORY_EACH_DOCTOR':
      return {
        ...state,
        categoryEachDoctors: action.value,
      };

    case 'GET_RATED_DOCTORS':
      return {
        ...state,
        ratedDoctors: action.value,
      };

    default:
      break;
  }
  return state;
};

const store = createStore(reducer);

export default store;
