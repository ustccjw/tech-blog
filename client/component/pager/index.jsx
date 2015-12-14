import React from 'react'
import './style'

export default class Pager extends React.Component {
	static propTypes = {
		title: React.PropTypes.object,
		handleChange: React.PropTypes.func.isRequired,
		canPrev: React.PropTypes.bool.isRequired,
		canNext: React.PropTypes.bool.isRequired,
	}

	static defaultProps = {
		title: {
			prev: '上一页',
			next: '下一页',
		},
	}

	render() {
		const { title, handleChange, canPrev, canNext } = this.props
		const { prev, next } = title
		const prevComponent = canPrev ? (
			<button href="#" onClick={ e => { handleChange('prev')} }>
				{ prev }
			</button>
		) : null
		const nextComponent = canNext ? (
			<button href="#" onClick={ e => { handleChange('next')} }>
				{ next }
			</button>
		) : null

		return (
			<ideal-pager>
				<ul>
					<li>{ prevComponent }</li>
					<li>{ nextComponent }</li>
				</ul>
			</ideal-pager>
		)
	}
}
