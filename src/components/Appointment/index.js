import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode  from "hooks/useVisualMode";
import Form from './Form';


export default function Appointment(props) {
  console.log(props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //Defining the state
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Transition to create mode on click of Add button
  const add = () => transition(CREATE);

   // Exit confirm prompt
   const cancel = () => back();

  return (
    <article className="appointment">
      <Header time={props.time} />
     
      {mode === EMPTY && <Empty onAdd={add} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={cancel}
          
          />
      )}

    </article>
  );
}
