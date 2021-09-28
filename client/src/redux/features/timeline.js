const initialState = {
  addTimeLine: false,
  loadTimeline: []
}

export default function timeLineReducer (state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}


//thunk



export const reqServer = (name, text) => {
  return async dispatch => {
    const res = await fetch("http://localhost:4000/timeLine", {
      method: "POST",
      body: JSON.stringify({
        title: name,
        description: text,
        img: "https://app2top.ru/wp-content/uploads/2021/01/ubisoft-starwars.jpg"
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