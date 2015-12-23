import { dataModel } from '../../model'

export const loadProps = async params => {
	const resume = await dataModel.getValue([ 'resume' ])
	return { resume }
}
