// action 按照 route component 划分
// action 最后会触发 reload 完成页面 rerender
// action 是异步的，可以实现 action 执行序列化

import { dataModel, uiModel } from '../../model'
import { PAGE_SIZE } from '../config'

export const jumpPage = async page => {
	try {
		await uiModel.setValue([ 'articleList', 'page' ], page)
	} catch (err) {
		console.error(err)
	}
	return global.reload()
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
