import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTimeline } from '../../redux/features/timeline';




function Main() {
  const data = useSelector(state => state.users.data)


  const loadTimeline = useSelector(state => state.timeline.loadTimeline)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadingTimeline())
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <h1>Страница где будет выводиться таймлайн</h1>
      <hr/>

      {data ? <Link className={"timeline__button"} to={"/createTimeLine"}>Создать ТаймЛайн?</Link> :
      <p>Войдите в систему чтобы добавлять ТаймЛайн</p>
      }

    {/*  вывод всех таймлайнов*/}
    </div>
  );
}

export default Main;