import { LayoutStack } from '@components/Layout/LayoutStack';
import MultiSelect from '@components/MultiSelect';
import ProgressBar from '@components/ProgressBar';
import ProgressCircle from '@components/ProgressCircle';
import type { SelectOption } from '@models/SelectOptions';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

function Home() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (newValue: string[]) => {
    console.log('Selected:', newValue);
    setSelectedOptions(newValue);
  };

  const options: SelectOption[] = [
    { key: '1', value: 'Item 1' },
    { key: '2', value: 'Item 2' },
    { key: '3', value: 'Item 3', disabled: true },
    { key: '4', value: 'Item 4' },
  ];

  return (
    <>
      <Typography variant='h1' component='h1'>
        Custom MUI Components
      </Typography>

      <div style={{ width: '50%' }}>
        <LayoutStack>
          <Box>
            <Typography variant='h2' component='h2'>
              Multi-select list
            </Typography>

            <MultiSelect
              label={'My Options'}
              id={'my-options'}
              options={options}
              selectedValues={selectedOptions}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant='h2' component='h2'>
              Progress bar
            </Typography>

            <ProgressBar value={50} label={'50%'} />
          </Box>
          <Box>
            <Typography variant='h2' component='h2'>
              Progress circle
            </Typography>

            <ProgressCircle value={50} label={'50%'} size={100} />
          </Box>
        </LayoutStack>
      </div>
    </>
  );
}

export default Home;
