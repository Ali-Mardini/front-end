import './App.css'
import DatabaseConnection from "./components/database-connection.tsx";
import QueryComponent from "./components/query-component.tsx";
import {Chart} from "react-google-charts";
import {useEffect, useState} from "react";
import axios from 'axios';
import {FormData} from "./components/database-connection.tsx";

function App() {

        const [formData, setFormData] = useState<FormData>({
            mysqlHost: '',
            mysqlDatabase: '',
            mysqlUsername: '',
            mysqlPassword: ''
        });

        const handleFormChange = (formData: FormData) => {
            // Handle the form data received from DatabaseConnection component on change
            setFormData(formData);
            // Perform necessary operations with the data (if needed)
        };

        const [response, setResponse] = useState(null);
        const [dataForChart, setDataForChart] = useState<any[][]>([]);


    const handleQueryExecution = async (query: string) => {
            try {
                const requestBody = {
                    mysql_host: formData.mysqlHost,
                    mysql_database: formData.mysqlDatabase,
                    mysql_username: formData.mysqlUsername,
                    mysql_password: formData.mysqlPassword,
                    mysql_query: query,
                };

                const apiUrl = 'https://6581701e.dorsy.net/api//api/execute-mysql-query';

                const { data } = await axios.post(apiUrl, requestBody);
                setResponse(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    useEffect(() => {
        if (response) {
            visualizeData(response);
        }
    }, [response]);

    const visualizeData = (data: any) => {
        // Assuming data is an array of objects, each object represents a row
        // Generating a chart structure from the received data

        const chartData: any[][] = [];
        const headers: string[] = Object.keys(data[0]);

        // Create chart headers based on received data keys
        chartData.push(headers);

        // Push each row's values into the chart data
        data.forEach((row: any) => {
            const rowData: any[] = [];
            headers.forEach((header: string) => {
                rowData.push(row[header]);
            });
            chartData.push(rowData);
        });

        setDataForChart(chartData);
    };


  return (
    <>
        <DatabaseConnection onFormChange={handleFormChange} />
        <QueryComponent onQueryExecution={handleQueryExecution} />
        <div className="container mx-auto border-gray-400 p-4 mt-5">
            <Chart
                chartType="Line"
                width="100%"
                height="400px"
                data={dataForChart}
            />
        </div>
    </>
  )
}

export default App
