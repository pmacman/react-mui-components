import type { SelectOption } from '@models/SelectOptions';
import Search from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import Chip from '@mui/material/Chip';

interface MultiSelectProps {
  label: string;
  id: string;
  options: SelectOption[];
  selectedValues: string[];
  onChange: (newValue: string[]) => void;
}

/**
 * Renders a multi-select checkbox list. Selected items are passed to the callback function as a string array.
 * @param {MultiSelectProps} props
 * @param {function} props.label - Label of select list
 * @param {function} props.id - ID of select list
 * @param {function} props.options - Object array of select list options
 * @param {function} props.selectedValues - String array of selected values
 * @param {function} props.onChange - Callback function to handle selections
 * @example
 * const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 *
 * const handleChange = (newValue: string[]) => {
 *   console.log('Selected:', newValue);
 *   setSelectedOptions(newValue);
 * };
 *
 * const myOptions: SelectOption[] = [ { key: '1', value: 'Item 1' }, { key: '2', value: 'Item 2', disabled: true } ];
 *
 * <MultiSelect
 *   label={'My Options'}
 *   id={'my-options'}
 *   options={myOptions}
 *   selectedValues={selectedOptions}
 *   onChange={handleChange}
 * />
 */
function MultiSelect({ label, id, options, selectedValues, onChange }: MultiSelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // value can be a string when autofill concatenates, so handle both cases
    const next = typeof value === 'string' ? value.split(',') : (value as string[]);
    onChange(next);
  };

  const getTextByValue = (key: string) => {
    return options.find((item) => item.key === key)?.value ?? '';
  };

  return (
    <FormControl fullWidth={true}>
      <InputLabel id={`${id}-multiselect-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-multiselect-label`}
        id={`${id}-multiselect`}
        data-testid={'multiselect'}
        value={selectedValues as string[]}
        size={'small'}
        sx={{ paddingLeft: 1 }}
        multiple
        onChange={handleChange}
        input={
          <OutlinedInput
            label={label}
            startAdornment={
              <InputAdornment position={'start'}>
                <Search />
              </InputAdornment>
            }
            sx={{ display: 'flex', alignItems: 'center' }}
          />
        }
        renderValue={(selectedValues: readonly string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedValues.map((value) => (
              <Chip key={`${id}-${value}-multiselect-chip`} label={getTextByValue(value)} />
            ))}
          </Box>
        )}
      >
        {options.map(({ key, value, disabled = false }) => (
          <MenuItem key={`${id}-${key}-multiselect-item`} value={key} disabled={disabled}>
            <Checkbox checked={selectedValues.indexOf(key) > -1} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
