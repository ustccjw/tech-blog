import { dataModel } from '../../model'

export const loadProps = async params => {
	try {
		const resume = await dataModel.getValue([ 'resume' ])
	} catch (err) {
		console.error(err)
	}
	return { resume }
}
