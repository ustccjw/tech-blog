import falcor from 'falcor'

export const DataModel = new falcor.Model({
	source: new falcor.HttpDataSource('/model.json'),
})

export const UiModel = new falcor.Model({
	cache: {
		articleList: {
			page: 1,
		},
	},
})
