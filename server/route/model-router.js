import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'
import {githubService} from '../service/'

const $ref = jsonGraph.ref
const $atom = jsonGraph.atom
const $error = jsonGraph.error

const BaseRouter = Router.createClass([{
	route: 'articles',
	get: async pathSet => {
		const url = 'https://api.github.com/repos/ustccjw/Blog/issues'
		const articles = await githubService.getArticles(url)
		return {
			path: ['articles'],
			value: $atom(articles)
		}
	},
}, {
	route: 'comment',
	get: async pathSet => {
		const url = 'https://api.github.com/repos/ustccjw/Blog/issues'
		const articles = await githubService.getComment(url)
		return {
			path: ['articles'],
			value: $atom(articles)
		}
	},
}])

export default class ModelRouter extends BaseRouter {
	constructor(userId=null) {
		super()
		this.userId = userId
	}
}
