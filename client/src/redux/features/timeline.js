const initialState = {
  addTimeLine: false,
  loadTimeline: [],
  images: null,
  error: null
}

export default function timeLineReducer (state = initialState, action) {
  switch (action.type) {
    case "timeLine/delete/fulfilled":
      return {
        ...state,
        loadTimeline: state.loadTimeline.filter((item) => {
          return item._id !== action.payload.id
        })
      }

    // загружаем изображение
    case "timeline/upload/pending":
      return {
        ...state,
        images: action.payload
      }
    // ?помещаем ошибку в ключ error
    case "timeline/upload/rejected":
      return {
        ...state,
        error: action.error
      }


    // загружаем таймлайн
    case "load/timeline/fulfilled":
      return {
        ...state,
        loadTimeline: action.payload
      }
      // ?помещаем ошибку в ключ error
    case "load/timeline/rejected":
      return {
        ...state,
        error: action.error
      }


    // создание таймлайна
    case "timeline/load/fulfilled":
      return {
        ...state,
        addTimeLine: true
      }
      // ?помещаем ошибку в ключ error
    case "timeline/load/rejected":
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}


//thunk


export const addImage = (e) => {
  return async (dispatch) => {
    const { files } = e.target
    const data = new FormData()
    data.append("image", files[0])
    const response = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }
    })
    const json = await response.json()

    if(!json.error) {
      dispatch({type: "timeline/upload/pending", payload: json.image})
    } else {
      dispatch({type: "timeline/upload/rejected", error: json.error})
    }
  }
}



export const reqServer = (name, text) => {
  return async (dispatch, getState) => {
    const state = getState()
    const res = await fetch("http://localhost:4000/timeLine", {
      method: "POST",
      body: JSON.stringify({
        title: name,
        description: text,
        img: state.timeline.images
      }),
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const json = await res.json()
    if(!json.error) {
      dispatch({type: "timeline/load/fulfilled"})
    } else {
      dispatch({type: {type: "timeline/load/rejected", error: json.error}})
    }
  }
}



export const loadingTimeline = () => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/timeLine")
    const json = await res.json()

    if (!json.error) {
      dispatch({ type: "load/timeline/fulfilled", payload: json })
    } else {
      dispatch({ type: "load/timeline/rejected", error: json.error })
    }
  }
}

export const removeTimeLine = (id) => {
  return async dispatch => {
    const res = await fetch(`http://localhost:4000/timeLine/${id}`, {
      method: "DELETE"
    })
    const json = await res.json()
    if (!json.error) {
      dispatch ({type: "timeLine/delete/fulfilled", payload: { id }})
    }


  }
}