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
		return articles.
			map(article => JSON.parse(article)).
			map((article, index) => ({
				path: ['articles', index],
				value: $atom(article),
			}))
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
