import { dataModel } from '../../model'

export const loadProps = async () => {
	const resume = await dataModel.getValue(['resume'])
	return { resume }
}
