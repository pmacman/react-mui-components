import type { BoxProps } from '@mui/material';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export type ProgressBarProps = {
  value: number;
  label?: string;
  color?: string;
  trackColor?: string;
  thickness?: number;
} & Omit<BoxProps, 'children'>;

/**
 * Renders a linear progress indicator with optional centered text label.
 * @param {ProgressBarProps} props
 * @param {number} props.value - Current progress value (0 to 100).
 * @param {string} props.label - Optional text or HTML appearing in the center of the bar. (e.g. '50%' or '2/3' or <b>100%</b>)
 * @param {string} props.color - Optional color of the progress portion (hex, rgb, rgba).
 * @param {string} props.trackColor - Optional color of the background track (hex, rgb, rgba).
 * @param {number} props.thickness - Optional bar height (default 10px).
 * @example
 * <ProgressBar value={50} label={'50%'} />
 *
 * <ProgressBar
 *   value={75}
 *   label={'75%'}
 *   color="red"
 *   trackColor="black"
 *   thickness={20}
 * />
 */
function ProgressBarBase(
  { value, label, color, trackColor, thickness = 30, sx, ...boxProps }: ProgressBarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const defaultProgressColor = '#008000'; // green
  const defaultTrackColor = '#b7b7b7'; // gray

  const theme = useTheme();
  const lColor = color ?? defaultProgressColor;
  const lTrackColor = trackColor ?? defaultTrackColor;
  const textColor =
    value >= 50
      ? theme.palette.getContrastText(lColor)
      : theme.palette.getContrastText(lTrackColor);
  // const textColor = progressColor ? theme.palette.getContrastText(progressColor) : 'text.secondary';

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        ...sx,
      }}
      role={'progressbar'}
      aria-label={label}
      {...boxProps}
    >
      <LinearProgress
        variant={'determinate'}
        value={value}
        sx={{
          height: thickness,
          borderRadius: thickness / 2,
          backgroundColor: lTrackColor,
          '& .MuiLinearProgress-bar': {
            backgroundColor: lColor,
            borderRadius: thickness / 2,
          },
        }}
      />
      {label && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography variant={'caption'} color={textColor}>
            <div dangerouslySetInnerHTML={{ __html: label }} />
          </Typography>
        </Box>
      )}
    </Box>
  );
}

const ProgressBar = React.memo(React.forwardRef<HTMLDivElement, ProgressBarProps>(ProgressBarBase));

export default ProgressBar;
