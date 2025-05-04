import axios from 'axios';
import { Location } from '@ensol-test/types';
import { PvgMRcalcResponse } from '../types/pvgis-api.types';
import { EXTERNAL_SERVICE_NAME } from '@ensol-test/shared';
import { ExternalApiError } from '../types/errors/external-api.error';

const PVGIS_BASE_URL = 'https://re.jrc.ec.europa.eu/api/v5_3/';
const PVG_MRCALC_ENDPOINT = `${PVGIS_BASE_URL}/MRcalc`;

export type PvgisApiClientOptions = Location & {
    startYear: number;
    endYear: number;
}

class PvgisApiClient {
    public async fetchIrradianceDataFromPvgis({ latitude, longitude, startYear, endYear }: PvgisApiClientOptions): Promise<PvgMRcalcResponse> {
        try {
            const response = await axios.get<PvgMRcalcResponse>(PVG_MRCALC_ENDPOINT, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    startyear: startYear,
                    endyear: endYear,
                    outputformat: 'json',
                    optrad: 1,
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('PVGIS API request failed', {
                    message: error.message,
                    url: error.config?.url,
                    params: error.config?.params,
                    status: error.response?.status,
                    data: error.response?.data,
                });
                throw new ExternalApiError(EXTERNAL_SERVICE_NAME.PVGIS, error.response?.data.message, error.response?.data.details);
            } else {
                console.error('Unexpected error during PVGIS API request', error);
            }
            throw new Error('Failed to fetch irradiance data from PVGIS API ');
        }
    }
}

export const pvgisApiClient = new PvgisApiClient();