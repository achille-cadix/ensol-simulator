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
              <Text className="font-bold text-lg">
                Nombre de panneaux solaires recommandés :
              </Text>
              <Text>{results.numberOfSolarPanels} panneaux</Text>
            </Group>
            <Group>
              <Text className="font-bold text-lg">
                Energie annuelle produite :
              </Text>
              <Text>{results.estimatedAnnualEnergyProduction} kWh</Text>
            </Group>
            <Group>
              <Text className="font-bold text-lg">
                Économies annuelles estimées :
              </Text>
              <Text>{results.yearlySavings} €</Text>
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
