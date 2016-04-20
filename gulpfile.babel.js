import path from 'path'
import { spawn } from 'child_process'
import gulp from 'gulp'
import webpack from 'webpack'
import del from 'del'
import backendConfig from './webpack.config.backend'
import productionConfig from './webpack.config.production'

function onBuild() {}

gulp.task('clean', () => del([productionConfig.backend.output.path,
	productionConfig.frontend.output.path]))

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

gulp.task('server-start', () => {
	const entry = path.join(__dirname, 'dev/backend')
	const server = spawn('node', [entry])
	server.stdout.on('data', data => process.stdout.write(data))
	server.stderr.on('data', data => process.stderr.write(data))
	// eslint-disable-next-line no-console
	server.on('exit', code => console.log(`child process exited with code ${code}`))
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

gulp.task('dev', gulp.series('backend-watch', 'server-start'))

gulp.task('build', gulp.series('clean', 'backend-build', 'frontend-build'))
