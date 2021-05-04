import React, { useReducer } from 'react'
import axios from 'axios'
import env from "react-dotenv"
import { appReducer } from './appReducer'
import AppContext from './appContext'
import { ERROR_MSG, LOADING, GET_ALL_USERS, CHANGE_PAGE, GET_POSITIONS } from './types'

const AppState = (props) => {
  const initialState = {
    loading: false,
    errorMsg: null,

    page: 1,
    count: (window.innerWidth < 478) ? 3 : 6,
    totalPage: 1,
    positions: [],

    token: null,
    allUsers: null,
    user: null,
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const dispatchError = (msg) => {
    dispatch({
      type: ERROR_MSG,
      payload: msg,
    })
  }

  const dispatchLoading = (bool) => {
    dispatch({
      type: LOADING,
      payload: bool,
    })
  }

  const changePage = num => {
    dispatch({
      type: CHANGE_PAGE,
      payload: num
    })
  }

  const getAllUsers = async (page) => {
    dispatchLoading(true)

    const config = {
      params: {
        page: `${page}`,
        count: `${state.count}`,
      },
    }

    await axios
      .get(`${env.API_URL}/users`, config)
      .then((res) => {

        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.users,
          totalPage: res.data.total_pages
        })
      })
      .catch((error) => {
        if (error.response) {
          dispatchError(`ERROR: ${error.response.data.message}`)
          setTimeout(() => dispatchError(null), 3000)
        }
      })
    dispatchLoading(false)
  }


  const getPositions = async () => {
    await axios
      .get(`${env.API_URL}/positions`)
      .then((res) => {
        dispatch({
          type: GET_POSITIONS,
          payload: res.data.positions,
        })
      })
      .catch((error) => {
        if (error.response) {
          dispatchError(`ERROR: ${error.response.data.message}`)
          setTimeout(() => dispatchError(null), 3000)
        }
      })
  }

  const postUser = async (formData, initState) => {
    dispatchLoading(true)

    await axios
    .get(`${env.API_URL}/token`)
    .then((res) => {
      
      const config = {
        headers: {
          Token: res.data.token
        }
      }

      axios.post(`${env.API_URL}/users`, formData, config)
        .then(() => {
          getAllUsers(state.page)
          initState()
        })
        .catch((error) => {
          if (error.response) {
            dispatchError(`ERROR: ${error.response.data.message}`)
            setTimeout(() => dispatchError(null), 5000)
          }
      })

    })
    .catch((error) => {
      if (error.response) {
        dispatchError(`ERROR: ${error.response.data.message}`)
        setTimeout(() => dispatchError(null), 3000)
      }
    })

    dispatchLoading(false)
  }

  return (
    <AppContext.Provider
      value={{
        loading: state.loading,
        errorMsg: state.errorMsg,

        page: state.page,
        totalPage: state.totalPage,
        positions: state.positions,

        allUsers: state.allUsers,
        user: state.user,

        getPositions,
        changePage,
        getAllUsers,
        postUser,
        dispatchError,
        dispatchLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
