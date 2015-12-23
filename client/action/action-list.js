// action 按照 route component 划分

import { uiModel } from '../../model'

export const jumpPage = async page => {
	await uiModel.setValue(['articleList', 'page'], page)
	global.reload()
}
