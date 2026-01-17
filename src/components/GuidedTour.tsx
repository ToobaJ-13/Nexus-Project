// src/components/GuidedTour.tsx
import React, { useState } from 'react';
import Joyride, { Step } from 'react-joyride';
import { Button } from './ui/Button';

interface GuidedTourProps {
  steps: Step[];
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ steps }) => {
  const [run, setRun] = useState(false);

  return (
    <>
      <Button onClick={() => setRun(true)}>Start Guided Tour</Button>

      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip',
        }}
      />
    </>
  );
};
