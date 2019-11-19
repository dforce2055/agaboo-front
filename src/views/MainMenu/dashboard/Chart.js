import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import OrderController from '../../../controllers/Order';


export default function Chart() {
  const [loadData, setLoadData] = React.useState(true);
  const [data,setData] = React.useState([]);

  React.useEffect(() => {
    if (loadData) { //Al cargar la pagina, se llenaran los datos del chart
      OrderController.allDepositsPerYear()
        .then(result=>{
          if (result) {
            console.log(result)
            setData(result);
          }
        })
        .catch(error =>{
          console.log("Error al traer los Pedidos del día => ", error)
        });
        setLoadData(false) //Finalizo la carga de datos
    }
  });

  return (
    <React.Fragment>
      <Title>Variación mensual en el año</Title>
      <ResponsiveContainer>
      
        <LineChart
          data={data} //Paso data con la informacion al chart
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