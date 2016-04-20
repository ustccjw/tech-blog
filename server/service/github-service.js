import fetch from 'node-fetch'
import queryString from 'query-string'
import { checkStatus } from '../../util'

const getArticles = async url => {
	const query = queryString.stringify({
		state: 'open',
		labels: 'blog',
		sort: 'created',
	})
	const response = await fetch(`${url}?${query}`)
	const articles = await checkStatus(response)
	return articles.map(article => ({
		number: article.number,
		title: article.title,
		content: article.body,
		comments: article.comments,
		commentsUrl: article.comments_url,
		createdDate: article.created_at,
		updateDate: article.updated_at,
		introduction: `${article.body.slice(0, 200)}...`,
		author: {
			name: article.user.login,
			link: article.user.html_url,
		},
	}))
}

const getCommnet = async url => {
	const response = await fetch(url)
	const comment = await checkStatus(response)
	return {
		content: comment.body,
		createdDate: comment.created_at,
		updateDate: comment.updated_at,
		author: {
			name: comment.user.login,
			link: comment.user.html_url,
		},
	}
}

export default { getArticles, getCommnet }
