import React from 'react'
import './style'

export default class Pager extends React.Component {
	static propTypes = {
		title: React.PropTypes.object,
		handleChange: React.PropTypes.func.isRequired,
	}

	static defaultProps = {
		title: {
			prev: 'PREV',
			next: 'NEXT',
		}
	}

	render() {
		const { title, handleChange } = this.props
		const { prev, next } = title
		return (
			<ideal-pager>
				<ul>
					<li>
						<a href="#" onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							handleChange('prev')
						}}>
							{ prev }
						</a>
					</li>
					<li>
						<a href="#" onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							handleChange('next')
						}}>
							{ next }
						</a>
					</li>
				</ul>
			</ideal-pager>
		)
	}
}
