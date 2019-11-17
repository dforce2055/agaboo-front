import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import OrderController from '../../../controllers/Order';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('01-01-2019', 0),
  createData('01-02-2019', 7000),
  createData('01-03-2019', 6500),
  createData('01-04-2019', 800),
  createData('01-05-2019', 8500),
  createData('01-06-2019', 15000),
  createData('01-07-2019', 12500),
  createData('01-08-2019', 17500),
  createData('01-09-2019', 17500),
  createData('01-10-2019', 17500),
  createData('01-11-2019', 17500),
  createData('01-12-2019', 17500),
  // createData('10-12-2019', undefined),
];

export default function Chart() {
  const [pedidos, setPedidos] = React.useState([{}]);
  const [cargarDatos, setCargarDatos] = React.useState(false);


  React.useEffect(() => {

    if (!cargarDatos) {
      OrderController.allDepositsPerYear()
        .then(pedidos => {
          setPedidos(pedidos);
          setCargarDatos(true);
          console.log("resultado: ",pedidos);
        })
        .catch(error => {
          console.log("Error al traer los Pedidos del día => ", error);
        })
    }
  });

  return (
    <React.Fragment>
      <Title>Variación mensual en el año</Title>
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