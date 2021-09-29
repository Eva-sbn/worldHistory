import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import timeline, { getTimeline } from "../../redux/features/timeline";
import { useEffect } from "react";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: "500px",
    backgroundImage: `url(${"https://st2.depositphotos.com/1446528/6350/i/600/depositphotos_63506505-stock-photo-flag-of-chechnya-with-rain.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  },
  main: {
    background: "transparent"
  }
}))


export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loadTimeline, loading } = useSelector((store) => store.timeline);

  const data = useSelector(state => state.users.data)

  useEffect(() => {
    dispatch(getTimeline());
  }, [dispatch]);


  return (
    <>
      <Grid container className={classes.main}>
        <Grid container className={classes.img}>

        </Grid>
        <Timeline position="alternate">
          {/*{data ? <Link className={"timeline__button"} to={"/createTimeLine"}>Создать ТаймЛайн?</Link> :*/}
          {/*    <p>Войдите в систему чтобы добавлять ТаймЛайн</p>*/}
          {/*}*/}
          {loading ? (
            <h1>Идет загрузка...</h1>
          ) : (
            loadTimeline.map((item) => (
              <>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="success"
                  >
                    {item.timeId}  здесь будет выводиться дата
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {item.title}
                    </Typography>
                    <Typography>
                      {item.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </>
            ))
          )}
        </Timeline>
      </Grid>
    </>
  );
}