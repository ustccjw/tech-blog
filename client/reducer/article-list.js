import { default as Immutable, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { AL_SETPAGE } from '../constant/action-type'

const initialState = fromJS({
	page: 1,
})

export default handleActions({
	[AL_SETPAGE]: (state, action) =>
		state.set('page', fromJS(action.payload)),
}, initialState)
