import { z } from 'zod';
import { simulationParametersSchema, simulationResponseSchema, locationSchema } from '@ensol-test/shared';

export type SimulationParameters = z.infer<typeof simulationParametersSchema>;

export type SimulationResponse = z.infer<typeof simulationResponseSchema>;

export type Location = z.infer<typeof locationSchema>;
