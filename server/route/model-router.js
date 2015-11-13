import path from 'path'
import fs from 'mz/fs'
import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'
import app from '../app'
import { githubService } from '../service/'

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
			value: $atom(articles),
		}
	},
}, {
	route: 'comment',
	get: async pathSet => {
		const url = 'https://api.github.com/repos/ustccjw/Blog/issues'
		const articles = await githubService.getComment(url)
		return {
			path: ['articles'],
			value: $atom(articles),
		}
	},
}, {
	route: 'resume',
	get: async pathSet => {
		const resume = await fs.readFile(path.join(app.get('ROOT'),
			'view/resume.md'))
		return {
			path: ['resume'],
			value: resume.toString(),
		}
	},
}])

export default class ModelRouter extends BaseRouter {
	constructor(userId=null) {
		super()
		this.userId = userId
	}
}
