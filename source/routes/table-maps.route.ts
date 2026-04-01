import { Router } from 'express'

import { TableMapsController } from '../controllers/tablemaps.controller'

const tableMapsRoute = Router()

tableMapsRoute.post('/create-table-map', TableMapsController.createTableMap)
tableMapsRoute.post('/update-table-map', TableMapsController.updateTableMap)
tableMapsRoute.post('/delete-table-map', TableMapsController.deleteTableMap)

export default tableMapsRoute
