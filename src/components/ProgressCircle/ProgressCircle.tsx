import type { BoxProps } from '@mui/material';
import { Box, CircularProgress, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

export type ProgressCircleProps = {
  /** Current progress value - percentage of the circle that is filled (0 to 100). */
  value: number;
  /** Optional text appearing in the center of the progress circle. */
  label?: string;
  /** Optional MUI 'sx' styles specifically for styling the centered label text. */
  labelSx?: SxProps<Theme>;
  /** Optional color of the progress arc. Accepts any CSS color or theme palette path. */
  progressColor?: string;
  /** Optional color of the background track. */
  trackColor?: string;
  /** Optional size of the circle (number = px; string = size, e.g., '5rem', default 50). */
  size?: number | string;
  /** Optional thickness of the stroke (default 5). */
  thickness?: number;
} & Omit<BoxProps, 'children'>;

const DEFAULT_PROGRESS_COLOR = 'success.main';
const DEFAULT_TRACK_COLOR = 'grey.300';

/**
 * Renders a circular static progress indicator with optional text label in the center.
 * @param {ProgressCircleProps} props
 * @param {number} props.value - Current progress value - percentage of the circle that is filled (0 to 100).
 * @param {string} props.label - Optional text appearing in the center of the progress circle. (e.g. '50%' or '2/3')
 * @param {SxProps<Theme>} [props.labelSx] - Optional MUI 'sx' styles specifically for styling the centered label text.
 * @param {SxProps<Theme>} [props.sx] - Optional MUI 'sx' styles applied directly to the root container element.
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
 *   labelSx={{ fontSize: '1.5rem' }}
 *   sx={{ padding: '2rem' }}
 *   progressColor={'red'}
 *   trackColor={'black'}
 *   size={64}
 *   // size={'5rem'}
 *   thickness={2}
 * />
 */
export const ProgressCircle = React.memo(
  React.forwardRef<HTMLDivElement, ProgressCircleProps>(function ProgressCircle(
    {
      value,
      label,
      labelSx,
      progressColor = DEFAULT_PROGRESS_COLOR,
      trackColor = DEFAULT_TRACK_COLOR,
      size = 50,
      thickness = 5,
      sx,
      ...boxProps
    },
    ref,
  ) {
    // Ensure value stays cleanly between 0 and 100 for visual and screen reader parity
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <Box
        {...boxProps}
        ref={ref}
        role='progressbar'
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        sx={{
          position: 'relative',
          display: 'inline-flex',
          ...(Array.isArray(sx) ? sx : [sx]),
        }}
      >
        {/* Track Circle */}
        <CircularProgress
          variant='determinate'
          value={100}
          size={size}
          thickness={thickness}
          sx={{
            color: trackColor,
            position: 'absolute',
            '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
          }}
        />
        {/* Progress Arc */}
        <CircularProgress
          variant='determinate'
          value={clampedValue}
          size={size}
          thickness={thickness}
          sx={{
            color: progressColor,
            '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
          }}
        />
        {/* Center Label Containment */}
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
            <Typography
              variant='caption'
              sx={{
                color: 'text.secondary',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                textShadow: '0px 0px 2px rgba(255, 255, 255, 0.8)',
                ...(Array.isArray(labelSx) ? labelSx : [labelSx]),
              }}
            >
              {label}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }),
);

export default ProgressCircle;
