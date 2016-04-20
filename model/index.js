import falcor from 'falcor'
import HttpDataSource from 'falcor-http-datasource'

let url = '/model.json'
if (process.env.NODE_ENV === 'development') {
	url = 'http://127.0.0.1:3000/model.json'
}

// dataModel 按对象实体划分
export const dataModel = new falcor.Model({
	source: new HttpDataSource(url),
})

// uiModel 按 route component 划分
export const uiModel = new falcor.Model({
	cache: {
		articleList: {
			page: 1,
		},
	},
})

if (global.dataCache) {
	dataModel.setCache(global.dataCache)
}
