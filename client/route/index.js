import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../container/app'
import ArticleList from '../container/article-list'
import Article from '../container/article'

export default (
	<Route path="/" component={ App }>
		<IndexRoute component={ ArticleList }/>
		<Route path="articles/" component={ ArticleList } />
		<Route path="articles/:number/" component={ Article } />
	</Route>
)
