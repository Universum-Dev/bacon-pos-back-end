import { Router } from 'express'

import { AccountController } from '../controllers/account.controller'

const accountRoute = Router()

accountRoute.post('/update-logo-information', AccountController.updateLogoInformation)
accountRoute.post('/update-general-information', AccountController.updateGeneralInformation)
accountRoute.post('/update-contact-information', AccountController.updateContactInformation)

export default accountRoute
