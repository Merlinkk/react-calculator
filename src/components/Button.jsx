import React from 'react'
import { ACTIONS } from '../App'

function Button({dispatch, digit}) {
  return (
    <button className='number'
        onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}
        >
        {digit}
    </button>
  )
}

export default Button