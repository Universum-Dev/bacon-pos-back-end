import { Router } from 'express'

import { EmployeesController } from '../controllers/employees.controller'

const employeesRoute = Router()

employeesRoute.post('/create-employee', EmployeesController.createEmployee)
employeesRoute.post('/update-employee', EmployeesController.updateEmployee)
employeesRoute.post('/delete-employee', EmployeesController.deleteEmployee)

export default employeesRoute
