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
			}
		}

		return {
			updatedConfig: null,
			updatedActions,
			updatedFeedbacks: [],
		}
	},
]
