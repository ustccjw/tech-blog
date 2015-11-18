// follow https://github.com/AZaviruha/pager

import React from 'react'

const BASE_SHIFT = 0
const TITLE_SHIFT = 0
const TITLES = {
	first: 'First',
	prev: '\u00AB',
	prevSet: '...',
	nextSet: '...',
	next: '\u00BB',
	last: 'Last',
}

export default class Pagination extends React.Component {
	static propTypes = {
		total: React.PropTypes.number,
		current: React.PropTypes.number,
		visiblePages: React.PropTypes.number,
		titles: React.PropTypes.object,
		handlePageChanged: React.PropTypes.func,
	}

	render() {
	}
}
