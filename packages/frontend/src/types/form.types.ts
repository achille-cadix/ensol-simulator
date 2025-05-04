import { InclinationAngles, Orientation } from "@ensol-test/shared";

export type SimulationFormValues = {
    latitude: number | undefined;
    longitude: number | undefined;
    inclination: InclinationAngles | undefined;
    monthlyBill: number | undefined;
    orientation: Orientation | undefined;
    address: string | undefined;
};
