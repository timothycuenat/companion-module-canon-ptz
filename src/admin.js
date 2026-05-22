const axios = require('axios')

const DEFAULT_ADMIN_CONFIG_PATH = '/admin/config'
const ADMIN_CONFIG_BODY_BASE = 'lg=ja&pt=4&em=2'

function adminConfigBodyWithParam(param, value) {
	return `${ADMIN_CONFIG_BODY_BASE}&${param}=${value}`
}

function adminConfigPath(config) {
	const path = (config.adminConfigPath || DEFAULT_ADMIN_CONFIG_PATH).trim()
	if (!path) {
		return DEFAULT_ADMIN_CONFIG_PATH
	}
	return path.startsWith('/') ? path : `/${path}`
}

function adminConfigUrl(config) {
	const host = config.host || ''
	const port = config.httpPort || 80
	return `http://${host}:${port}${adminConfigPath(config)}`
}

function adminAuthHeader(config) {
	let token = (config.adminAuthToken || '').trim()
	if (!token) {
		return null
	}
	if (token.toLowerCase().startsWith('basic ')) {
		return { Authorization: token }
	}
	return { Authorization: `Basic ${token}` }
}

function responsePreview(data) {
	const text = String(data ?? '')
		.replace(/\s+/g, ' ')
		.trim()
	return text.length > 120 ? `${text.slice(0, 120)}…` : text
}

module.exports = {
	adminConfigPath,
	adminConfigUrl,
	adminAuthHeader,

	async postAdminConfig(body) {
		const self = this
		const auth = adminAuthHeader(self.config)
		if (!auth) {
			self.log('warn', 'admin/config : jeton Basic Auth non configuré (réglages du module).')
			return { status: 'failed', reason: 'no_token' }
		}
		const url = adminConfigUrl(self.config)
		try {
			if (self.config.verbose) {
				self.log('info', `admin/config POST ${url} body=${body}`)
			}
			const response = await axios.post(url, body, {
				headers: {
					...auth,
					'Content-Type': 'text/plain',
				},
				timeout: 10000,
				validateStatus: () => true,
			})
			if (response.status >= 200 && response.status < 300) {
				return { status: 'ok', response }
			}
			const preview = responsePreview(response.data)
			self.log(
				'error',
				`admin/config POST ${url} → HTTP ${response.status}${preview ? ` : ${preview}` : ''}`,
			)
			return { status: 'failed', reason: 'http', httpStatus: response.status, response }
		} catch (err) {
			self.log('error', `admin/config POST ${url} : ${String(err)}`)
			return { status: 'failed', reason: 'network' }
		}
	},

	verticalFlipBodyForState(state) {
		return adminConfigBodyWithParam('da05', state === 'on' ? '1' : '2')
	},

	adminTallyBodyForState(state) {
		return adminConfigBodyWithParam('db09-0', state === 'on' ? '1' : '0')
	},
}
