import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'
import { Article, Resume } from '../model'
import { getObjectByKeys } from '../../util'

const $ref = jsonGraph.ref
const $atom = jsonGraph.atom
const $error = jsonGraph.error

const BaseRouter = Router.createClass([{
	route: 'articles[{ranges:indexRanges}][{keys:props}]',
	get: async pathSet => {
		const result = []
		const tasks = pathSet.indexRanges.map(({from, to}) => {
			return Article.get(from, to).
				then(articles => articles.
					map(article => JSON.parse(article)).
					forEach((article, index) => {
						result.push({
							path: ['articleByNumber', article.number],
							value: getObjectByKeys(article, pathSet.props),
						})
						result.push({
							path: ['articles', index],
							value: $ref(['articleByNumber', article.number]),
						})
					}))
		})
		await* tasks
		return result
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
	get: async pathSet => {
		const resume = await Resume.get()
		return {
			path: ['resume'],
			value: resume,
		}
	},
}])

export default class ModelRouter extends BaseRouter {
	constructor(userId=null) {
		super()
		this.userId = userId
	}
}
