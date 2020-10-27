import React from "react";
import "components/InterviewList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log(props.interviewer);
  const interviewLists = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      onChange={() => props.onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewLists}</ul>
    </section>
  );
}
