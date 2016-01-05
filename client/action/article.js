import { dataModel } from '../../model'

export const loadProps = async params => {
	try {
		const { number } = params
		const content = await dataModel.getValue([ 'articleByNumber', number,
			'content' ])
		const article = { content }
	} catch (err) {
		console.error(err)
	}
	return { article }
}
