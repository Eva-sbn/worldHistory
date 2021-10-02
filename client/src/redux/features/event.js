const initialState = {
  event: [],
  error: null
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "load/events/rejected":
      return {
        ...state,
        error: action.error
      }
    case "load/events/pending":
      return {
        ...state,
        event: action.payload
      }
    default:
      return state
  }
}



export const loadEvents = (id) => {
  return async dispatch => {
    const res = await fetch(`http://localhost:4000/events/${id}`)
    const json = await res.json()

    if(!json.error) {
      dispatch({type: "load/events/pending", payload: json})
    } else {
      dispatch({type: "load/events/rejected", error: json.error})
    }
  }
}