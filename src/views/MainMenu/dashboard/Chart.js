import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('10-05-2019', 0),
  createData('10-06-2019', 7000),
  createData('10-07-2019', 6500),
  createData('10-08-2019', 800),
  createData('10-09-2019', 8500),
  createData('10-10-2019', 15000),
  createData('10-11-2019', 12500),
  createData('10-12-2019', 17500),
  createData('10-12-2019', undefined),
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Mensualmente</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
               Ganancias($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}