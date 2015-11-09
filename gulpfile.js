'use strict'

const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack')
const del = require('del')
const spawn = require('child_process').spawn
const backendConfig = require('./webpack.config.backend')

const buildPath = backendConfig.output.path

gulp.task('clean', () => del([buildPath]))

gulp.task('backend-watch', done => {
	let firedDone = false
	webpack(backendConfig).watch(100, (err, stats) => {
		onBuild(err, stats)
		done()
	})
})

gulp.task('server-start', done => {
	const entry = path.join(__dirname, 'build/backend')
	const server = spawn('node', [entry])
	server.stdout.on('data', data => {
		data = data.toString().replace(/\n$/, '')
		console.log(`stdout: ${data}`)
	})

	server.stderr.on('data', data => {
		data = data.toString().replace(/\n$/, '')
		console.log(`stderr: ${data}`)
	})

	server.on('exit', code => {
		console.log(`child process exited with code ${code}`)
	})
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
