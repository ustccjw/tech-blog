'use strict'

const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack')
const del = require('del')
const nodemon = require('nodemon')
const backendConfig = require('./webpack.config.backend')

const buildPath = backendConfig.output.path

gulp.task('clean', () => del([buildPath]))

gulp.task('backend-watch', done => {
	let firedDone = false
	webpack(backendConfig).watch(100, (err, stats) => {
		onBuild(err, stats)
		nodemon.restart()
		if(!firedDone) {
			done()
			firedDone = true
		}
	})
})

gulp.task('server-start', done => {
	nodemon({
		execMap: {
			js: 'node',
		},
		script: path.join(__dirname, 'build/backend'),
		ignore: ['*'],
		watch: ['foo/'],
		ext: 'noop',
	}).on('restart', () => {
		console.log('Patched!')
	})
	done()
})

gulp.task('watch', gulp.parallel('backend-watch'))

gulp.task('dev', gulp.series('clean', 'watch', 'server-start'))


const outputOptions = {
	cached: false,
	cachedAssets: false,
	colors: true,
	exclude: ['node_modules', 'components'],
}

function onBuild(err, stats) {
	if(err) {
		throw new Error(err)
	}
	console.log(stats.toString(outputOptions))
}
