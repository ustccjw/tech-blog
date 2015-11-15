import { default as Immutable, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { AL_SETINDEX } from '../constant/action-type'

const initialState = fromJS({
	page: 1,
})

export default handleActions({
	[AL_SETINDEX]: (state, action) =>
		state.set('page', fromJS(action.payload)),
}, initialState)
