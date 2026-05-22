module.exports = {
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
