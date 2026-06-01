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

const DEFAULT_PROGRESS_COLOR = 'success.main';
const DEFAULT_TRACK_COLOR = 'grey.300';

function resolveThemeColor(theme: Theme, color: string): string {
  const value = color.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, theme.palette);

  return typeof value === 'string' ? value : color;
}

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

    const resolvedProgressColor = resolveThemeColor(theme, progressColor);
    const resolvedTrackColor = resolveThemeColor(theme, trackColor);

    // Calculate exact contrast colors explicitly
    const textOverTrack = theme.palette.getContrastText(resolvedTrackColor);
    const textOverProgress = theme.palette.getContrastText(resolvedProgressColor);

    const clampedValue = Math.min(Math.max(value, 0), 100);

    // Reusable text style configuration
    const baseLabelStyle: SxProps<Theme> = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      fontFamily: theme.typography.fontFamily,
      ...(Array.isArray(labelSx) ? labelSx : [labelSx]),
    };

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
          width: '100%',
          ...(Array.isArray(sx) ? sx : [sx]),
        }}
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
          <>
            {/* LAYER 1: Default Text (Visible over the background track color) */}
            <Typography
              component='div'
              sx={{
                ...baseLabelStyle,
                color: textOverTrack,
              }}
            >
              {label}
            </Typography>

            {/* LAYER 2: Clipped Overlay Text (Visible strictly over the filled progress bar) */}
            <Typography
              component='div'
              sx={{
                ...baseLabelStyle,
                color: textOverProgress,
                // Clips this element to only show up where the progress bar exists
                clipPath: `inset(0 ${100 - clampedValue}% 0 0)`,
                transition: theme.transitions.create('clip-path', {
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              {label}
            </Typography>
          </>
        )}
      </Box>
    );
  }),
);

export default ProgressBar;
