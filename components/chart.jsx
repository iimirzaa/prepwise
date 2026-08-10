import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';

const data = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 50 },
  { value: 42 },
  { value: 65 },
  { value: 86 },
];

const MyChart = ({ width = 145, height = 120 }) => {
  // Derive spacing from the actual available width so points never
  // run past the container on narrow screens
  const yAxisLabelWidth = moderateScale(22);
  const usableWidth = Math.max(width - yAxisLabelWidth - 10, 40);
  const spacing = Math.max(usableWidth / (data.length - 0.5), 6);

  return (
    <View style={{ width, overflow: 'hidden' }}>
      <LineChart
        data={data}
        height={height}
        width={usableWidth}
        areaChart
        startFillColor="#764BA2"
        endFillColor="#764BA2"
        startOpacity={0.60}
        endOpacity={0.02}
        thickness={2}
        curved
        color="#764BA2"
        yAxisThickness={1}
        yAxisColor="#999"
        yAxisLabelWidth={yAxisLabelWidth}
        yAxisTextStyle={{ color: '#666', fontSize: 9 }}
        maxValue={100}
        noOfSections={5}
        stepValue={20}
        xAxisThickness={0}
        rulesColor="#D8D8D8"
        rulesThickness={1}
        rulesType="dashed"
        spacing={spacing}
        initialSpacing={6}
        customDataPoint={(item, index) => {
          const isEdge = index === 0 || index === data.length - 1;
          return isEdge ? (
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#764BA2' }} />
          ) : (
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#764BA2' }} />
          );
        }}
        isAnimated
      />
    </View>
  );
};

export default MyChart;