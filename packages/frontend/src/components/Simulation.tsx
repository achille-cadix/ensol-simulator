import { Form } from '@ensol-test/frontend/components/Form';
import { Results } from '@ensol-test/frontend/components/Results';
import { SimulationResponse } from '@ensol-test/types/';
import { SimpleGrid, Stack, Title } from '@mantine/core';
import { useState } from 'react';

export const Simulation = () => {
  const [simulationResults, setSimulationResults] = useState<
    SimulationResponse | undefined
  >();

  return (
    <Stack>
      <Title order={2}>
        Faites une simulation de votre production photovoltaïque !
      </Title>
      <SimpleGrid cols={2}>
        <Form onSubmit={setSimulationResults} />
        <Results results={simulationResults} />
      </SimpleGrid>
    </Stack>
  );
};
