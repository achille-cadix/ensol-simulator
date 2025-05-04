import { NumberInput, Group, Text, Button, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { SimulationFormValues } from '../../types/form.types';
import { useState } from 'react';
import { AddressFinder } from './AddressFinder';
import { LoadScript } from '@react-google-maps/api';

type Props = {
  form: UseFormReturnType<SimulationFormValues>;
};

export const LocationForm = ({ form }: Props) => {
  const [useGpsCoordinates, setUseGpsCoordinates] = useState(false);
  const MapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <Group className="items-end gap-[6px]">
        <Stack>
          <LoadScript
            googleMapsApiKey={MapsApiKey || ''}
            libraries={['places', 'geometry']}
          >
            <Text className="w-[250px]">Adresse:</Text>
            {!useGpsCoordinates && MapsApiKey ? (
              <AddressFinder form={form} />
            ) : (
              <Group>
                <NumberInput
                  required
                  withAsterisk={false}
                  placeholder="Latitude"
                  label="Latitude"
                  hideControls
                  className="w-[125px]"
                  {...form.getInputProps('latitude')}
                />
                <NumberInput
                  required
                  withAsterisk={false}
                  placeholder="Longitude"
                  label="Longitude"
                  hideControls
                  className="w-[125px]"
                  {...form.getInputProps('longitude')}
                />
              </Group>
            )}
          </LoadScript>
        </Stack>
      </Group>
      {MapsApiKey && (
        <Button
          className="mt-4 text-xs w-[240px]"
          variant="default"
          onClick={() => setUseGpsCoordinates(!useGpsCoordinates)}
        >
          Utiliser{' '}
          {useGpsCoordinates ? 'une adresse postale' : 'des coordonnées GPS'}
        </Button>
      )}
    </>
  );
};
