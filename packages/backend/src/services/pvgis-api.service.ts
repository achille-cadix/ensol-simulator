import { Location } from '@ensol-test/types';
import { pvgisApiClient } from '../clients/pvgis-api.client';

const LAST_YEAR_OF_DATA = 2023;
const YEARS_TO_TAKE_INTO_ACCOUNT = 10; // We'll base our calculation on the last 10 years of data to be more accurate and while taking potential climatic variations into account

class PvgisService {
    public async getAnnualIrradianceForLocation({ latitude, longitude }: Location): Promise<number> {
        const firstYearOfData = LAST_YEAR_OF_DATA - YEARS_TO_TAKE_INTO_ACCOUNT;
        const annualIrradianceData = await pvgisApiClient.fetchIrradianceDataFromPvgis({
            latitude,
            longitude,
            startYear: firstYearOfData,
            endYear: LAST_YEAR_OF_DATA,
        });
        const annualIrradiance = annualIrradianceData.outputs.monthly.reduce((acc, month) => acc + month["H(i_opt)_m"], 0) / YEARS_TO_TAKE_INTO_ACCOUNT;

        return annualIrradiance;
    }
}

export const pvgisService = new PvgisService();
