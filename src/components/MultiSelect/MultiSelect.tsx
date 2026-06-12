import type { SelectOption } from '@/types/SelectOptions';
import type { SelectChangeEvent, SxProps, Theme } from '@mui/material';
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import React, { useCallback, useMemo } from 'react';

interface MultiSelectProps {
  /** Label text for the select list field. */
  label: string;
  /** Unique base identifier for the input fields and ARIA associations. */
  id: string;
  /** Array of option configuration objects containing unique keys and values. */
  options: SelectOption[];
  /** Controlled array of currently chosen option keys. */
  selectedValues: string[];
  /** Callback triggered when items are selected or deselected. */
  onChange: (newValue: string[]) => void;
  /** Optional MUI 'sx' styles applied directly to the root container. */
  sx?: SxProps<Theme>;
}

/**
 * Renders an optimized multi-select checkbox dropdown menu. Selected items are displayed as removable Chips.
 * @example
 * const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 * const myOptions = [ { key: '1', value: 'Item 1' }, { key: '2', value: 'Item 2', disabled: true } ];
 * <MultiSelect
 *  label="My Options"
 *  id="my-options"
 *  options={myOptions}
 *  selectedValues={selectedOptions}
 *  onChange={(val) => setSelectedOptions(val)}
 * />
 */
export const MultiSelect = React.memo(function MultiSelect({
  label,
  id,
  options,
  selectedValues,
  onChange,
  sx,
}: MultiSelectProps) {
  const optionsMap = useMemo(() => {
    return new Map<string, string>(options.map((opt) => [opt.key, opt.value]));
  }, [options]);

  const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

  const handleChange = useCallback((event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    const nextValues = typeof value === 'string' ? value.split(',') : value;
    onChange(nextValues);
  }, []);

  return (
    <FormControl fullWidth={true} size='small' sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <InputLabel id={`${id}-multiselect-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-multiselect-label`}
        id={`${id}-multiselect`}
        data-testid='multiselect'
        value={selectedValues}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={`${id}-${value}-chip`}
                size='small'
                label={optionsMap.get(value) ?? value}
              />
            ))}
          </Box>
        )}
      >
        {options.map(({ key, value, disabled = false }) => (
          <MenuItem key={`${id}-${key}-item`} value={key} disabled={disabled}>
            <Checkbox checked={selectedSet.has(key)} size='small' />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default MultiSelect;
