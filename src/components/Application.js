import React, { useState,useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:"Sylvia Palmer"
    }
  },
  {
    id: 3,
    time: "13pm",
    interview: {
      student: "John Anthony",
      interviewer: "Tori Malcolm"
    }
  },
  {
    id: 4,
    time: "12pm",
    interview: {
      student: "Melissa",
      interviewer: "Mildred Nazir"
    }
  }
];

const appointmentList = appointments.map((appointment) => (
  <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
));

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysUrl ="http://localhost:8001/api/days";
    axios.get(daysUrl)
    .then(response => {
      setDays(response.data)
  }
    )
}, [])

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
          <DayList days={days} day={day} setDay={setDay} />
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
