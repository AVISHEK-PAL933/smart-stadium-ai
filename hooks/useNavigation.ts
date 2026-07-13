import { useState, useCallback } from 'react';
import {
  getRouteToDestination,
  NavigationRoute,
  STADIUM_DESTINATIONS,
  CURRENT_LOCATION,
} from '../services/navigationService';

export const useNavigation = () => {
  const [currentRoute, setCurrentRoute] = useState<NavigationRoute | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const startNavigation = useCallback((destinationId: string) => {
    const route = getRouteToDestination(destinationId);
    if (route) {
      setCurrentRoute(route);
      setActiveStep(0);
    }
  }, []);

  const endNavigation = useCallback(() => {
    setCurrentRoute(null);
    setActiveStep(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentRoute && activeStep < currentRoute.instructions.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  }, [currentRoute, activeStep]);

  return {
    destinations: STADIUM_DESTINATIONS,
    currentLocation: CURRENT_LOCATION,
    currentRoute,
    activeStep,
    startNavigation,
    endNavigation,
    nextStep,
  };
};
