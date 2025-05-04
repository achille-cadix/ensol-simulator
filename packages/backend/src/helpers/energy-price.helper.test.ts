import { getEnergyPriceEstimate } from './energy-price.helper';
import { KWH_PRICE_2025, KWH_PRICE_INCREASE_PER_YEAR } from '../constants/energy';
import { describe, it, expect } from '@jest/globals';

describe('getEnergyPriceEstimate', () => {
    it('should throw error when trying to estimate price for non-integer years', () => {
        expect(() => getEnergyPriceEstimate(2025.5)).toThrow('Years can only be integers');
    });

    it('should throw error when trying to estimate price for years preceding 2025', () => {
        expect(() => getEnergyPriceEstimate(2024)).toThrow('For years preceding 2025, use constants instead of estimating');
    });

    it('should return fixed 2025 price for 2025', () => {
        const result = getEnergyPriceEstimate(2025);
        expect(result).toBe(KWH_PRICE_2025);
    });

    it('should calculate correct price for future years', () => {
        const year = 2026;
        const expected = KWH_PRICE_2025 * (1 + KWH_PRICE_INCREASE_PER_YEAR);
        const result = getEnergyPriceEstimate(year);
        expect(result).toBe(expected);
    });

    it('should use current year when no parameter is provided', () => {
        const currentYear = new Date().getFullYear();
        const result = getEnergyPriceEstimate();
        const expected = KWH_PRICE_2025 * (1 + KWH_PRICE_INCREASE_PER_YEAR) ** (currentYear - 2025);
        expect(result).toBe(expected);
    });
}); 
