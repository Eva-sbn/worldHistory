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
    const classes = useStyles();
    const dispatch = useDispatch();

    const { loadTimeline, loading } = useSelector((store) => store.timeline);

    const data = useSelector(state => state.users.data)

    return (
        <>
            <Grid className={classes.main}>
                <Grid container className={classes.img}>

                </Grid>
                <Timeline position="alternate">
                    {loading ? (
                        <h3>Идет загрузка...</h3>
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
                                        {item.timeId}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot >
                                            <img src={`http://localhost:4000/${item.img}`} className={classes.avatar} />
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

export default EventPage;