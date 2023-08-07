import React from 'react'

export default function Alert(props) {
  const capitalize = (word) => {
    if(word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{height: '50px'}}>
      {//(as in start alert is null)if props.alert is true then only the statement will be evaluated or else it will be considered false
      props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>}
    </div>
    )
}