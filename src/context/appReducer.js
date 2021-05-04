import { ERROR_MSG, LOADING, GET_ALL_USERS, GET_POSITIONS, CHANGE_PAGE } from './types'

export const appReducer = (state, action) => {
  switch (action.type) {
    case ERROR_MSG:
      return {
        ...state,
        errorMsg: action.payload,
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload
      }
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        totalPage: action.totalPage
      }
    default:
      return state
  }
}
