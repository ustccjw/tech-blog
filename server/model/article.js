import { redis } from '../db'
import { githubService } from '../service/'

export default class Article {
	static get(start, stop=start) {
		return redis.zrange('articles', start, stop)
	}

	static getByNumber(number) {
		return redis.zrangebyscore('articles', -number, -number)
	}

	static async init() {
		redis.del('articles')
		const url = 'https://api.github.com/repos/ustccjw/Blog/issues'
		const articles = await githubService.getArticles(url)
		articles.forEach(article =>
			redis.zadd('articles', -article.number, JSON.stringify(article))
		)
	}
}

Article.init().catch(error => {
	console.error(error.stack)
})
