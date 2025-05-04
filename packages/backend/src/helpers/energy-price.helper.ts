import { KWH_PRICE_2025, KWH_PRICE_INCREASE_PER_YEAR } from '../constants/energy';

export const getEnergyPriceEstimate = (year: number = new Date().getFullYear()) => {
    if (!Number.isInteger(year)) throw new Error('Years can only be integers');
    if (year < 2025) throw new Error('For years preceding 2025, use constants instead of estimating');
    return KWH_PRICE_2025 * (1 + KWH_PRICE_INCREASE_PER_YEAR) ** (year - 2025);
};
