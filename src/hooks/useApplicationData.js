import { useState, useEffect } from "react";
import axios from 'axios';

export default function useVisualMode() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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

  function getDay(appointmentId) {
    //console.log(state.days.filter(day => day.appointments.includes(appointmentId))[0]);
    return state.days.filter(day => day.appointments.includes(appointmentId))[0]
  }


  function bookInterview(id, interview) {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = getDay(id)
    let newDay = {
      ...day,
      spots: day.spots - 1
    }
    let newDays = state.days

    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].id === newDay.id) {
        newDays.splice(i, 1, newDay)
      }
    }

    return (
      axios.put("/api/appointments/" + id, {
        interview
      }).then((response) => {
        //console.log(`day: ${JSON.stringify(newDays)}`)
        setState({
          ...state,
          appointments,
          days: newDays
        });
      })
    )
  };

  

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id]
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = getDay(id)
    let newDay = {
      ...day,
      spots: day.spots + 1
    }
    let newDays = state.days

    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].id === newDay.id) {
        newDays.splice(i, 1, newDay)
      }
    }

    return (
      axios.delete("/api/appointments/" + id, {
        interview
      }).then((response) => {
        //console.log(`day: ${JSON.stringify(newDays)}`)
        setState({
          ...state,
          appointments,
          days: newDays
        });
      })
    )
  };


  const editInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put("/api/appointments/" + id, {
        interview
      }).then((response) => {
        //console.log(`day: ${JSON.stringify(newDays)}`)
        setState({
          ...state,
          appointments
        });
      })
    )
  };
  return  { state, setDay, bookInterview, cancelInterview,editInterview };
} 