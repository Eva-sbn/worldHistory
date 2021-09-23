const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  data: JSON.parse(localStorage.getItem("data")),
  token: localStorage.getItem("token")
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case "clear/user/rejected":
      return {
        ...state,
        signingUp: false,
        signingIn: false,
        error: null,
        data: null,
        token: null
      }
    case "user/create/pending":
      return {
        ...state,
        signingUp: true,
        signingIn: false,
        token: null
      }
    case "user/login/pending":
      return {
        ...state,
        signingIn: true,
        token: action.payload.json.token,
        data: action.payload.json.candidate

      }
    default:
      return state;
  }
}

//thunk

export const doLogin = (login, password) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await res.json()

    localStorage.setItem("token", json.token)
    localStorage.setItem("data", JSON.stringify(json.candidate))

    dispatch({type: "user/login/pending", payload: { json } })
  }
}


export const auth = (firstName, lastName, login, password) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({firstName, lastName, login, password}),
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await res.json()

    dispatch({type: "user/create/pending", payload: { json }})
  }
}

