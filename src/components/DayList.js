import React  from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props){
 const dayLists =  (props.days).map((day, index) => (
    <DayListItem 
    key={index}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  
  />
 ))
  return(  
  <ul>{dayLists}</ul>
  )
}