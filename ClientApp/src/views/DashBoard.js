import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,LinearScale,BarElement,Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const data_inicio_donut = {
    labels: ['Sin resultados'],
    datasets: [
        {
            data: [0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
        },
    ],
};


const data_inicio_bar = {
    labels: ['Sin resultados'],
    datasets: [
        {
            label: 'Cantidad',
            data: [0],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const DashBoard = () => {

    const [config, setConfig] = useState({})
    const [dataDonut, setDataDonut] = useState(data_inicio_donut)
    const [dataBar, setDataBar] = useState(data_inicio_bar)

    const optionsBar = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };
    const obtenerConfiguracion = () => {
        const api = fetch("api/utilidad/Dashboard")
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                let d = dataJson;

                let lblsBar = d.ventasporDias.map((item) => { return item.fecha })
                let dtaBar = d.ventasporDias.map((item) => { return item.total } )

                let lblsDonut = d.productosVendidos.map((item) => { return item.producto })
                let dtaDonut = d.productosVendidos.map((item) => { return item.total })

                let modeloBar = {
                    labels: lblsBar,
                    datasets: [
                        {
                            label: 'Cantidad',
                            data: dtaBar,
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ]
                };

                let modeloDonut = {
                    labels: lblsDonut,
                    datasets: [
                        {
                            data: dtaDonut,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        },
                    ],
                }

                if (d.ventasporDias.length < 1)
                    setDataBar(data_inicio_bar)
                else
                    setDataBar(modeloBar)

                if (d.productosVendidos.length < 1)
                    setDataDonut(data_inicio_donut)
                else
                    setDataDonut(modeloDonut)
                
                setConfig(d)
            }).catch((error) => {
                console.log("error")
            })

    }
    useEffect(() => {
        obtenerConfiguracion()
    },[])

    return (
        <>
            <div className="row">

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Cantidad de Ventas</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{ (config.totalVentas!= undefined) ? config.totalVentas : "0" }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-shopping-basket fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Ingresos por Ventas</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{(config.totalIngresos != undefined) ? config.totalIngresos : "0"}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Total Productos
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{(config.totalProductos != undefined) ? config.totalProductos : "0"}</div>
                                        </div>
                                        <div className="col">
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Total Categorias
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{(config.totalCategorias != undefined) ? config.totalCategorias : "0"}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-tags fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary">
                            <h6 className="m-0 font-weight-bold text-white">Ventas de los ultimos 7 días</h6>

                        </div>
                        <div className="card-body">
                            <div style={{height:350}}>
                                <Bar options={optionsBar} data={dataBar} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary">
                            <h6 className="m-0 font-weight-bold text-white">Productos más vendidos</h6>
                          
                        </div>
                        <div className="card-body">
                            <div style={{ height: 350 }}>
                                <Doughnut options={optionsBar} data={dataDonut} />
                            </div>
                            
                        </div>
                    </div>
                </div>

               
            </div>
        </>
    )
}

export default DashBoard;