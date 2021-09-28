import React, { useState } from 'react';
import "../../style/style.css"
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import { addImage, reqServer } from '../../redux/features/timeline';
import { Button, Input } from '@material-ui/core';

function CreateTimeLine() {
  const [timeLine, setTimeLine] = useState()
  const [textTimeLine, setTextTimeLine] = useState()
  const dispatch = useDispatch()
  const history = useHistory()

  const sendToServ = () => {
    dispatch(reqServer(timeLine, textTimeLine))
    history.push("/")
  }

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  }


  return (
    <div>
      <h1 style={{textAlign: "center"}}>Страница для создания TimeLine</h1>
      <hr/>
      <hr/>
      <div className="block__timeline">
        <form className={"form"} action="#">
          <p className={"form__title"}><b>Введите Название таймлайна:</b></p>
          <input onChange={(e) => setTimeLine(e.target.value)} className={"form__input"} type="text" placeholder={"Таймлайн"}/><br/>
          <p className={"form__title"}><b>Введите Текст:</b></p>
          <p><textarea onChange={(e) => setTextTimeLine(e.target.value)} className={"form__text"} rows="8" cols="80" name="text"/></p>
          <p><input onClick={sendToServ} className={"form__button"} type="submit" value="Отправить"/></p>
          <Input type="file" onChange={handleAddImage}/>
        </form>
      </div>
      <hr/>

    </div>
  );
}

export default CreateTimeLine;