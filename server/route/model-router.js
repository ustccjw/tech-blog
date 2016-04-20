import falcor from 'falcor'
import Router from 'falcor-router'
import { Article, Resume } from '../model'
import { getObjectByKeys } from '../../util'

const { ref: $ref } = falcor.Model

const BaseRouter = Router.createClass([{
	route: 'articles[{ranges:indexRanges}][{keys:props}]',
	get: async pathSet => {
		const result = []
		const tasks = pathSet.indexRanges.map(({ from, to }) =>
			Article.get(from, to).then(articles => articles.
				map(article => JSON.parse(article)).
				forEach((article, index) => {
					result.push({
						path: ['articleByNumber', article.number],
						value: getObjectByKeys(article, pathSet.props),
					})
					result.push({
						path: ['articles', from + index],
						value: $ref(['articleByNumber', article.number]),
					})
				})
			)
		)
		await Promise.all(tasks)
		return result
	},
}, {
	route: 'articles.length',
	get: async () => {
		const len = await Article.getLength()
		return {
			path: ['articles', 'length'],
			value: len,
		}
	},
}, {
	route: 'articleByNumber[{integers:numbers}][{keys:props}]',
	get: async pathSet => {
		const number = pathSet.numbers[0]
		const articles = await Article.getByNumber(number)
		const article = JSON.parse(articles[0])
		return {
			path: ['articleByNumber', number],
			value: getObjectByKeys(article, pathSet.props),
		}
	},
}, {
	route: 'resume',
	get: async () => {
		const resume = await Resume.get()
		return {
			path: ['resume'],
			value: resume,
		}
	},
}])

export default class ModelRouter extends BaseRouter {
	constructor(key = null) {
		super()
		this.key = key
	}
}
