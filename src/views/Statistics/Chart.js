import React from 'react';
import {Pie,Bar} from 'react-chartjs-2';
import './Chart.css';
import Container from '@material-ui/core/Container';


//Rellenarse con props de labels y data
const data = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ]
};

export default function Chart() {

    return (      
      <React.Fragment>
        <Container >
         {/*Posiciono los componenetes estadisticos en el medio*/}
        <div className="statistics-wrapper">
        <div className="wrapper"> {/* Envuelvo el componente*/}
          <div className="component-wrapper"> {/*Centra y da tamaño a la imagen*/}
          <Pie          //Llamo a componente Chart en forma de Torta
          data={data}
          options={{
            title:{
              display:true,
              text:'Cantidad de productos',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            } 
          }}
        />
          </div>       
        </div>

        <div className="wrapper">
          <div className="component-wrapper">
          <Bar  //Llamo a componente Chart en forma de barras          
          data={data}
          options={{
            title:{
              display:true,
              text:'Cantidad de pedidos por mes',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            } 
          }}
        />
          </div>       
        </div>
</div>

        </Container>
      </React.Fragment>
      
      
    );
};
