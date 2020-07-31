import React, {useReducer} from "react";

const counterTypes = {INCREASE: 'counter/INCREASE', DECREASE: 'counter/DECREASE'}
const counterIncrease = action => ({type: counterTypes.INCREASE, payload: action.payload + 1})
const counterDecrease = action => ({type: counterTypes.DECREASE, payload: action.payload - 1})
const counterReducer = (state, action) => {
	switch (action.type) {
		case counterTypes.INCREASE: return {...state, payload: action.payload}
		default: return state
	}
const Counter = () => {
		const [count, dispatch] = useReducer(counterReducer, {payload: 0})

		return <>
		<h1>{count}</h1>
			<div>
				<button onClick={()=>dispatch({type: counterTypes.INCREASE})}>+1</button>
				<button onClick={()=>dispatch({type: counterTypes.DECREASE})}>-1</button>
			</div>
		</>
}
}