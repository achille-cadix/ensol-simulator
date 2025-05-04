export type PvgMRcalcParams = {
    lat: number;
    lon: number;
    startYear: number;
    endYear: number;
    outputformat: 'json';
    optrad: number;
}

type MonthlyIrradianceData = {
    year: number;
    month: number;
    "H(i_opt)_m": number;
}

export type PvgMRcalcResponse = {
    outputs: {
        monthly: MonthlyIrradianceData[];
    }
}
