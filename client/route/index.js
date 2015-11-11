import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../container/app'
import ArticleList from '../container/article-list'

export default (
	<Route path="/" component={ App }>
		<IndexRoute component={ ArticleList }/>
		<Route path="articles" component={ ArticleList } />
	</Route>
)
