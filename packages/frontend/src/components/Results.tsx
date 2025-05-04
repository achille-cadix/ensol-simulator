import { SimulationResponse } from '@ensol-test/types/';
import { Card, Stack, Group, Text } from '@mantine/core';

type Props = {
  results: SimulationResponse | undefined;
};

export const Results = ({ results }: Props) => {
  return (
    <Card withBorder>
      <Stack>
        {results ? (
          <>
            <Group>
              <Text fw={700} fz="l">
                Nombre de panneaux solaires recommandés :
              </Text>
              <Text>{results?.numberOfSolarPanels} panneaux</Text>
            </Group>
            <Group>
              <Text fw={700} fz="l">
                Energie annuelle produite :
              </Text>
              <Text>{results?.estimatedAnnualEnergyProduction} kWh</Text>
            </Group>
            <Group>
              <Text fw={700} fz="l">
                Économies annuelles estimées :
              </Text>
              <Text>{results?.yearlySavings} €</Text>
            </Group>
          </>
        ) : (
          <Text>
            Remplissez le formulaire pour obtenir les résultats de la simulation
          </Text>
        )}
      </Stack>
    </Card>
  );
};
