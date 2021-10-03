import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import { loadEvents } from '../../redux/features/event'
import { Link, useParams } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: "500px",
        backgroundImage: `url(${"https://doseng.org/uploads/posts/2015-01/1421209745_0_e8bca_4522740a_orig.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
    },
    main: {
        background: "#90EE90"
    },
    avatar: {
        borderRadius: "50%",
        width:90,
        height:80,
    }
}))

function EventPage() {
    const { id } = useParams()
    const event = useSelector(state => state.event.event)
    const [modalActive, setModalActive] = useState(false)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadEvents(id))
    }, [])
    return (
        <>
            <Grid className={classes.main}>
                <Grid container className={classes.img}>

                </Grid>
                <Link to={"/createEvent"}>Создать Событие</Link>
                <Timeline position="alternate">
                    {event.map((item) => {
                        return (
                          <>
                              <TimelineItem>
                                  <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="success"
                                  >
                                      timeId
                                  </TimelineOppositeContent>
                                  <TimelineSeparator>
                                      <TimelineConnector />
                                      <TimelineDot >
                                          <img
                                            src={item.image}
                                            className={classes.avatar}
                                            onClick={() => setModalActive(true)}
                                          />
                                      </TimelineDot>
                                      <TimelineConnector />
                                  </TimelineSeparator>
                                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                                      <Typography variant="h6" component="span">
                                          {item.title}
                                      </Typography>
                                      <Typography>
                                          232434
                                      </Typography>
                                  </TimelineContent>
                              </TimelineItem>
                              <Modal timeline={item.timelineId} active={modalActive} setActive={setModalActive}/>
                          </>
                        )
                    })}
                </Timeline>
            </Grid>
        </>
    );
}

export default EventPage;