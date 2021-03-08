
import React, { useState } from 'react'

const initInputs = {
  issue: "",
  comment: ""
}

export default function TodoForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addTodo } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addTodo(inputs)
    setInputs(initInputs)
  }

  const { issue, comment } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="issue" 
        value={issue} 
        onChange={handleChange} 
        placeholder="Issue"/>
      <input 
        type="text" 
        name="comment" 
        value={comment} 
        onChange={handleChange} 
        placeholder="Comment"/>
      <button>Add Todo</button>
    </form>
  )
}