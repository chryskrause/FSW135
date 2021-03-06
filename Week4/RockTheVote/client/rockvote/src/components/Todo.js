import React from 'react'

export default function Todo(props){
  const { issue, comment, _id } = props
  return (
    <div className="todo">
      <h1>{ issue }</h1>
      <h3>{ comment }</h3>
    </div>
  )
}