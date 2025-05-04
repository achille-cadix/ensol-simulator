import { SimulationFormValues } from '@ensol-test/frontend/types/form.types';
import { UseFormReturnType } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Popover, TextInput, Text } from '@mantine/core';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useDebouncedValue } from '@mantine/hooks';

type Props = {
  form: UseFormReturnType<SimulationFormValues>;
};

export const AddressFinder = ({ form }: Props) => {
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [placePredictions, setPlacePredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);
  const [debouncedQuery] = useDebouncedValue(searchQuery, 300);

  useEffect(() => {
    const initAutocompleteService = () => {
      if (window.google?.maps?.places?.AutocompleteService) {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      } else {
        setTimeout(initAutocompleteService, 1000);
      }

      return () => {
        setSessionToken(null);
      };
    };

    initAutocompleteService();
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!debouncedQuery || !sessionToken) return;

      try {
        const service = new google.maps.places.AutocompleteService();
        const response = await service.getPlacePredictions({
          input: debouncedQuery,
          componentRestrictions: { country: 'fr' },
          sessionToken: sessionToken,
          types: ['address'],
        });
        setPlacePredictions(response.predictions);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPlacePredictions([]);
      }
    };

    fetchPredictions();
  }, [debouncedQuery, sessionToken]);

  const selectPlaceFromPrediction = async (
    place: google.maps.places.AutocompletePrediction,
  ) => {
    if (!window.google?.maps?.Geocoder) {
      console.error('Google Maps Geocoder not available');
      return;
    }

    const geocoder = new google.maps.Geocoder();
    try {
      if (!place) return;
      const results = await geocoder.geocode({ placeId: place.place_id });
      if (results.results[0]) {
        const location = results.results[0].geometry.location;
        form.setFieldValue('latitude', location.lat());
        form.setFieldValue('longitude', location.lng());
        setSearchQuery(results.results[0].formatted_address);
        setPlacePredictions([]);
        setDisplayPredictions(false);
      }
    } catch (error) {
      console.error('Error geocoding place:', error);
    }
  };

  return (
    <>
      <Popover width="target" position="bottom">
        <Popover.Target>
          <TextInput
            required
            placeholder="Adresse"
            w={300}
            {...form.getInputProps('address')}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayPredictions(true);
            }}
            onFocus={() => {
              setDisplayPredictions(true);
            }}
            value={searchQuery}
          />
        </Popover.Target>
        {placePredictions.length > 0 && displayPredictions && (
          <Popover.Dropdown>
            {placePredictions.map((prediction, index) => (
              <div
                key={index}
                onClick={() => selectPlaceFromPrediction(prediction)}
                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <Text className="font-medium">
                  {prediction.structured_formatting.main_text}
                </Text>
                <Text className="text-sm text-gray-500">
                  {prediction.structured_formatting.secondary_text}
                </Text>
              </div>
            ))}
          </Popover.Dropdown>
        )}
      </Popover>
      {form.values.latitude && form.values.longitude && (
        <GoogleMap
          mapContainerStyle={{
            width: '400px',
            height: '250px',
          }}
          center={{
            lat: form.values.latitude,
            lng: form.values.longitude,
          }}
          zoom={19}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'satellite',
            tilt: 0,
            heading: 0,
            panControl: false,
            tiltInteractionEnabled: false,
            rotateControl: false,
          }}
        >
          <MarkerF
            position={{
              lat: form.values.latitude,
              lng: form.values.longitude,
            }}
          />
        </GoogleMap>
      )}
    </>
  );
};
