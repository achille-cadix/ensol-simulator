import { Orientation, InclinationAngles } from "@ensol-test/shared";

type InclinationLossPerOrientation = {
    [O in Orientation]: {
        [A in InclinationAngles]: number;
    };
};

export const InclinationEfficiencyLoss: InclinationLossPerOrientation = { // for 90's values see https://www.monkitsolaire.fr/blog/inclinaison-panneau-solaire
    [Orientation.SOUTH]: {
        [InclinationAngles.ANGLE_10]: 0.07,
        [InclinationAngles.ANGLE_20]: 0.02,
        [InclinationAngles.ANGLE_30]: 0,
        [InclinationAngles.ANGLE_40]: 0,
        [InclinationAngles.ANGLE_50]: 0.03,
        [InclinationAngles.ANGLE_60]: 0.07,
        [InclinationAngles.ANGLE_70]: 0.14,
        [InclinationAngles.ANGLE_80]: 0.23,
        [InclinationAngles.ANGLE_90]: 0.32,
    },
    [Orientation.EAST]: {
        [InclinationAngles.ANGLE_10]: 0.14,
        [InclinationAngles.ANGLE_20]: 0.16,
        [InclinationAngles.ANGLE_30]: 0.19,
        [InclinationAngles.ANGLE_40]: 0.23,
        [InclinationAngles.ANGLE_50]: 0.28,
        [InclinationAngles.ANGLE_60]: 0.33,
        [InclinationAngles.ANGLE_70]: 0.38,
        [InclinationAngles.ANGLE_80]: 0.44,
        [InclinationAngles.ANGLE_90]: 0.45,
    },
    [Orientation.WEST]: {
        [InclinationAngles.ANGLE_10]: 0.14,
        [InclinationAngles.ANGLE_20]: 0.16,
        [InclinationAngles.ANGLE_30]: 0.19,
        [InclinationAngles.ANGLE_40]: 0.23,
        [InclinationAngles.ANGLE_50]: 0.28,
        [InclinationAngles.ANGLE_60]: 0.33,
        [InclinationAngles.ANGLE_70]: 0.38,
        [InclinationAngles.ANGLE_80]: 0.44,
        [InclinationAngles.ANGLE_90]: 0.45,
    },
    [Orientation.SOUTH_EAST]: {
        [InclinationAngles.ANGLE_10]: 0.1,
        [InclinationAngles.ANGLE_20]: 0.07,
        [InclinationAngles.ANGLE_30]: 0.06,
        [InclinationAngles.ANGLE_40]: 0.09,
        [InclinationAngles.ANGLE_50]: 0.1,
        [InclinationAngles.ANGLE_60]: 0.15,
        [InclinationAngles.ANGLE_70]: 0.2,
        [InclinationAngles.ANGLE_80]: 0.28,
        [InclinationAngles.ANGLE_90]: 0.34,
    },
    [Orientation.SOUTH_WEST]: {
        [InclinationAngles.ANGLE_10]: 0.1,
        [InclinationAngles.ANGLE_20]: 0.07,
        [InclinationAngles.ANGLE_30]: 0.06,
        [InclinationAngles.ANGLE_40]: 0.09,
        [InclinationAngles.ANGLE_50]: 0.1,
        [InclinationAngles.ANGLE_60]: 0.15,
        [InclinationAngles.ANGLE_70]: 0.2,
        [InclinationAngles.ANGLE_80]: 0.28,
        [InclinationAngles.ANGLE_90]: 0.34,
    },
};
