import React from "react";
import "components/InterviewList.scss";

import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
 
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
    
  };
  
  
  const interviewLists = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewLists}</ul>
    </section>
  );
}
