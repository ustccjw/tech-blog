import path from 'path'
import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'
import app from '../app'
import { Article, Resume } from '../model'

const $ref = jsonGraph.ref
const $atom = jsonGraph.atom
const $error = jsonGraph.error

const BaseRouter = Router.createClass([{
	route: 'articles[{ranges:indexRanges}]',
	get: async pathSet => {
		const { from, to } = pathSet.indexRanges[0]
		const articles = await Article.get(from, to)
		const result = []
		articles.
			map(article => JSON.parse(article)).
			forEach((article, index) => {
				result.push({
					path: ['articles', index],
					value: $atom(article),
				})
				result.push({
					path: ['articleByNumber', article.number],
					value: $ref(['articles', index]),
				})
			})
		return result
	},
}, {
	route: 'articleByNumber[{integers:numbers}]',
	get: async pathSet => {
		const number = pathSet.numbers[0]
		const article = await Article.getByNumber(number)
		return {
			path: ['articleByNumber', number],
			value: $atom(JSON.parse(article[0])),
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
