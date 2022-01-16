import Router from 'express'
import isolaRoutes from "./isola.rte";
import patientRoutes from "./patient.rte";
import tracingRoutes from "./tracing.rte";
import usermgrRoutes from "./usermgr.rte";
import vaccRoutes from "./vacc.rte";

const routes = Router()

routes.use('/isola', isolaRoutes)
routes.use('/patient', patientRoutes)
routes.use('/tracing', tracingRoutes)
routes.use('/usermgr', usermgrRoutes)
routes.use('/vacc', vaccRoutes)

export default routes

/*

const routes = Router()

routes.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
routes.use('/api/users', userRoutes)
routes.use('/api/products', productRoutes)
routes.use('/api/sessions', sessionRoutes)
routes.use('/api/roles', roleRoutes)
routes.use('/api/event/vaccine', vaccineEventRoutes)
routes.use('/api/patients', patientRoutes)
routes.use('/api/tracings', tracingRoutes)
routes.use('/api/isolations', isolationRoutes)

export default routes

*/