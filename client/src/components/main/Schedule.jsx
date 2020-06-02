import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

import NavigationBar from '../navigation/AppBar';
import getPer from "../../functions/timeDifference";
import { time, table } from "../../constants/Table";
import ScheduleCard from "../cards/ScheduleCard";

var today = new Date();

const NoSchedule = {
  subject: "No schedule",
  time: "for this time ",
  per: 0
}

export default function Schedule() {
  const [per, setPer] = useState([
    {
      when: "now",
      ...NoSchedule
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

  let timeString;
  if (today.getMinutes() < 10) {
    timeString = Number(today.getHours() + ".0" + today.getMinutes());
  }
  else {
    timeString = Number(today.getHours() + "." + today.getMinutes());
  }
  function find(value, ind) {
    if (today.getDay() === 0 || today.getDay() === 6) {
      return;
    } else if (timeString < 9) {
      setPer([
        {
          when: "now",
          ...NoSchedule
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
    } else if (timeString > 16.3) {
      if (today.getDay() === 5) {
        return;
      }
      setPer([
        {
          when: "now",
          ...NoSchedule
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
    if (timeString >= value.start && timeString <= value.end) {
      setCrtsubject(ind);
      return;
    }
  }

  const setCrtsubject = async (ind) => {
    let per = await getPer(time[ind]);
    console.log(per);
    if (ind === 7 && today.getDay() === 5) {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per,
          progress: per
        },
        {
          when: "next",
          ...NoSchedule
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
          per: time[ind].per,
          progress: per
        },
        {
          when: "next",
          ...NoSchedule
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
          per: time[ind].per,
          progress: per
        },
        {
          when: "next",
          subject: table[today.getDay() - 1][ind + 1],
          time: time[ind + 1].start + " to " + time[ind + 1].end,
          per: time[ind].per + 1
        },
        {
          when: "later",
          ...NoSchedule
        }
      ]);
    } else {
      setPer([
        {
          when: "now",
          subject: table[today.getDay() - 1][ind],
          time: time[ind].start + " to " + time[ind].end,
          per: time[ind].per,
          progress: per
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

  function renderSchedules(SCHEDULE, ind) {
    return (
      <ScheduleCard key={ind}
        when={SCHEDULE.when}
        subject={SCHEDULE.subject}
        time={SCHEDULE.time}
        progress={SCHEDULE.progress}
        per={SCHEDULE.per}
      />
    );
  }

  return (
    <React.Fragment>
      <NavigationBar title="Time Table" />
      <Container maxWidth="xl" style={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          {per.map(renderSchedules)}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
