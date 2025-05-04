import { SimulationParameters, SimulationResponse } from '@ensol-test/types';
import { simulationService } from '../services/simulation.service';

class SimulationController {
    async getSimulation({ monthlyBill, orientation, inclinationAngle, latitude, longitude }: SimulationParameters): Promise<SimulationResponse> {
        const simulation = await simulationService.getSimulation({ monthlyBill, orientation, inclinationAngle, latitude, longitude });
        return simulation;
    }
}

export const simulationController = new SimulationController();
