import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createEvent } from '../../redux/features/event'

function CreateEvent () {
  const [title, setTitle] = useState();
  const [image, setTImage] = useState()
  const [priority, setPriority] = useState()
  const [timelineId, setTimelineId] = useState()
  const dispatch = useDispatch()
  const history = useHistory()
  
  return (
    <div>
      <h1>Страница для создания Евента</h1>
      <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder={"title"}/><br/>
      <input onChange={(e) => setTImage(e.target.value)} type="text" placeholder={"img"}/><br/>
      <input onChange={(e) => setPriority(e.target.value)} type="text" placeholder={"Priority"}/><br/>
      <input onChange={(e) => setTimelineId(e.target.value)} type="text" placeholder={"timelineId"}/>
      <button
        onClick={() => dispatch(createEvent(title, image, priority, timelineId, history))
      }>Создать</button>
    </div>
  )
}

export default CreateEvent