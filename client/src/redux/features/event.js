const initialState = {
  event: [],
  error: null
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "create/event/rejected":
      return {
        ...state,
        error: action.error
      }
    case "create/event/fulfilled":
      return {
        ...state,
        event: [...state.event, action.payload]
      }
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

export const createEvent = (title, image, priority, timelineId, history) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/events", {
      method: "POST",
      body: JSON.stringify({title, image, priority, timelineId}),
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await res.json()
    if(!json.error) {
      dispatch({type: "create/event/fulfilled", payload: json})
      history.push("/")
    } else {
      dispatch({type: "create/event/rejected", error: json.error})
    }
  }
}