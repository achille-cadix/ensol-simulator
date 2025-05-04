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
  const [useCoordinates, setUseCoordinates] = useState(false);
  const MapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <Group align="end" gap="6px">
        <Stack>
          <LoadScript
            googleMapsApiKey={MapsApiKey || ''}
            libraries={['places', 'geometry']}
          >
            <Text w={250}>Adresse:</Text>
            {!useCoordinates && MapsApiKey ? (
              <AddressFinder form={form} />
            ) : (
              <Group>
                <NumberInput
                  required
                  placeholder="Latitude"
                  label="Latitude"
                  hideControls
                  w={119}
                  {...form.getInputProps('latitude')}
                />
                <NumberInput
                  required
                  placeholder="Longitude"
                  label="Longitude"
                  hideControls
                  w={119}
                  {...form.getInputProps('longitude')}
                />
              </Group>
            )}
          </LoadScript>
        </Stack>
      </Group>
      {MapsApiKey && (
        <Button
          mt="md"
          size="xs"
          variant="default"
          w={240}
          onClick={() => setUseCoordinates(!useCoordinates)}
        >
          Utiliser{' '}
          {useCoordinates ? 'une adresse postale' : 'des coordonnées GPS'}
        </Button>
      )}
    </>
  );
};
