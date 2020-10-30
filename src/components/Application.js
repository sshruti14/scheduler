import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay,getInterview } from '../helpers/selectors.js';

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:"Sylvia Palmer"
//     }
//   },
//   {
//     id: 3,
//     time: "13pm",
//     interview: {
//       student: "John Anthony",
//       interviewer: "Tori Malcolm"
//     }
//   },
//   {
//     id: 4,
//     time: "12pm",
//     interview: {
//       student: "Melissa",
//       interviewer: "Mildred Nazir"
//     }
//   }
// ];

export default function Application(props) {
  //Combining the individual states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });


  const setDay = (day) => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    const daysUrl = "http://localhost:8001/api/days";

    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

    //Add the line below:
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    


  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
