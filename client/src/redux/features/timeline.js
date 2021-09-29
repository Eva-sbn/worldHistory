const initialState = {
  addTimeLine: false,
  loading:false,
  loadTimeline: [],
  images: null,
  error: null
}

export default function timeLineReducer (state = initialState, action) {
  switch (action.type) {


    case "timeline/upload/rejected":
      return {
        ...state,
        error: action.error
      }


    case "timeline/upload/pending":
      return {
        ...state,
        images: action.payload
      }


    case "load/timeline/pending":
      return {
        ...state,
        loadTimeline: action.payload.json
      }
    case "timeline/load/pending":
      return {
        ...state,
        addTimeLine: true
      }
    case "timeline/fetch/pending":
      return {...state,loading: true};
    case "timeline/fetch/fulfilled":
      return {...state,loading: false,loadTimeline: action.payload};
    case "timeline/fetch/rejected":
      return {...state,loading: false,error: action.error};

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
    dispatch({type: "timeline/load/pending"})
  }
}

export const loadingTimeline = () => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/timeLine")
    const json = await res.json()

    dispatch({type: "load/timeline/pending", payload: { json }})
  }
}

export const getTimeline= () => {
  return async (dispatch) => {
    dispatch({ type: "timeline/fetch/pending" });

    try {
      const res = await fetch("http://localhost:4000/timeLine");
      const json = await res.json();

      dispatch({ type: "timeline/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "timeline/fetch/rejected", error: e.toString() });
    }
  };
};