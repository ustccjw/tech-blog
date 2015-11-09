import fetch from 'node-fetch'
import queryString from 'query-string'
import {checkStatus} from '../../util'

export async function getArticles(url) {
	const query = queryString.stringify({
		state: 'open',
		labels: 'blog',
		sort: 'created',
	})
	url = `${url}?${query}`
	const  response = await fetch(url)
	const articles = await checkStatus(response)
	return articles.map(article => ({
		number: article.number,
		title: article.title,
		content: article.body,
		comments: article.comments,
		commentsUrl: article.comments_url,
		createdDate: article.created_at,
		updateDate: article.updated_at,
		author: {
			name: article.user.login,
			link: article.user.html_url,
		}
	}))
}

export async function getCommnet(url) {
	const response = await fetch(url)
	const comment = await checkStatus(response)
	return {
		content: comment.body,
		createdDate: comment.created_at,
		updateDate: comment.updated_at,
		author: {
			name: comment.user.login,
			link: comment.user.html_url,
		}
	}
}

export default {getArticles, getCommnet}
