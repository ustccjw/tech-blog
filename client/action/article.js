import { dataModel } from '../../model'

export const loadProps = async params => {
	const { number } = params
	const content = await dataModel.getValue(['articleByNumber', number, 'content'])
	const article = { content }
	return { article }
}
