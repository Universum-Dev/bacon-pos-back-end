import { Router } from 'express'

import { SettingsController } from '../controllers/settings.controller'

const settingsRoute = Router()

settingsRoute.post('/update-settings', SettingsController.updateSettings)
settingsRoute.post('/update-device-information', SettingsController.updateDeviceInformation)

export default settingsRoute
