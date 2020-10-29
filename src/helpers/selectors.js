export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(oneDay => oneDay.name === day);
  let appoArray = [];
  let finalArray = [];
  filteredDays.forEach(element => {
    appoArray = element.appointments;
  })
  appoArray.forEach(currElement => {
    for (const appointmentEntry in state.appointments) {
      if (state.appointments[appointmentEntry].id === currElement) {
        finalArray.push(state.appointments[appointmentEntry]);
      };
    }
  })
  return finalArray;
}