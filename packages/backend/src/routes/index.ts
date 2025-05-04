import { asyncErrorMiddleware } from '@ensol-test/backend/middlewares/asyncErrorMiddleware';
import { simulationParametersSchema } from '@ensol-test/shared';
import { SimulationParameters, SimulationResponse } from '@ensol-test/types';

import express from 'express';
import { validateRequestQuery } from 'zod-express-middleware';
import { simulationController } from '../controllers/simulation.controller';

const router = express.Router();

router.get(
  '/simulations',
  validateRequestQuery(simulationParametersSchema),
  asyncErrorMiddleware<Record<string, never>, SimulationResponse, undefined, SimulationParameters>(async (req, res) => {
    const simulation = await simulationController.getSimulation(req.query);
    res.json(simulation);
  }),
);

export { router };
