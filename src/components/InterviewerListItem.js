import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss";

export default function InterviewListItem(props) {


  const interviewClass = classNames(
    "interviewers__item",
    {
    "interviewers__item--selected": props.selected,
    "interviewers__item--full": props.spots === 0
  });

  return (
    <li className={interviewClass} onClick={() => props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
       {props.selected && props.name}
    </li>
  );
}
