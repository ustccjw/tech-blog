import React from 'react'

import './style'

const Pager = props => {
	const { title, handleChange, canPrev, canNext } = props
	const { prev, next } = title
	const prevComponent = canPrev && (
		<button href="#" onClick={e => handleChange('prev')}>
			{prev}
		</button>
	)
	const nextComponent = canNext && (
		<button href="#" onClick={e => handleChange('next')}>
			{next}
		</button>
	)

	return (
		<ideal-pager>
			<ul>
				<li>{prevComponent}</li>
				<li>{nextComponent}</li>
			</ul>
		</ideal-pager>
	)
}

Pager.propTypes = {
	title: React.PropTypes.object,
	handleChange: React.PropTypes.func.isRequired,
	canPrev: React.PropTypes.bool.isRequired,
	canNext: React.PropTypes.bool.isRequired,
}

Pager.defaultProps = {
	title: {
		prev: '上一页',
		next: '下一页',
	},
}

export default Pager
