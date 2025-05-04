import { httpClient } from '@ensol-test/frontend/backend/axios';

import { SimulationParameters } from '@ensol-test/types/';

export const getSimulation = async (parameters: SimulationParameters) => {
  const response = await httpClient.get('/simulations', { params: parameters });
  return response.data;
};
