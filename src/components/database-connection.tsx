import {ChangeEvent, useState} from "react";

export interface DatabaseConnectionProps {
    onFormChange: (formData: FormData) => void;
}

export interface FormData {
    mysqlHost: string;
    mysqlDatabase: string;
    mysqlUsername: string;
    mysqlPassword: string;
}

const DatabaseConnection: React.FC<DatabaseConnectionProps> = ({ onFormChange }) => {
    const [formData, setFormData] = useState<FormData>({
        mysqlHost: '',
        mysqlDatabase: '',
        mysqlUsername: '',
        mysqlPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
        // Pass the form data to the parent component on change
        onFormChange(formData);
    };

    return (
        <div className="container mx-auto border border-gray-400 p-4 mt-5">
            <h1 className="text-lg font-bold mb-4">MySQL Data</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mysqlHost" type="text" onChange={handleChange} placeholder="Enter MySQL host"/>
                </div>

                <div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mysqlDatabase" type="text" onChange={handleChange} placeholder="Enter MySQL database"/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

                <div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mysqlUsername" type="text" onChange={handleChange} placeholder="Enter MySQL username"/>
                </div>

                <div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mysqlPassword" type="password" onChange={handleChange} placeholder="Enter MySQL password"/>
                </div>

            </div>
        </div>
    );
};

export default DatabaseConnection;