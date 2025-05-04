import { SolarPanel } from "../constants/hardware";
import { InclinationAngles, Orientation } from '@ensol-test/shared';
import { InclinationEfficiencyLoss } from "../constants/efficiency";
import { SYSTEM_EFFICIENCY } from "../constants/energy";

export class SolarPannelEnergyService {
    constructor(private readonly solarPanel: SolarPanel) {
    }

    public getInstalledYearlyCapacityPerSolarPanel({ annualIrradiance, orientation, inclinationAngle }: { annualIrradiance: number, orientation: Orientation, inclinationAngle: InclinationAngles }): number {
        const pannelPowerPerArea = this.getPowerPerArea();
        const totalEfficiency = this.getTotalEfficiency({ orientation, inclinationAngle });

        const yearlyProductionPerInstalledCapacity = annualIrradiance * totalEfficiency / pannelPowerPerArea;
        const installedCapacityPerPannel = this.solarPanel.power / 1000;

        return yearlyProductionPerInstalledCapacity * installedCapacityPerPannel;
    }

    private getPowerPerArea(): number {
        return this.solarPanel.power / this.solarPanel.area / 1000;
    }

    private getTotalEfficiency({ orientation, inclinationAngle }: { orientation: Orientation, inclinationAngle: InclinationAngles }): number {
        const positionEfficiency = 1 - InclinationEfficiencyLoss[orientation][inclinationAngle];
        return positionEfficiency * this.solarPanel.efficiency * SYSTEM_EFFICIENCY;
    }
}
