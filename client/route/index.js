import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../container/app'
import ArticleList from '../container/article-list'
import Article from '../container/article'
import About from '../container/about'

export default (
	<Route path="/" component={ App }>
		<IndexRoute component={ ArticleList }/>
		<Route path="articles/" component={ ArticleList } />
		<Route path="articles/:number/" component={ Article } />
		<Route path="about/" component={ About } />
	</Route>
)
