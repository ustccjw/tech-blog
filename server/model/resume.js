import path from 'path'
import fs from 'mz/fs'
import { redis } from '../db'
import app from '../app'

export default class Resume {
	static get() {
		return redis.get('resume')
	}

	static async init() {
		redis.del('resume')
		const resume = await fs.readFile(path.join(app.get('ROOT'),
			'view/resume.md'))
		redis.set('resume', resume.toString())
	}
}

Resume.init().catch(error => console.error(error.stack))
