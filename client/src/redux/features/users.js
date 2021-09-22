const initialState = {
  userData: {},
  signIn: false,
  error: null,
  token: localStorage.getItem("token")
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case "user/signIn/fulfilled":
      return {
        ...state,
        error: action.error
      }
    case "users/signIn/pending":
      return {
        ...state,
        signIn: true,
        token: action.payload
      }


    case "user/singUp/fulfilled":
      return {
        ...state,
        error: action.payload
      }
    case "user/singUp/pending":
      return {
        ...state,
        userData: action.payload.json
      }
    default:
      return state;
  }
}

//thunk

export const handleSignUp = (login, password, firstName, lastName) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({ login, password, firstName, lastName }),
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await res.json()

    if(!json.error) {
      dispatch({type: "user/singUp/pending", payload: json})
    }else {
      dispatch({type: "user/singUp/fulfilled", error: json.error})
    }
  }
}

export const handleSignIn = (login, password) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        "Content-type": "application/json",
      }
    })
    const json = await res.json()

    if (!json.error) {
      dispatch({type: "users/signIn/pending", payload: { json }})
      localStorage.setItem("token", json.token)
    } else {
      dispatch({type: "user/signIn/fulfilled", error: json.error})
    }
  }
}

