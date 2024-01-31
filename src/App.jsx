import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Operator from './components/Operator'

export const ACTIONS = {
  ADD_DIGIT: 'add_digit',
  ADD_OPERATOR: 'add_operator',
  EVAL: 'eval',
  ALL_CLEAR: 'all_clear',
  DEL: 'del'
};


function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overWrite){
        return {currentOperand: action.payload.digit,
                overWrite: false}
      }
    if(action.payload.digit === "0" && state.currentOperand === "0"){
      return state
    }

    if(action.payload.digit == "." && (state.currentOperand || "").includes(".")){
      return state
    }
    return{
      ...state,
      currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
    }
  case ACTIONS.ADD_OPERATOR:
    if(state.currentOperand == null && state.previousOperand == null){
      return state
    }

    if(state.currentOperand == null){
      return {
        ...state,
        operator: action.payload.operator
      }
    }

    if(state.previousOperand == null){
      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: null,
        operator: action.payload.operator
      }
    }

    return {
      ...state,
      previousOperand: evaluate(state),
      operator: action.payload.operator,
      currentOperand: null
    }

  case ACTIONS.DEL:
    if(state.overWrite){
      return{
        ...state,
        overWrite:false,
        currentOperand: null
      }
    }
    if (state.currentOperand == null) return state
    if (state.currentOperand.length == 1) {
      return {...state, currentOperand: null}
    }
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1)
    }

  case ACTIONS.EVAL:
    if(
      state.operator == null ||
      state.currentOperand == null ||
      state.previousOperand == null 
    ){
      return state
    }

    return {
      ...state,
      overWrite: true,
      previousOperand:null,
      operator : null,
      currentOperand :evaluate(state)
    }

  case ACTIONS.ALL_CLEAR:
    return {
      ...state,
      currentOperand:null,
      previousOperand:null,
      operator:null
    }

  }

}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
   maximumFractionDigits: 0,
})

function formatOperand (operand){
if (operand == null) return
const [integer, decimal] = operand.split(".")
if (decimal == null) return INTEGER_FORMATTER.format(integer)
return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate(state){
  const {previousOperand, currentOperand, operator} = state
  const [previous, current] = [
    parseFloat(previousOperand) || 0,
    parseFloat(currentOperand) || 0
  ];
  
  let computation = ""
  switch(operator){
    case "+":
      computation =  previous + current
      break
    case "-":
      computation =  previous - current
      break
      case "*":
      computation =  previous * current
      break
      case "/":
      computation =  previous / current
      break
  }
  return computation.toString() 
}

function App() {

  const [state, dispatch] = useReducer(reducer, {previousOperand: null, currentOperand: null, operator: null, overWrite: false})

  useEffect(() => {
    console.log(state)
  })


  return (

    <div className='root2'>
      <div className='display'>
        <div>{formatOperand(state.previousOperand)} {state.operator}</div>
        <div>{formatOperand(state.currentOperand)} </div>
      </div>
      <div className='calBody'>
      <div className='calc'>
      <button className='number span_two'
        onClick={() => dispatch({type: ACTIONS.ALL_CLEAR})}
        >
        AC
    </button>
    <button className='number'

        onClick={() => dispatch({type: ACTIONS.DEL})}
        >
        DEL
    </button>
      <Operator operator="+" dispatch={dispatch} />
      <Button digit="1" dispatch={dispatch} />
      <Button digit="2" dispatch={dispatch} />
      <Button digit="3" dispatch={dispatch} />
      <Operator operator="-" dispatch={dispatch} />
      <Button digit="4" dispatch={dispatch} />
      <Button digit="5" dispatch={dispatch} />
      <Button digit="6" dispatch={dispatch} />
      <Operator operator="*" dispatch={dispatch} />
      <Button digit="7" dispatch={dispatch} />
      <Button digit="8" dispatch={dispatch} />
      <Button digit="9" dispatch={dispatch} />
      <Operator operator="/" dispatch={dispatch} />
      <Button digit="0" dispatch={dispatch} />
      <Button digit="." dispatch={dispatch} />
      <button className='number span_two'
        onClick={() => dispatch({type: ACTIONS.EVAL})}
        >
        =
    </button>
      </div>
      </div>
    </div>
  )
}

export default App
