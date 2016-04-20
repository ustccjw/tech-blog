import { dataModel, uiModel } from '../../model'
import { PAGE_SIZE } from '../config'

export const loadProps = async () => {
	const page = await uiModel.getValue(['articleList', 'page'])
	const from = (page - 1) * PAGE_SIZE
	const to = from + PAGE_SIZE - 1
	const response = await dataModel.get(['articles', { from, to }, ['number', 'introduction']],
		['articles', 'length'])
	const { articles } = response.json
	const length = articles.length
	delete articles.$__path
	delete articles.length
	const totalPages = Math.ceil(length / PAGE_SIZE)
	return { articles, page, totalPages }
}

export const jumpPage = async page => {
	await uiModel.setValue(['articleList', 'page'], page)
	return global.reload('article-list: jumpPage', page)
}
