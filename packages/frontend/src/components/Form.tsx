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
  rem,
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
    <Card withBorder h="100%">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Text fw={700} fz="xl">
            Simulateur
          </Text>
          <LocationForm form={form} />
          <Group align="end" gap="sm">
            <Text w={250}>Inclinaison du toit:</Text>
            <Select
              required
              placeholder="Inclinaison de votre toit"
              data={Object.values(InclinationAngles).map((value) => ({
                value,
                label: `${value}°`,
              }))}
              w={300}
              {...form.getInputProps('inclination')}
            />
          </Group>
          <Group align="end" gap="sm">
            <Text w={250}>Orientation du toit :</Text>
            <Select
              required
              placeholder="Orientation de votre toit"
              data={Object.values(Orientation).map((value) => ({
                value,
                label: translateOrientation[value],
              }))}
              w={300}
              {...form.getInputProps('orientation')}
            />
          </Group>
          <Group align="end" gap="sm">
            <Text w={250}>Facture mensuelle d'électricité:</Text>
            <NumberInput
              required
              placeholder="Montant"
              {...form.getInputProps('monthlyBill')}
              rightSection={<Text>€</Text>}
              w={119}
              min={0}
            />
          </Group>
          {errorMessage && (
            <Alert color="red" title="Erreur">
              {errorMessage}
            </Alert>
          )}
          <Button
            mt="md"
            size="lg"
            fullWidth
            type="submit"
            style={{ fontSize: rem(22), height: rem(60) }}
          >
            Lancer la simulation
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
