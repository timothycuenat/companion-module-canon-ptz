const c = require('./choices.js')

module.exports = {
	MODELS: [
		{ id: 'Auto', series: 'Auto', label: 'Auto Detect' },
		{ id: 'Canon CR-N100', series: 'CR-N100', label: 'Canon CR-N100' },
		{ id: 'Canon CR-N300', series: 'CR-N300', label: 'Canon CR-N300' },
		{ id: 'Canon CR-N350', series: 'CR-N350', label: 'Canon CR-N350' },
		{ id: 'Canon CR-N400', series: 'CR-N400', label: 'Canon CR-N400' },
		{ id: 'Canon CR-N500', series: 'CR-N500', label: 'Canon CR-N500' },
		{ id: 'Canon CR-N700', series: 'CR-N700', label: 'Canon CR-N700' },
		{ id: 'Canon CR-X300', series: 'CR-X300', label: 'Canon CR-X300' },
		{ id: 'Canon CR-X500', series: 'CR-X500', label: 'Canon CR-X500' },
		{ id: 'Canon XF-605', series: 'XF-605', label: 'Canon XF-605' },
		{ id: 'Canon C300 MkIII', series: 'Other', label: 'Canon C300 MkIII' },
		{ id: 'Canon C500 MkII', series: 'Other', label: 'Canon C500 MkII' },
		{ id: 'Canon C70', series: 'Other', label: 'Canon C70' },
		{ id: 'Other', series: 'Other', label: 'Other Cameras' }
	],

	// Includes all Actions / Variables / Feedbacks
	SERIES_SPECS: [
		{
			// Specific for the CR-N100 Series
			id: 'CR-N100',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual,
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual,
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN300 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				presets: true, //save, recall, set preset recall mode,
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			// Specific for the CR-N300 Series
			id: 'CR-N300',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual,
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//other
				osd: true, //on-screen display on/off per output (menu.cgi)
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual,
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				osd: true, //on-screen display on/off per output
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN300 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				osd: true, //on-screen display on/off per output
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				presets: true, //save, recall, set preset recall mode,
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
				{
			// Specific for the CR-N350 Series
			id: 'CR-N350',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual,
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual,
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN300 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				presets: true, //save, recall, set preset recall mode,
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
				{
			// Specific for the CR-N400 Series
			id: 'CR-N400',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual,
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual,
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN300 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				presets: true, //save, recall, set preset recall mode,
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			// Specific for the CR-N500 Series
			id: 'CR-N500',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//other
				colorBars: true, //camera color bars state is on/off
				osd: true, //on-screen display on/off per output (menu.cgi)
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				colorBars: true, //camera color bars is on or off
				osd: true, //on-screen display on/off per output
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN500 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				colorBars: true, //camera color bars state is on/off
				osd: true, //on-screen display on/off per output
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				presets: true, //save, recall, set preset recall mode
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			// Specific for the CR-N700 Series
			id: 'CR-N700',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				digitalZoom: true, //digital zoom is turned on/off
				imageStabilization: true, //image stabilization is turned on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//pan/tilt
				panTiltSpeedValue: true, //current pan/tilt speed value
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//other
				osd: true, //on-screen display on/off per output (menu.cgi)
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				osd: true, //on-screen display on/off per output
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true,
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true,
				ptSpeed: true,
				zoom: true,
				zoomSpeed: true,
				focus: true,
				focusSpeed: true,
				autoFocus: true,
				oneshotAutoFocus: true,
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_CRN() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_CRN() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_CRN() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_CRN() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_CRN() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_CRN() },
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_CRN() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_CRN() },
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_CRN500 }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_CRN() },
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_CRN() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_CRN() },
				kelvinCc: { cmd: 'wb.kelvin.cc=' }, // PTZ : control.cgi?wb.kelvin.cc=
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_CRN() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_CRN() },
				wbPreset: true,
				osd: true, //on-screen display on/off per output
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				presets: true, //save, recall, set preset recall mode
				timePset: true, //set preset drive recall time
				speedPset: true, //set preset drive recall speed
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			id: 'CR-X300',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				tallyProgram: true, //camera tally program state is on/off
				tallyPreview: true, //camera tally preview state is on/off
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				zoomValue: true, //current zoom value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true, // Has Power Control
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true, // Has Pan/Tilt Support
				ptSpeed: true, // Internal Speed Options
				zoom: true, // Has Zoom Support
				zoomValue: true, //for XF605, etc.
				zoomSpeed: true, // Internal Speed Options
				focus: true, // Has Focus Support
				focusSpeed: true, // Internal Focus Options
				autoFocus: true, // Has Auto Focus Support
				oneshotAutoFocus: true, // Has One Shot Auto Focus Support
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_OTHER() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_OTHER() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_OTHER() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_OTHER() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_OTHER() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_OTHER() }, // Has Shutter Support
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_OTHER() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_OTHER() }, // Has Gain Support
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_OTHER }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_OTHER() }, // Has Pedestal Support
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_OTHER() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_OTHER() },
				kelvinCc: { cmd: 'c.1.wb.kelvin.cc=' },
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_OTHER() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_OTHER() },
				wbPreset: true,
				presets: true, // Can Save and Recall Presets
				speedPset: true, // Has Preset Recall Speed Control
				timePset: true, // Has Preset Recall Time Control
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			id: 'CR-X500',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				zoomValue: true, //current zoom value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual,
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true, // Has Power Control
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				panTilt: true, // Has Pan/Tilt Support
				ptSpeed: true, // Internal Speed Options
				zoom: true, // Has Zoom Support
				zoomValue: true, //for XF605, etc.
				zoomSpeed: true, // Internal Speed Options
				focus: true, // Has Focus Support
				focusSpeed: true, // Internal Focus Options
				autoFocus: true, // Has Auto Focus Support
				oneshotAutoFocus: true, // Has One Shot Auto Focus Support
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_OTHER() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_OTHER() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_OTHER() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_OTHER() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_OTHER() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_OTHER() }, // Has Shutter Support
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_OTHER() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_OTHER() }, // Has Gain Support
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_OTHER }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_OTHER() }, // Has Pedestal Support
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_OTHER() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_OTHER() },
				kelvinCc: { cmd: 'c.1.wb.kelvin.cc=' },
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_OTHER() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_OTHER() },
				wbPreset: true,
				presets: true, // Can Save and Recall Presets
				speedPset: true, // Has Preset Recall Speed Control
				timePset: true, // Has Preset Recall Time Control
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			id: 'XF-605',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				zoomValue: true, //current zoom value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				recordStatus: true, //f.rec.status idle|rec
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				cameraRec: true, //recording in progress (f.rec.status)
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true, // Has Power Control
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				cameraRec: { cmd: 'f.rec=' }, // Record/Stop movie (on/off)
				panTilt: false, // Has Pan/Tilt Support
				ptSpeed: true, // Internal Speed Options
				zoom: true, // Has Zoom Support
				zoomValue: true, //for XF605, etc.
				zoomSpeed: true, // Internal Speed Options
				focus: true, // Has Focus Support
				focusSpeed: true, // Internal Focus Options
				autoFocus: true, // Has Auto Focus Support
				oneshotAutoFocus: true, // Has One Shot Auto Focus Support
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_OTHER() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_OTHER() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_OTHER() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_OTHER() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_OTHER() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_OTHER() }, // Has Shutter Support
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_OTHER() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_XF605 }, // Has Gain Support
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_OTHER }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_OTHER() }, // Has Pedestal Support
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_OTHER() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_OTHER() },
				kelvinCc: { cmd: 'c.1.wb.kelvin.cc=' },
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_OTHER() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_OTHER() },
				wbPreset: true,
				presets: true, // Can Save and Recall Presets
				speedPset: true, // Has Preset Recall Speed Control
				timePset: true, // Has Preset Recall Time Control
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		},
		{
			id: 'Other',
			variables: {
				//system
				powerState: true, //camera is on or off (idle or standby)
				cameraName: true, //name of camera
				osd: true, //on-screen display on/off per output (menu.cgi)
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				firmwareVersion: true, //firmware version
				protocolVersion: true, //protocol version
				macAddress: true, //MAC address
				//zoom/focus
				zoomSpeed: true, //zoom speed value
				zoomValue: true, //current zoom value
				focusSpeed: true, //focus speed value
				focusValue: true, //focus length value
				autoFocusMode: true, //focus mode auto/manual
				//exposure
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode auto, av, tv, manual
				ae: true, //ae gainlimit, brightness, photometry, flickerreduct
				shutterMode: true, //shutter mode auto/manual
				shutterValue: true, //shutter value
				irisMode: true, //iris auto/manual
				irisValue: true, //iris value
				gainMode: true, //gain auto/manual
				gainValue: true, //gain value
				ndfilterValue: true, //neutral density value
				pedestalValue: true, //pedestal value
				//white balance
				whitebalanceMode: true, //white balance mode auto, manual, wb_a, wb_b, daylight, tungsten, kelvin
				kelvinValue: true, //current kelvin value
				kelvinCcValue: true, //kelvin CC adjustment -20..+20
				recordStatus: true, //f.rec.status idle|rec
				rGainValue: true, //current r gain value
				bGainValue: true, //current b gain value
				//recall preset
				presetNames: true, // preset stored names as variables
				presetLastUsed: true, //preset last recalled
				presetRecallMode: true, //preset recall mode normal, time, speed
				presetTimeValue: true, //preset time value
				presetSpeedValue: true //preset speed value
			},
			feedbacks: {
				powerState: true, //power is on or off
				tallyProgram: true, //pgm tally is on or off
				tallyPreview: true, //pvw tally is on or off
				digitalZoom: true, //digital zoom is on or off
				imageStabilization: true, //image stabilization is on or off
				autoFocusMode: true, //focus mode is auto or manual
				exposureShootingMode: true, //exposure shooting mode (auto, manual, scene)
				exposureMode: true, //exposure mode is full auto, program, tv, av, or manual
				autoShutterMode: true, //shutter mode is auto or manual
				autoIrisMode: true, //iris mode is auto or manual
				autoGainMode: true, //gain mode is auto or manual
				whitebalanceMode: true, //white balance mode
				cameraRec: true, //recording in progress (f.rec.status)
				osd: true, //on-screen display on/off per output
				presetLastUsed: true, //preset last recalled
				saveSettings: true, //brief OK feedback after successful save (s.action=save)
				presetRecallMode: true //preset recall mode is normal, time, or speed
			},
			actions: {
				powerState: true, // Has Power Control
				tallyProgram: true, // Has Red Tally Light Control
				tallyPreview: true, // Has Green Tally Light Control
				cameraName: true, //Supports Custom Camera Name
				digitalZoom: true, //Supports Digital Zoom
				imageStabilization: true, //Supports Image Stabilization
				cameraRec: { cmd: 'f.rec=' }, // Record/Stop movie (on/off)
				panTilt: true, // Has Pan/Tilt Support
				ptSpeed: true, // Internal Speed Options
				zoom: true, // Has Zoom Support
				zoomValue: true, //for XF605, etc.
				zoomSpeed: true, // Internal Speed Options
				focus: true, // Has Focus Support
				focusSpeed: true, // Internal Focus Options
				autoFocus: true, // Has Auto Focus Support
				oneshotAutoFocus: true, // Has One Shot Auto Focus Support
				exposureShootingMode: { cmd: 'c.1.shooting=', dropdown: c.CHOICES_EXPOSURESHOOTINGMODES_OTHER() },
				exposureMode: { cmd: 'c.1.exp=', dropdown: c.CHOICES_EXPOSUREMODES_OTHER() },
				aeGainLimit: true,
				aeBrightness: { cmd: 'c.1.ae.brightness=', dropdown: c.CHOICES_AEBRIGHTNESS_OTHER() },
				aePhotometry: { cmd: 'c.1.ae.photometry=', dropdown: c.CHOICES_AEPHOTOMETRY_OTHER() },
				aeFlickerReduct: { cmd: 'c.1.ae.flickerreduct=', dropdown: c.CHOICES_AEFLICKERREDUCT_OTHER() },
				aeResp: true,
				shutter: { cmd: 'c.1.me.shutter=', dropdown: c.CHOICES_SHUTTER_OTHER() }, // Has Shutter Support
				iris: { cmd: 'c.1.me.diaphragm=', dropdown: c.CHOICES_IRIS_OTHER() },
				gain: { cmd: 'c.1.me.gain=', dropdown: c.CHOICES_GAIN_OTHER() }, // Has Gain Support
				ndfilter: { cmd: 'c.1.nd.filter=', dropdown: c.CHOICES_NDFILTER_OTHER }, // Has ND Filter Support
				pedestal: { cmd: 'c.1.blacklevel=', dropdown: c.CHOICES_PEDESTAL_OTHER() }, // Has Pedestal Support
				whitebalanceMode: {cmd: 'c.1.wb=', dropdown: c.CHOICES_WBMODE_OTHER() },
				kelvin: {cmd: 'c.1.wb.kelvin=', dropdown: c.CHOICES_KELVIN_OTHER() },
				kelvinCc: { cmd: 'c.1.wb.kelvin.cc=' },
				rGain: {cmd: 'c.1.wb.shift.rgain=', dropdown: c.CHOICES_RGAIN_OTHER() },
				bGain: {cmd: 'c.1.wb.shift.bgain=', dropdown: c.CHOICES_BGAIN_OTHER() },
				wbPreset: true,
				osd: true, //on-screen display on/off per output
				verticalFlip: true, //vertical image flip (admin/config da05)
				adminTally: true, //tally light via admin/config db09-0
				presets: true, // Can Save and Recall Presets
				speedPset: true, // Has Preset Recall Speed Control
				timePset: true, // Has Preset Recall Time Control
				traces: true, //prepare, start, stop traces
				saveSettings: true, //save settings to camera (control.cgi s.action=save)
				custom: true //allow user to send custom commands
			}
		}
	]
}
