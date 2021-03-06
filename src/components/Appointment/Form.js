import React,{useState} from 'react'
import InterviewerList from "components/InterviewerList.js"
import Button from "components/Button.js"

export default function Form(props){
  console.log('Form'+props);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  
  const reset = function () {
    setName("");
    setInterviewer("");
  }
  function validate() {
    console.log('Inside validate'+ interviewer === null);
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(interviewer === null){
      setError("Interviewer name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return(
    
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} value={interviewer} setInterviewer={setInterviewer}  />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => props.onCancel(reset())}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}