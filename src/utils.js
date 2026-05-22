const c = require('./choices')

module.exports = {
	isAdminConfigFeatureEnabled(seriesFlag) {
		const self = this
		return seriesFlag === true || !!(self.config.adminAuthToken || '').trim()
	},

	isVerticalFlipEnabled(seriesFlag) {
		return this.isAdminConfigFeatureEnabled(seriesFlag)
	},

	isAdminTallyEnabled(seriesFlag) {
		return this.isAdminConfigFeatureEnabled(seriesFlag)
	},

	getOsdState(output) {
		const self = this
		if (output === 'output2') {
			return self.data.osdOut3G || ''
		}
		return self.data.osdOut12G || ''
	},

	setOsdState(output, value) {
		const self = this
		if (output === 'output2') {
			self.data.osdOut3G = value
		} else {
			self.data.osdOut12G = value
		}
		self.checkVariables()
		self.checkFeedbacks()
	},

	applyOsdPollValue(output, value) {
		const self = this
		if (!self.shouldApplyOsdPollValue(output)) {
			return
		}
		self.setOsdState(output, value)
	},

	async resolveOsdOutput(value) {
		const self = this
		const str = (await self.parseVariablesInString(String(value ?? ''))).toLowerCase().trim()
		if (str === 'output2' || str.includes('3g')) {
			return 'output2'
		}
		if (str === 'output1' || str.includes('12g')) {
			return 'output1'
		}
		return 'output1'
	},

	/** Après un changement OSD, ignorer le poll de l'autre sortie (réponses caméra erronées ~1s). */
	beginOsdPollGuard(changedOutput) {
		const self = this
		const otherOutput = changedOutput === 'output2' ? 'output1' : 'output2'
		self.osdPollGuard = {
			changedOutput,
			otherOutput,
			frozenOtherValue: self.getOsdState(otherOutput),
			until: Date.now() + 2000,
		}
	},

	shouldApplyOsdPollValue(output) {
		const self = this
		const guard = self.osdPollGuard
		if (!guard) {
			return true
		}
		if (Date.now() > guard.until) {
			self.osdPollGuard = null
			return true
		}
		return output === guard.changedOutput
	},

	/** Rétablit l'état gelé de la sortie non modifiée après un poll/commande menu. */
	restoreOsdOtherOutputIfGuarded() {
		const self = this
		const guard = self.osdPollGuard
		if (!guard || Date.now() > guard.until) {
			return
		}
		const current = self.getOsdState(guard.otherOutput)
		if (current === guard.frozenOtherValue) {
			return
		}
		if (guard.otherOutput === 'output2') {
			self.data.osdOut3G = guard.frozenOtherValue
		} else {
			self.data.osdOut12G = guard.frozenOtherValue
		}
		self.checkVariables()
		self.checkFeedbacks()
	},

	async resolveOsdMode(value) {
		const self = this
		const str = (await self.parseVariablesInString(String(value ?? ''))).toLowerCase().trim()
		if (str === 'toggle' || str === 't' || str.startsWith('tog')) {
			return 'toggle'
		}
		if (str === 'on' || str === '1') {
			return 'on'
		}
		if (str === 'off' || str === '0') {
			return 'off'
		}
		return 'toggle'
	},

	async resolveVerticalFlipMode(value) {
		return this.resolveOsdMode(value)
	},

	setVerticalFlipState(value) {
		const self = this
		self.data.verticalFlip = value
		self.checkVariables()
	},

	async applyVerticalFlip(mode) {
		const self = this
		await self.applyAdminConfigFeature({
			featureLabel: 'Vertical flip',
			mode,
			getState: () => self.data.verticalFlip,
			bodyForState: (state) => self.verticalFlipBodyForState(state),
			setState: (state) => self.setVerticalFlipState(state),
		})
	},

	setAdminTallyState(value) {
		const self = this
		self.data.adminTally = value
		self.checkVariables()
	},

	async applyAdminTally(mode) {
		const self = this
		await self.applyAdminConfigFeature({
			featureLabel: 'Tally (admin)',
			mode,
			getState: () => self.data.adminTally,
			bodyForState: (state) => self.adminTallyBodyForState(state),
			setState: (state) => self.setAdminTallyState(state),
		})
	},

	async applyAdminConfigFeature({ featureLabel, mode, getState, bodyForState, setState }) {
		const self = this
		if (!(self.config.adminAuthToken || '').trim()) {
			self.log('warn', `${featureLabel} : renseignez le jeton Basic Auth dans la config du module.`)
			return
		}
		const resolvedMode = await self.resolveOsdMode(mode)
		let next
		if (resolvedMode === 'toggle') {
			next = getState() === 'on' ? 'off' : 'on'
		} else {
			next = resolvedMode
		}
		const body = bodyForState(next)
		const result = await self.postAdminConfig(body)
		if (result.status === 'ok') {
			setState(next)
			self.log('info', `${featureLabel} : ${next} (admin/config OK)`)
		} else {
			const detail =
				result.reason === 'no_token'
					? 'jeton manquant'
					: result.httpStatus
						? `HTTP ${result.httpStatus}`
						: result.reason || 'échec'
			self.log('warn', `${featureLabel} : commande non appliquée (${detail}).`)
		}
	},

	getDigitalZoomState() {
		return this.data.digitalZoom || ''
	},

	getDigitalZoomMag() {
		return String(this.data.digitalZoomMag || '')
	},

	setDigitalZoomState(mode, mag) {
		const self = this
		if (mode !== undefined && mode !== null) {
			self.data.digitalZoom = mode
		}
		if (mag !== undefined && mag !== null) {
			self.data.digitalZoomMag = String(mag)
		}
		self.checkVariables()
		self.checkFeedbacks()
	},

	getDigitalZoomModeLabel(mode) {
		const m = mode ?? this.getDigitalZoomState()
		if (m === 'dzoom') {
			return '300x'
		}
		if (m === 'mag') {
			const mag = this.getDigitalZoomMag()
			const magLabel = c.DIGITAL_ZOOM_MAG_LABELS[mag]
			return magLabel ? `Mag ${magLabel}` : 'Mag'
		}
		if (m === 'off') {
			return 'Off'
		}
		return m || ''
	},

	getDigitalZoomMagLabel(mag) {
		const key = String(mag ?? this.getDigitalZoomMag())
		return c.DIGITAL_ZOOM_MAG_LABELS[key] || key || ''
	},

	async resolveDigitalZoomMode(value) {
		const self = this
		const str = (await self.parseVariablesInString(String(value ?? ''))).toLowerCase().trim()
		if (!str || str === '-' || str === 'unchanged' || str === 'skip' || str.includes('inchang')) {
			return ''
		}
		if (str === 'toggle' || str === 't' || str.startsWith('tog')) {
			return 'toggle'
		}
		if (str === 'off' || str === '0') {
			return 'off'
		}
		if (str === 'dzoom' || str === 'on' || str === '1' || str.includes('300')) {
			return 'dzoom'
		}
		if (str === 'mag' || str.includes('tele') || str.includes('dtc') || str.includes('converter')) {
			return 'mag'
		}
		return str
	},

	async resolveDigitalZoomMag(value) {
		const self = this
		const str = (await self.parseVariablesInString(String(value ?? ''))).toLowerCase().trim()
		if (!str || str === '-' || str === 'unchanged' || str === 'skip' || str.includes('inchang')) {
			return ''
		}
		const byLabel = {
			'1.0x': '100',
			'1.0': '100',
			'1.5x': '150',
			'1.5': '150',
			'3.0x': '300',
			'3': '300',
			'3x': '300',
			'6.0x': '600',
			'6': '600',
			'6x': '600',
		}
		if (byLabel[str]) {
			return byLabel[str]
		}
		if (['100', '150', '300', '600'].includes(str)) {
			return str
		}
		return str
	},

	nextDigitalZoomModeOnToggle(current) {
		const order = ['off', 'dzoom', 'mag']
		const idx = order.indexOf(current)
		if (idx === -1) {
			return 'off'
		}
		return order[(idx + 1) % order.length]
	},

	isSaveSettingsResponseOk(result) {
		if (!result || result.status !== 'ok' || !result.response) {
			return false
		}
		if (result.response.status !== 200) {
			return false
		}
		const raw = String(result.response.data ?? '')
		for (const line of raw.split('\n')) {
			const trimmed = line.trim()
			if (!trimmed) {
				continue
			}
			// s.action=save ou s.action==save (réponse caméra)
			const match = trimmed.match(/^s\.action\s*={1,2}\s*save\s*$/i)
			if (match) {
				return true
			}
		}
		return false
	},

	notifySaveSettingsOk() {
		const self = this
		if (self.saveSettingsOkTimer) {
			clearTimeout(self.saveSettingsOkTimer)
		}
		self.saveSettingsOkUntil = Date.now() + 2000
		self.checkFeedbacks()
		self.saveSettingsOkTimer = setTimeout(() => {
			self.saveSettingsOkUntil = 0
			self.saveSettingsOkTimer = null
			self.checkFeedbacks()
		}, 2000)
	},

	isSaveSettingsOkActive() {
		return !!(this.saveSettingsOkUntil && Date.now() < this.saveSettingsOkUntil)
	},

	async applyDigitalZoom(zoomMode, magnification) {
		const self = this
		const resolvedMode = await self.resolveDigitalZoomMode(zoomMode)
		const resolvedMag = await self.resolveDigitalZoomMag(magnification)

		if (!resolvedMode && !resolvedMag) {
			return
		}

		let modeToSend = resolvedMode
		if (resolvedMode === 'toggle') {
			modeToSend = self.nextDigitalZoomModeOnToggle(self.getDigitalZoomState())
		}

		if (modeToSend && modeToSend !== 'toggle') {
			self.setDigitalZoomState(modeToSend, undefined)
			await self.sendPTZ(self.ptzCommand, `zoom.mode=${modeToSend}`)
		}

		if (resolvedMag) {
			self.setDigitalZoomState(undefined, resolvedMag)
			await self.sendPTZ(self.ptzCommand, `zoom.mag=${resolvedMag}`)
		}

		self.getCameraInformation_Delayed()
	},

	async applyOsd(output, mode) {
		const self = this
		const resolvedOutput = await self.resolveOsdOutput(output)
		const resolvedMode = await self.resolveOsdMode(mode)
		let next
		if (resolvedMode === 'toggle') {
			const current = self.getOsdState(resolvedOutput)
			if (current !== 'on' && current !== 'off') {
				return
			}
			next = current === 'on' ? 'off' : 'on'
		} else {
			next = resolvedMode
		}
		const cmd = `onscreen=${next}&output=${resolvedOutput}`
		self.beginOsdPollGuard(resolvedOutput)
		self.setOsdState(resolvedOutput, next)
		await self.sendPTZ(self.menuCommand, cmd)
		self.restoreOsdOtherOutputIfGuarded()
		self.getCameraInformation_Delayed()
	},

	runCustomTrace: function(loop, loopMode, repeatCount, position, direction) {
		let self = this;

		//check that the position is still within the bounds of the array
		if (position > self.customTracePresetArray.length - 1 || position < 0) {
			//we've reached the bounds of the array, so check the loop mode to know what to do next
			if (loopMode == 'normal') {
				direction = 'forward';
				position = 0;
			}
			else if (loopMode == 'pendulum') {
				//which bound did we hit, swap direction depending on that
				if (position >= self.customTracePresetArray.length - 1) {
					direction = 'backward';
					position = self.customTracePresetArray.length - 2;
					if (position == 0) {
						direction = 'forward';
						position = 1;
					}
				}
				else if (position < 0) {
					direction = 'forward';
					position = 1;
				}
			}
		}

		let presetObj = self.customTracePresetArray[position];

		if (presetObj) {
			let cmd = 'p=' + presetObj.preset; //preset
			cmd += '&p.ptztime=' + presetObj.time;
			self.sendPTZ(self.ptzCommand, cmd);

			self.data.presetLastUsed = presetObj.preset;

			self.checkVariables();
			self.checkFeedbacks();

			//now determine if we need to loop or not, and if so, wait for the preset to finish and then loop
			if (self.customTraceLoop == true) //hasn't been stopped by the stop action
			{
				//get the next position
				if (direction == 'forward') {
					position++;
				}
				else if (direction == 'backward') {
					position--;
				}

				if (loop) {
					self.customTraceLoopInterval = setTimeout(self.runCustomTrace.bind(self), (presetObj.time + 100), loop, loopMode, repeatCount, position, direction);
				}
				else {
					//make sure we haven't elapsed past our loop count
					if (self.customTraceLoopCount < repeatCount) {
						self.customTraceLoopCount++;
						self.customTraceLoopInterval = setTimeout(self.runCustomTrace.bind(self), (presetObj.time + 100), loop, loopMode, repeatCount, position, direction);
					}
				}
			}
		}
		else {
			//undefined for some reason
		}
	},

	stopCustomTrace: function() {
		let self = this;

		if (self.customTraceLoop == true) {
			//this is really just for the log
			self.log('info', 'Stopping Custom Trace.');
		}

		//clear the interval anyway
		self.customTraceLoop = false;
		self.customTraceLoopCount = 0;
		clearTimeout(self.customTraceLoopInterval);
	}
}
