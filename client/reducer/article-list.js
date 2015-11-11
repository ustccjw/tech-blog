import { default as Immutable, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { AL_SETINDEX } from '../constant/action-type'

const initialState = fromJS({
	index: 1,
})

export default handleActions({
	[AL_SETINDEX]: (state, action) =>
		state.set(index, fromJS(action.payload)),
}, initialState)
