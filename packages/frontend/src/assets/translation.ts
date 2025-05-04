import { Orientation } from "@ensol-test/shared";

export const translateOrientation: {
    [key in Orientation]: string;
} = {
    [Orientation.SOUTH]: "Sud",
    [Orientation.EAST]: "Est",
    [Orientation.WEST]: "Ouest",
    [Orientation.SOUTH_EAST]: "Sud-Est",
    [Orientation.SOUTH_WEST]: "Sud-Ouest",
};
