'use strict'

const path = require('path')
const spawn = require('child_process').spawn
const gulp = require('gulp')
const webpack = require('webpack')
const del = require('del')
const backendConfig = require('./webpack.config.backend')
const productionConfig = require('./webpack.config.production')

gulp.task('clean-dev', () => del([ backendConfig.output.path ]))
gulp.task('clean-build', () => del([ productionConfig.backend.output.path,
	productionConfig.frontend.output.path ]))

gulp.task('backend-watch', done => {
	let fireDone = false
	webpack(backendConfig).watch(null, (err, stats) => {
		onBuild(err, stats)
		if (!fireDone) {
			fireDone = true
			done()
		}
	})
})

gulp.task('server-start', done => {
	const entry = path.join(__dirname, 'dev/backend')
	const server = spawn('node', [ entry ])
	server.stdout.on('data', data =>
		process.stdout.write(data)
	)
	server.stderr.on('data', data =>
		process.stderr.write(data)
	)
	server.on('exit', code =>
		console.log(`child process exited with code ${code}`)
	)
})

gulp.task('backend-build', done => {
	webpack(productionConfig.backend).run((err, stats) => {
		onBuild(err, stats)
		done()
	})
})

gulp.task('frontend-build', done => {
	webpack(productionConfig.frontend).run((err, stats) => {
		onBuild(err, stats)
		done()
	})
})

gulp.task('dev', gulp.series('clean-dev', 'backend-watch', 'server-start'))

gulp.task('build', gulp.series('clean-build', 'backend-build',
	'frontend-build'))

const outputOptions = {
	cached: false,
	cachedAssets: false,
	colors: true,
	exclude: [ 'node_modules' ],
}

function onBuild(err, stats) {
	if (err) {
		throw new Error(err)
	}
	console.log('----------\n', stats.toString(outputOptions), '\n----------')
}
