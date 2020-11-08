import { useState, useEffect } from "react";
import axios from "axios";

export default function useVisualMode() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
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
    return state.days.filter((day) =>
      day.appointments.includes(appointmentId)
    )[0];
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Decrement spots
    const days = [...state.days];
    for (let dayIndex in days) {
      let day = days[dayIndex];
      if (day.appointments.includes(id)) {
        const newDay = { ...day, spots: day.spots - 1 };
        days[dayIndex] = newDay;
      }
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Increment spots
    const days = [...state.days];
    for (let dayIndex in days) {
      let day = days[dayIndex];
      if (day.appointments.includes(id)) {
        const newDay = { ...day, spots: day.spots + 1 };
        days[dayIndex] = newDay;
      }
    }

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put("/api/appointments/" + id, { interview })
      .then((response) => {
        //console.log(`day: ${JSON.stringify(newDays)}`)
        setState({
          ...state,
          appointments,
        });
      });
  };
  return { state, setDay, bookInterview, cancelInterview, editInterview };
}
