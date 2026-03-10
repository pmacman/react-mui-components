import type { BoxProps } from '@mui/material';
import { Box, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export type ProgressCircleProps = {
  value: number;
  label?: string;
  progressColor?: string;
  trackColor?: string;
  size?: number | string;
  thickness?: number;
} & Omit<BoxProps, 'children'>;

/**
 * Renders a circular static progress indicator with optional text label in the center.
 * @param {ProgressCircleProps} props
 * @param {number} props.value - Current progress value - percentage of the circle that is filled (0 to 100).
 * @param {string} props.label - Optional text or HTML appearing in the center of the progress circle. (e.g. '50%' or '2/3' or <b>100%</b>)
 * @param {string} props.progressColor - Optional color of the progress arc. Accepts any CSS color.
 * @param {string} props.trackColor - Optional color of the background track.
 * @param {number | string} props.size - Optional size of the circle (number = px; string = size, '5rem').
 * @param {string} props.thickness - Optional thickness of the stroke.
 * @example
 * <ProgressCircle value={50} label={'50%'} />
 *
 * <ProgressCircle
 *   value={75}
 *   label={'75%'}
 *   // label={'<b>75%</b>'}
 *   progressColor={'red'}
 *   trackColor={'black'}
 *   size={64}
 *   // size={'5rem'}
 *   thickness={2}
 *   // sx={{ padding: '5rem' }}
 * />
 */
function ProgressCircleBase(
  {
    value,
    label,
    progressColor,
    trackColor,
    size = 50,
    thickness = 5,
    sx,
    ...boxProps
  }: ProgressCircleProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        // Let consumers extend/override styles:
        ...sx,
      }}
      role={'progressbar'}
      aria-label={label}
      {...boxProps}
    >
      {/* Track */}
      <CircularProgress
        variant={'determinate'}
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: trackColor ?? grey[300],
          position: 'absolute',
          // Round the ends of the stroke:
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
        }}
      />
      {/* Progress */}
      <CircularProgress
        variant={'determinate'}
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color: progressColor ?? 'success.main',
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
        }}
      />
      {/* Center label */}
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
        {label && (
          <Typography variant={'caption'} color={'text.secondary'}>
            <div dangerouslySetInnerHTML={{ __html: label }} />
          </Typography>
        )}
      </Box>
    </Box>
  );
}

const ProgressCircle = React.memo(
  React.forwardRef<HTMLDivElement, ProgressCircleProps>(ProgressCircleBase),
);

export default ProgressCircle;
