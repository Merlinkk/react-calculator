import React from 'react'
import { ACTIONS } from '../App'

function Button({dispatch, operator}) {
  return (
    <button className='number'
        onClick={() => dispatch({type: ACTIONS.ADD_OPERATOR, payload: {operator}})}
        >
        {operator}
    </button>
  )
}

export default Button