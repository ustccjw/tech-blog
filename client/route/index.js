export const home = {
	path: '/',
	getComponents(location, cb) {
		require.ensure([], require => {
			cb(null, require('../containers/dashboard'))
		})
	},
}
