import React, {useEffect, useState} from "react";
import {Bar, Doughnut, Line, Polar} from "react-chartjs-2";
//https://www.chartjs.org/
//npm i chart.js
//npm i react-chartjs-2

const Chart = () =>{
    const [chartData,setChartData] =useState({})

    const chart = () =>{
        setChartData({
            labels:['서울','경기','인천','제주도','부산','여수'],
            datasets:[
                {
                    label:'Local',
                    data:[65,60,80,81,55,54],
                    backgroundColor:'rgba(120,29,29,0.3)',
                    borderWidth:4,
                    LineTension:0
                },
                {
                    label:'Local2',
                    data:[40,30,20,50,10,60],
                    backgroundColor:'rgba(200,12,12,0.3)'
                }
            ]
        })
    }

    useEffect(()=>{
        chart()
    },[])


    return(
        <>
            <h1>chart.js</h1>
            <div style={{"width":"500px"}}>
            <Bar data={chartData} options={{
                responsive:true,
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:true,
                            fontSize:10,
                            min:-10,
                            max:20,
                            stepSize:5
                        }
                    }]
                }
            }}/>

            <Line data={chartData} />
            <Doughnut data={chartData}/>
            <Polar data={chartData}/>
            </div>

           </>
    )
}

export default Chart