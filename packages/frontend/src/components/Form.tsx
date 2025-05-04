import { useForm } from '@mantine/form';
import { getSimulation } from '@ensol-test/frontend/queries/simulation';
import { SimulationResponse } from '@ensol-test/types/';
import {
  Button,
  Card,
  Stack,
  Group,
  NumberInput,
  Text,
  Select,
  Alert,
} from '@mantine/core';
import {
  InclinationAngles,
  Orientation,
  EXTERNAL_SERVICE_NAME,
  PVGIS_ERROR_MESSAGE,
} from '@ensol-test/shared';
import { translateOrientation } from '../assets/translation';
import { SimulationFormValues } from '../types/form.types';
import { LocationForm } from './location/LocationForm';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  onSubmit: (results: SimulationResponse) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<SimulationFormValues>({
    initialValues: {
      latitude: undefined as number | undefined,
      longitude: undefined as number | undefined,
      inclination: undefined as InclinationAngles | undefined,
      monthlyBill: undefined as number | undefined,
      orientation: undefined as Orientation | undefined,
      address: undefined as string | undefined,
    },
    validate: {
      latitude: (value) =>
        value === undefined || value < -90 || value > 90
          ? 'La latitude doit être comprise entre -90 et 90'
          : null,
      longitude: (value) =>
        value === undefined || value < -180 || value > 180
          ? 'La longitude doit être comprise entre -180 et 180'
          : null,
      inclination: (value) =>
        !value ? 'Veuillez sélectionner une inclinaison' : null,
      monthlyBill: (value) =>
        value === undefined || value <= 0
          ? 'Veuillez entrer un montant positif'
          : null,
      orientation: (value) =>
        !value ? 'Veuillez sélectionner une orientation' : null,
      address: () => {
        if (
          form.values.latitude === undefined ||
          form.values.longitude === undefined
        )
          return 'Veuillez sélectionner une adresse valide';
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setErrorMessage(null);
      const results = await getSimulation({
        latitude: values.latitude ?? 0,
        longitude: values.longitude ?? 0,
        inclinationAngle: values.inclination ?? InclinationAngles.ANGLE_20,
        monthlyBill: values.monthlyBill ?? 0,
        orientation: values.orientation ?? Orientation.SOUTH,
      });
      onSubmit(results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.serviceName === EXTERNAL_SERVICE_NAME.PVGIS &&
          error.response?.data.originalMessage ===
            PVGIS_ERROR_MESSAGE.LOCATION_OVER_SEA
        ) {
          setErrorMessage(
            "L'adresse semble située sur la mer, veuillez renseigner une adresse valide",
          );
        }
      }
    }
  };

  return (
    <Card withBorder className="h-full">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack className="gap-4">
          <Text className="font-bold text-2xl">
            Simulateur
          </Text>
          <LocationForm form={form} />
          <Group className="items-end gap-2">
            <Text className="w-[250px]">Inclinaison du toit:</Text>
            <Select
              required
              placeholder="Inclinaison de votre toit"
              data={Object.values(InclinationAngles).map((value) => ({
                value,
                label: `${value}°`,
              }))}
              className="w-[300px]"
              {...form.getInputProps('inclination')}
            />
          </Group>
          <Group className="items-end gap-2">
            <Text className="w-[250px]">Orientation du toit :</Text>
            <Select
              required
              placeholder="Orientation de votre toit"
              data={Object.values(Orientation).map((value) => ({
                value,
                label: translateOrientation[value],
              }))}
              className="w-[300px]"
              {...form.getInputProps('orientation')}
            />
          </Group>
          <Group className="items-end gap-2">
            <Text className="w-[250px]">Facture mensuelle d'électricité:</Text>
            <NumberInput
              required
              placeholder="Montant"
              {...form.getInputProps('monthlyBill')}
              rightSection={<Text>€</Text>}
              className="w-[119px]"
              min={0}
            />
          </Group>
          {errorMessage && (
            <Alert color="red" title="Erreur">
              {errorMessage}
            </Alert>
          )}
          <Button
            className="mt-4 w-full text-lg"
            type="submit"
          >
            Lancer la simulation
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
