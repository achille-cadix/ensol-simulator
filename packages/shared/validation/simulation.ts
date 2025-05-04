import { z } from 'zod';
import { Orientation, InclinationAngles } from '../constants/orientation';

export const locationSchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
});

export const simulationParametersSchema = z.object({
    monthlyBill: z.coerce.number().int().min(0),
    orientation: z.nativeEnum(Orientation),
    inclinationAngle: z.nativeEnum(InclinationAngles),
    ...locationSchema.shape,
});

export const simulationResponseSchema = z.object({
    numberOfSolarPanels: z.coerce.number().int().min(0),
    estimatedAnnualEnergyProduction: z.coerce.number().int().min(0),
    yearlySavings: z.coerce.number().int().min(0),
});

