import path from 'path'
import fs from 'mz/fs'
import db from '../db'
import { ROOT } from '../config'

const { redis } = db

export default class Resume {
	static get() {
		return redis.get('resume')
	}

	static async init() {
		redis.del('resume')
		const filePath = path.join(ROOT, 'view/resume.md')
		const resume = await fs.readFile(filePath)
		redis.set('resume', resume.toString())
	}
}

Resume.init().catch(error => console.error(error.stack)) // eslint-disable-line no-console
