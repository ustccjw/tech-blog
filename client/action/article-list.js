// action 按照 route component 划分

import { dataModel, uiModel } from '../../model'
import { PAGE_SIZE } from '../config'

export const jumpPage = async page => {
	await uiModel.setValue([ 'articleList', 'page' ], page)
	global.reload()
}

export const loadProps = async params => {
	const page = await uiModel.getValue([ 'articleList', 'page' ])
	const from = (page - 1) * PAGE_SIZE
	const to = from + PAGE_SIZE - 1
	const response = await dataModel.get([ 'articles', { from, to },
		[ 'number', 'introduction' ] ], [ 'articles', 'length' ])
	const { articles } = response.json
	const length = articles.length
	delete articles.length
	const totalPages = Math.ceil(length / PAGE_SIZE)
	return { articles, page, totalPages }
}
