import { dataModel } from '../../model'

export const loadProps = async (params, location) => {
	const resume = await dataModel.getValue([ 'resume' ])
	return { resume }
}
