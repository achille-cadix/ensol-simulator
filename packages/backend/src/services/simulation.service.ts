import { SimulationParameters, SimulationResponse } from '@ensol-test/types';
import { pvgisService } from '../services/pvgis-api.service';
import { DUAL_SUN_FLASH_425_SHINGLE_BLACK } from '../constants/hardware';
import { IDEAL_SOLAR_YEARLY_PRODUCTION_RATIO } from '../constants/energy';
import { getEnergyPriceEstimate } from '../helpers/energy-price.helper';
import { SolarPannelEnergyService } from './solar-pannel-energy.service';

class SimulationService {
    public async getSimulation({ monthlyBill, orientation, inclinationAngle, latitude, longitude }: SimulationParameters): Promise<SimulationResponse> {
        const annualIrradiance = await pvgisService.getAnnualIrradianceForLocation({ latitude, longitude });

        const solarPannelEnergyService = new SolarPannelEnergyService(DUAL_SUN_FLASH_425_SHINGLE_BLACK);
        const installedYearlyCapacityPerPannel = solarPannelEnergyService.getInstalledYearlyCapacityPerSolarPanel({ annualIrradiance, orientation, inclinationAngle });


        const energyPrice = getEnergyPriceEstimate();
        const installationCapacityNeeded = this.getInstallationCapacityNeeded(monthlyBill, energyPrice);

        const numberOfSolarPanels = Math.ceil(installationCapacityNeeded / installedYearlyCapacityPerPannel);
        const estimatedAnnualEnergyProduction = numberOfSolarPanels * installedYearlyCapacityPerPannel;

        const yearlySavings = estimatedAnnualEnergyProduction * energyPrice;

        return {
            numberOfSolarPanels,
            estimatedAnnualEnergyProduction: Math.round(estimatedAnnualEnergyProduction),
            yearlySavings: Math.round(yearlySavings),
        };
    }

    private getInstallationCapacityNeeded(monthlyBill: number, energyPrice: number): number {
        const annualConsumption = monthlyBill * 12 / energyPrice;
        return annualConsumption * IDEAL_SOLAR_YEARLY_PRODUCTION_RATIO;
    }
}

export const simulationService = new SimulationService();
