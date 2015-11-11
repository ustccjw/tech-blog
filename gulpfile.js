'use strict'

const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack')
const del = require('del')
const spawn = require('child_process').spawn
const backendConfig = require('./webpack.config.backend')
const frontendConfig = require('./webpack.config.frontend')

const buildPath = backendConfig.output.path

gulp.task('clean', () => del([buildPath]))

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
	const entry = path.join(__dirname, 'build/backend')
	const server = spawn('node', [entry])
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

gulp.task('watch', gulp.parallel('backend-watch'))

gulp.task('dev', gulp.series('clean', 'watch', 'server-start'))


const outputOptions = {
	cached: false,
	cachedAssets: false,
	colors: true,
	exclude: ['node_modules'],
}

function onBuild(err, stats) {
	if (err) {
		throw new Error(err)
	}
	console.log('----------\n', stats.toString(outputOptions), '\n----------')
}
