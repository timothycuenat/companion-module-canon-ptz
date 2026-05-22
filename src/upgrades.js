module.exports = [
	function (context, props) {
		return {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
	},
	function (context, props) {
		const updatedActions = []

		for (const action of props.actions) {
			if (action.actionId === 'osdOn') {
				updatedActions.push({
					...action,
					actionId: 'osd',
					options: { ...action.options, mode: 'on' },
				})
			} else if (action.actionId === 'osdOff') {
				updatedActions.push({
					...action,
					actionId: 'osd',
					options: { ...action.options, mode: 'off' },
				})
			} else if (action.actionId === 'osdToggle') {
				updatedActions.push({
					...action,
					actionId: 'osd',
					options: { ...action.options, mode: 'toggle' },
				})
			} else if (action.actionId === 'digitalZoom' && action.options && 'bol' in action.options) {
				const zoomMode = action.options.bol == 1 ? 'dzoom' : 'off'
				const { bol, ...rest } = action.options
				updatedActions.push({
					...action,
					options: { ...rest, zoomMode, magnification: '' },
				})
			} else if (action.actionId === 'digitalZoom' && action.options && 'mode' in action.options && !('zoomMode' in action.options)) {
				const legacy = action.options.mode
				let zoomMode = ''
				if (legacy === 'on') {
					zoomMode = 'dzoom'
				} else if (legacy === 'off') {
					zoomMode = 'off'
				} else if (legacy === 'toggle') {
					zoomMode = 'toggle'
				}
				const { mode, ...rest } = action.options
				updatedActions.push({
					...action,
					options: { ...rest, zoomMode, magnification: rest.magnification ?? '' },
				})
			}
		}

		return {
			updatedConfig: null,
			updatedActions,
			updatedFeedbacks: [],
		}
	},
	function (context, props) {
		const updatedActions = []
		const updatedFeedbacks = []

		for (const action of props.actions) {
			if (action.actionId === 'digitalZoom' && action.options?.option !== undefined) {
				const legacy = action.options.option
				let zoomMode = 'dzoom'
				if (legacy === '0' || legacy === 0) {
					zoomMode = 'off'
				}
				const { option, ...rest } = action.options
				updatedActions.push({
					...action,
					options: { zoomMode, magnification: '', ...rest },
				})
			}
		}

		for (const feedback of props.feedbacks) {
			if (feedback.feedbackId === 'digitalZoom' && feedback.options?.option !== undefined) {
				const legacy = feedback.options.option
				let zoomMode = 'dzoom'
				if (legacy === '0' || legacy === 0) {
					zoomMode = 'off'
				}
				const { option, ...rest } = feedback.options
				updatedFeedbacks.push({
					...feedback,
					options: { zoomMode, magnification: '', ...rest },
				})
			}
		}

		return {
			updatedConfig: null,
			updatedActions,
			updatedFeedbacks,
		}
	},
]
