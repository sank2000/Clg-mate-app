import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { time, table } from "../../constants/Table";
import NavigationBar from '../navigation/AppBar';
import Grid from '@material-ui/core/Grid';

import ScheduleCard from "../cards/ScheduleCard";


var today = new Date();


export default function Schedule() {
  const [per, setPer] = useState([
    {
      when: "now",
      subject: "No schedule",
      time: "for this time ",
      per: 0
    },
    {
      when: "next",
      subject: table[0][0],
      time: time[0].start + " to " + time[0].end,
      per: time[0].per
    },
    {
      when: "later",
      subject: table[0][1],
      time: time[1].start + " to " + time[1].end,
      per: time[1].per
    }
  ]);
  let tym = Number(today.getHours() + "." + today.getMinutes());

  function find(value, ind) {
    if (today.getDay() === 0 || today.getDay() === 6) {
      return;
    } else if (tym < 9) {
      setPer([
        {
          when: "now",
          subject: "No schedule",
          time: "for this time ",
          per: 0
        },
        {
          when: "next",
          subject: table[today.getDay() - 1][0],
          time: time[0].start + " to " + time[0].end,
          per: time[0].per
        },
        {
          when: "later",
          subject: table[today.getDay() - 1][1],
          time: time[1].start + " to " + time[1].end,
          per: time[1].per
        }
      ]);
      return;
    } else if (tym > 16.3) {
      if (today.getDay() === 5) {
        return;
      }
      setPer([
        {
          when: "now",
          subject: "No schedule",
          time: "for this time ",
          per: 0
        },
        {
          when: "next",
          subject: table[today.getDay()][0],
          time: time[0].start + " to " + time[0].end,
          per: time[0].per
        },
        {
          when: "later",
          subject: table[today.getDay()][1],
          time: time[1].start + " to " + time[1].end,
          per: time[1].per
        }
      ]);
      return;
    }
    if (tym >= value.start && tym <= value.end) {
      setCrtsubject(ind);
      return;
    }
  }

  function setCrtsubject(ind) {
    if (ind === 7 && today.getDay() === 5) {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per
        },
        {
          when: "next",
          subject: "No schedule",
          time: "for this time ",
          per: 0
        },
        {
          when: "later",
          subject: table[0][0],
          time: time[0].start + " to " + time[0].end,
          per: time[0].per
        }
      ]);
    } else if (ind === 7) {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per
        },
        {
          when: "next",
          subject: "No schedule",
          time: "for this time ",
          per: 0
        },
        {
          when: "later",
          subject: table[today.getDay()][0],
          time: time[0].start + " to " + time[0].end,
          per: time[0].per
        }
      ]);
    } else if (ind === 6) {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per
        },
        {
          when: "next",
          subject: table[today.getDay() - 1][ind + 1],
          time: time[ind + 1].start + " to " + time[ind + 1].end,
          per: time[ind].per + 1
        },
        {
          when: "later",
          subject: "No schedule",
          time: "for this time",
          per: 0
        }
      ]);
    } else {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per
        },
        {
          when: "next",
          subject: table[today.getDay() - 1][ind + 1],
          time: time[ind + 1].start + " to " + time[ind + 1].end,
          per: time[ind].per + 1
        },
        {
          when: "later",
          subject: table[today.getDay() - 1][ind + 2],
          time: time[ind + 2].start + " to " + time[ind + 2].end,
          per: time[ind].per + 2
        }
      ]);
    }
  }

  useEffect(() => {
    time.forEach(find);
    // eslint-disable-next-line
  }, []);

  function renderSchedules(SCHEDULE) {
    return (
      <ScheduleCard
        when={SCHEDULE.when}
        subject={SCHEDULE.subject}
        time={SCHEDULE.time}
        progress={SCHEDULE.progress}
      />
    );
  }

  return (
    <React.Fragment>
      <NavigationBar title="Time Table" />
      <h1>Schedule</h1>
      <Grid container spacing={2}>
        {per.map(renderSchedules)}
      </Grid>
    </React.Fragment>
  );
}
