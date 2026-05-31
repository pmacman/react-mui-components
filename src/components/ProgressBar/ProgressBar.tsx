import type { BoxProps } from '@mui/material';
import { Box, LinearProgress, Typography } from '@mui/material';
import { type SxProps, type Theme, useTheme } from '@mui/material/styles';
import React from 'react';

export type ProgressBarProps = {
  /** Current progress value (0 to 100). */
  value: number;
  /** Optional text appearing in the center of the bar. */
  label?: string;
  /** Optional MUI 'sx' styles specifically for styling the centered label text. */
  labelSx?: SxProps<Theme>;
  /** Optional color of the progress portion (hex, rgb, rgba, or theme palette path). */
  progressColor?: string;
  /** Optional color of the background track (hex, rgb, rgba, or theme palette path). */
  trackColor?: string;
  /** Optional bar height in pixels (default 30). */
  thickness?: number;
} & Omit<BoxProps, 'children'>;

const DEFAULT_PROGRESS_COLOR = '#008000'; // green
const DEFAULT_TRACK_COLOR = '#b7b7b7'; // gray

/**
 * Renders a linear progress indicator with an optional centered text label.
 * @param {ProgressBarProps} props
 * @param {number} props.value - Current progress value (0 to 100).
 * @param {string} [props.label] - Optional text appearing in the center of the bar (e.g. '50%', '2/3').
 * @param {SxProps<Theme>} [props.labelSx] - Optional MUI 'sx' styles specifically for styling the centered label text.
 * @param {SxProps<Theme>} [props.sx] - Optional MUI 'sx' styles applied directly to the root container element.
 * @param {string} [props.progressColor] - Optional color of the progress portion (hex, rgb, rgba, or theme palette path).
 * @param {string} [props.trackColor] - Optional color of the background track (hex, rgb, rgba, or theme palette path).
 * @param {number} [props.thickness] - Optional bar height in pixels (default 30).
 * @example
 * <ProgressBar value={50} label="50%" />
 *
 * <ProgressBar
 *   value={75}
 *   label="75%"
 *   labelSx={{ fontSize: '1.5rem' }}
 *   sx={{ padding: '2rem' }}
 *   progressColor="error.main"
 *   trackColor="#e0e0e0"
 *   thickness={40}
 * />
 */
export const ProgressBar = React.memo(
  React.forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
    {
      value,
      label,
      labelSx,
      progressColor = DEFAULT_PROGRESS_COLOR,
      trackColor = DEFAULT_TRACK_COLOR,
      thickness = 30,
      sx,
      ...boxProps
    },
    ref,
  ) {
    const theme = useTheme();

    // Determine readable text color based on progress position
    const textColor =
      value >= 50
        ? theme.palette.getContrastText(progressColor)
        : theme.palette.getContrastText(trackColor);

    // Ensure value stays between 0 and 100 for ARIA and visual rendering
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          width: '100%',
          ...sx,
        }}
        role='progressbar'
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...boxProps}
      >
        <LinearProgress
          variant='determinate'
          value={clampedValue}
          sx={{
            height: thickness,
            borderRadius: thickness / 2,
            backgroundColor: trackColor,
            '& .MuiLinearProgress-bar': {
              backgroundColor: progressColor,
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
            {/* Rendered as a 'div' to support complex elements without breaking HTML specs */}
            <Typography
              variant='caption'
              component='div'
              sx={{
                color: textColor,
                fontSize: '1.125rem',
                fontWeight: 'bold',
                textShadow:
                  value >= 50 ? '0px 1px 2px rgba(0,0,0,0.4)' : '0px 1px 2px rgba(255,255,255,0.6)',
                ...labelSx,
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

export default ProgressBar;
