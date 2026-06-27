import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import type { DonutRatio } from '@/content/books';
import { colors } from '@/lib/theme';

type Props = {
  data: readonly DonutRatio[];
  label: string;
  size?: number;
};

export function DonutChart({ data, label, size = 136 }: Props) {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;
  const slices = data.map((slice, index) => {
    const previous = data.slice(0, index).reduce((sum, item) => sum + Math.max(item.value, 0), 0);
    const fraction = slice.value / total;
    return {
      ...slice,
      dash: fraction * circumference,
      rotation: (previous / total) * 360 - 90,
    };
  });

  return (
    <View style={styles.wrap}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle cx={center} cy={center} r={radius} stroke={colors.line} strokeWidth={strokeWidth} fill="none" />
          {slices.map((slice) => {
            return (
              <G key={slice.label} origin={`${center}, ${center}`} rotation={slice.rotation}>
                <Circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${slice.dash} ${circumference - slice.dash}`}
                  strokeLinecap="butt"
                />
              </G>
            );
          })}
        </Svg>
        <View style={styles.center}>
          <Text style={styles.centerText}>{label}</Text>
        </View>
      </View>
      <View style={styles.legend}>
        {data.map((item) => (
          <View key={item.label} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label} {item.value}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  legend: {
    flex: 1,
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: colors.inkSoft,
    fontSize: 14,
    fontWeight: '700',
  },
});
