import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTimeline, removeTimeLine } from '../../redux/features/timeline'
import {Button} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';




function Main() {
  const data = useSelector(state => state.users.data)


  const { loadTimeline } = useSelector(state => state.timeline)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(loadingTimeline())
  }, [])

  const handleRemoveTimeLine = (id) => {
    dispatch(removeTimeLine(id))
  }


  return (
    <div style={{textAlign: "center"}}>
      <h1>Страница где будет выводиться таймлайн</h1>
      <hr/>
      {data ? <Link className={"timeline__button"} to={"/createTimeLine"}>Создать ТаймЛайн?</Link> :
          <p>Войдите в систему чтобы добавлять ТаймЛайн</p>}

    
      {loadTimeline.map((item) => {
        return (
          <>
            <Link to={`/timeline/${item._id}`}>{item.title}</Link>
            <img style={{width: "500px", height: "400px"}} src={`http://localhost:4000/${item.img}`} alt=""/>
            <p>{item.description}</p>
            <p>{item.data}</p>
            <Button variant="outlined"  onClick={() =>handleRemoveTimeLine(item._id)} startIcon={<DeleteIcon />}>Удалить</Button>
          </>
        )
      })}
    </div>
  );
}

export default Main;