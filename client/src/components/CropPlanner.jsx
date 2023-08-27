import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Context } from "../Context/ContextProvider";
import toast from "react-hot-toast"

function CropPlanner() {
    const [crops, setCrops] = useState([]);
    const [soil, setSoil] = useState("");
    const [temp, setTemp] = useState([]);
    const [humid, setHumid] = useState([]);
    const [rain, setRain] = useState([]);
    const [selectedImg, setSelectedImg] = useState("");
    const [previewSource, setPreviewSource] = useState("");
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [fileInputState, setFileInputState] = useState("");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const FormData = require('form-data');
    const form = new FormData();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedImg(file);
        setFileInputState(e.target.value);
      };
    
      const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        };
      };

    const handleImage = (e) => {
        e.preventDefault();
        if (!selectedImg) return;
        setImage(selectedImg);
        form.append('soil', selectedImg);
        try {
            setLoading(true);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:5000/forcast-pred/',
                headers: { 
                'Cookie': 'csrftoken=pDXrKt1CD2C3KZ6oaMh7fkgFjCewR3VB', 
                },
                data : form
            };
            
            axios.request(config)
            .then((response) => {
                setCrops(response.data.list);
                setSoil(response.data.soil);
                setTemp(response.data.forcast.temperature);
                setHumid(response.data.forcast.humidity);
                setRain(response.data.forcast.rainfall);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
            setLoading(false);
            toast.success("Image uploaded");
            } catch (err) {
            console.error(err);
            toast.error("Error uploading immage");
            }    
    };

  return (
    <div>
        <Navbar />
        <h1 className="text-center mt-15  my-[10px] text-lg lg:text-4xl font-bold text-bold  text-primary ">
            Let's test your field
        </h1>
        <div className="p-4 pb-0 grid md:grid-cols-2 grid-cols-1 gap-4 pl-40">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h1 className="text-center text-2xl font-bold">Upload your field Image</h1>
                <div className="flex justify-center">
                    <input type="file"
                    accept="image/png , image/jpg, image/jpeg ,video/mp4"
                    value={fileInputState}
                    onChange={handleFileInputChange}
                    className="mt-4" 
                    />
                    <button 
                    className="bg-primary text-white rounded-lg px-4 h-8 mt-4" 
                    onClick={handleImage}
                    >Upload</button>
                </div>
            </div>
        </div>
        <div className="p-4 pb-0 grid grid-cols-1 gap-4">
            { crops?.length>0 && <div className="mt-4">
                <h2 className="text-center text-xl font-bold text-gray-600">Detected Soil Type: {soil}</h2>
                <h1 className="text-center text-2xl font-bold mt-2">Predicted Crops</h1>
                {/* <div className="flex justify-center flex-col"> */}
                    <div className="grid gap-4 grid-cols-1 my-20 mx-15 lg:mx-36 md:grid-cols-3 lg:grid-cols-4"> 
                        {crops?.map((crop,i) => (
                            <div className="flex justify-center">
                                <div className="bg-white rounded-lg shadow-lg p-4 m-4">
                                    <h1 className="text-center text-2xl font-bold">{months[i]}</h1>
                                    <h2 
                                    className="text-xl font-bold text-gray-600"
                                    >Temperature: {temp[i].toFixed(2)} `C
                                    </h2>
                                    <h2 
                                    className="text-xl font-bold text-gray-600"
                                    >Humidity: {humid[i].toFixed(2)} %
                                    </h2>
                                    <h2 
                                    className="text-xl font-bold text-gray-600"
                                    >Rainfall: {rain[i].toFixed(2)} mm
                                    </h2>
                                    <div className="flex justify-center">
                                    <button className='my-2 p-2 border border-dashed rounded-md text-green-900 bg-green-400 opacity-50 cursor-default font-bold text-xl'>{crop}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                {/*</div> */}
            </div>}
        </div>
    </div>

  )
}

export default CropPlanner