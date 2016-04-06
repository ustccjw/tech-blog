import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../client/container/app'
import ArticleList from '../client/container/article-list'
import Article from '../client/container/article'
import About from '../client/container/about'

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={ArticleList}/>
		<Route path="articles/" component={ArticleList} />
		<Route path="articles/:number/" component={Article} />
		<Route path="about/" component={About} />
	</Route>
)

export default routes
