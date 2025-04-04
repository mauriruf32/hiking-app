import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import styles from "./HikingForm.module.css";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'; // Aquí no necesitas L
import "leaflet/dist/leaflet.css";
import iconUrl from "../../imagenes/maps-and-location.png"
import Leaflet from "leaflet";
import "./FormMap.css";

export const newicon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  iconSize: [30, 35]
});

function HikingForm() {
    const preset_name = "jvu2gwik";
    const cloud_name = "djsqt7j6v";
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedFlag, setSelectedFlag] = useState('');
    const [coordinates, setCoordinates] = useState([-31.733055555556, -60.529722222222]);
    const [popupCoordinates, setPopupCoordinates] = useState(null); // Estado para las coordenadas del Popup

    const { register, handleSubmit, setValue, setError } = useForm();
    const { createHiking, getHikingPlaceById, updateHikingPlace } = useHikings();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const params = useParams();


    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
            const data = await response.json();
            const formattedCountries = data.map((country, index) => ({
                id: index + 1,
                name: country.name.common,
                flags: country.flags.png,
            }));
            setCountries(formattedCountries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateHikingPlace(params.id, data);
        } else {
            const hikingData = { ...data, userId: user.id, flag: selectedFlag };
            createHiking(hikingData);
    
            // Actualizar las coordenadas con los valores de latitud y longitud
            setCoordinates([parseFloat(data.lat), parseFloat(data.lng)]);
        }
        navigate('/home');

    });

    const validateNumber = (value) => {
        const regex = /^-?\d+([.,]\d+)?$/;
        if (!regex.test(value)) {
            setError("duration", {
                type: "manual",
                message: "Por favor ingresa un número válido.",
            });
            return false;
        }
        return true;
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setValue("image", file.secure_url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    const handleCountryChange = (event) => {
        const selectedCountry = countries.find(country => country.name === event.target.value);
        if (selectedCountry) {
            setSelectedFlag(selectedCountry.flags);
        }
        setValue("country", event.target.value);
    };

// Popup con las coordenadas donde se hizo clic
    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;

        setPopupCoordinates({ lat, lng });
    };

    const MapEventsHandler = ({ handleMapClick }) => {
        useMapEvents({
            click: (e) => handleMapClick(e),
        });
        return null;
    };

    useEffect(() => {
        async function loadHiking() {
        if (params.id) {
         const place = await getHikingPlaceById(params.id);
          setValue('name', place.name)
          setValue('duration', place.duration)
          setValue('continent', place.continent)
          setValue('difficulty', place.difficulty)
          setValue('lat', place.lat)
          setValue('lng', place.lng)
          setValue('image', place.image)
        }
      }
      loadHiking()
    }, []);

    return (
        <div >
            <form className={styles.formcontainer} onSubmit={onSubmit}>
             <h3>{params.id ? "Editar Hiking Place" : "Crear Hiking Plaace"}</h3>
                
             <div className={styles.formRow}>
                <div className={styles.formColumn1}>
                    <h5>Nombre</h5>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Nombre'
                    {...register("name")}
                    autoFocus
                />
                    <h5>Duracion en horas</h5>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Duracion en horas'
                    {...register("duration", {
                        required: true,
                        validate: validateNumber
                    })}
                />
                    <h5>Ciudad</h5>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Ciudad'
                    {...register("continent")}
                    required
                />
                <div >
                    <h5>Dificultad</h5>
                    <select className={styles.formdropdown1} {...register("difficulty")} required>
                        <option value="">Select Difficulty</option>
                        <option value="Facil">Facil</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Dificil">Dificil</option>
                        <option value="Muy Dificil">Muy Dificil</option>
                    </select>
                    <h5>Pais</h5>
                    <select className={styles.formdropdown1} {...register("country")} required onChange={handleCountryChange}>
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h5>Latitud</h5>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Latitude'
                    {...register("lat", { required: true, validate: validateNumber })}
                />
                    <h5>Longitud</h5>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Longitude'
                    {...register("lng", { required: true, validate: validateNumber })}
                />
                </div>
               
                <div className={styles.formColumn2}>
                <h5>Imagen</h5>
                <img src={file} alt='' style={{ height: "200px", width: "350px" }}/>
                <input
                    className={styles.inputimg}
                    type='file'
                    accept="image/*"
                    onChange={uploadImage}
                />
                
                {loading && <p>Uploading image...</p>}
                <h5>Clickea en el mapa para acceder a las coordenadas si las necesitas</h5>
                <MapContainer center={coordinates} zoom={13} style={{ height: "250px", width: "350px" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapEventsHandler handleMapClick={handleMapClick} />
                    {popupCoordinates && (
                        <Marker position={[popupCoordinates.lat, popupCoordinates.lng]} icon={newicon}>
                            <Popup>
                                <h6>
                                    Coordenadas: {popupCoordinates.lat}, {popupCoordinates.lng}
                                </h6>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>

                </div>

                </div>
                               <div className={styles.formbutton}   >
                               <button type='submit'>
                    Guardar
                </button>
                               </div>

            </form>
        </div>
    );
}

export default HikingForm;



// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useHikings } from '../../Context/HikingContext';
// import { useAuth } from '../../Context/AuthContext';
// import styles from "./HikingForm.module.css";
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

// import "leaflet/dist/leaflet.css";



// function HikingForm() {
//     const preset_name = "jvu2gwik";
//     const cloud_name = "djsqt7j6v";
//     const [loading, setLoading] = useState(false);
//     const [countries, setCountries] = useState([]); // Estado para almacenar los países
//     const [selectedFlag, setSelectedFlag] = useState(''); // Estado para almacenar la URL de la bandera

//     const { register, handleSubmit, setValue, setError } = useForm();
//     const { createHiking } = useHikings();
//     const { user } = useAuth();
//     const navigate = useNavigate();
    

//     // Función para obtener los países
//     const fetchCountries = async () => {
//         try {
//             const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
//             const data = await response.json();
//             const formattedCountries = data.map((country, index) => ({
//                 id: index + 1,
//                 name: country.name.common,
//                 flags: country.flags.png,
//             }));
//             setCountries(formattedCountries); // Actualiza el estado con los países
//         } catch (error) {
//             console.error('Error fetching countries:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCountries(); // Llama a fetchCountries al montar el componente
//     }, []);

//     const onSubmit = handleSubmit((data) => {
//         const hikingData = { ...data, userId: user.id, flag: selectedFlag }; // Añadir la bandera al enviar
//         createHiking(hikingData);
//         navigate('/home');
//     });

//     const validateNumber = (value) => {
//         const regex = /^-?\d+([.,]\d+)?$/;
//         if (!regex.test(value)) {
//             setError("duration", {
//                 type: "manual",
//                 message: "Por favor ingresa un número válido.",
//             });
//             return false;
//         }
//         return true;
//     };

//     const uploadImage = async (e) => {
//         const files = e.target.files;
//         const data = new FormData();
//         data.append('file', files[0]);
//         data.append('upload_preset', preset_name);

//         setLoading(true);

//         try {
//             const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//                 method: 'POST',
//                 body: data
//             });

//             const file = await response.json();
//             setValue("image", file.secure_url); // Actualiza el valor del input "image" en el formulario
//             setLoading(false);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             setLoading(false);
//         }
//     };

//     const handleCountryChange = (event) => {
//         const selectedCountry = countries.find(country => country.name === event.target.value);
//         if (selectedCountry) {
//             setSelectedFlag(selectedCountry.flags); // Actualiza el estado con la URL de la bandera
//         }
//         setValue("country", event.target.value); // Actualiza el campo de país
//     };

//     const handleMapClick = (e) => {
//         const { lat, lng } = e.latlng;
//         alert(`Clicked at: ${lat}, ${lng}`);
//       };

//       const MapEventsHandler = ({ handleMapClick }) => {
//         useMapEvents({
//           click: (e) => handleMapClick(e),
//         });
//         return null;
//       };

 
//     return (
//         <div className={styles.formcontainer}>
//             <form className={styles.forminputs} onSubmit={onSubmit}>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Name'
//                     {...register("name")}
//                     autoFocus
//                 />
//                 <input
//                     className={styles.input}
//                     type='file'
//                     accept="image/*"
//                     onChange={uploadImage}
//                 />
//                 {loading && <p>Uploading image...</p>}

//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Duration'
//                     {...register("duration", {
//                         required: true,
//                         validate: validateNumber
//                     })}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Latitude'
//                     {...register("lat", { required: true, validate: validateNumber })}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Longitude'
//                     {...register("lng", { required: true, validate: validateNumber })}
//                 />
              
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Continent'
//                     {...register("continent")}
//                     required
//                 />
//                  <div className={styles.formdropdown} >
//                 <select {...register("difficulty")}  required>
//                     <option value="">Select Difficulty</option>
//                     <option value="Facil">Facil</option>
//                     <option value="Moderado">Moderado</option>
//                     <option value="Dificil">Dificil</option>
//                     <option value="Muy Dificil">Muy Dificil</option>
//                 </select>

//                 <select {...register("country")}  required onChange={handleCountryChange}>
//                     <option value="">Select Country</option>
//                     {countries.map(country => (
//                         <option key={country.id} value={country.name}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//                 </div>
//                 <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '500px' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <MapEventsHandler handleMapClick={handleMapClick} />
//     </MapContainer>
//                 <button type='submit'>
//                     Crear
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default HikingForm;


// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useHikings } from '../../Context/HikingContext';
// import { useAuth } from '../../Context/AuthContext';
// import styles from "./HikingForm.module.css";
// import React, { useState, useEffect } from 'react';

// function HikingForm() {
//     const preset_name = "jvu2gwik";
//     const cloud_name = "djsqt7j6v";
//     const [loading, setLoading] = useState(false);
//     const [countries, setCountries] = useState([]); // Estado para almacenar los países

//     const { register, handleSubmit, setValue, setError } = useForm();
//     const { createHiking } = useHikings();
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     // Función para obtener los países
//     const fetchCountries = async () => {
//         try {
//             const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
//             const data = await response.json();
//             const formattedCountries = data.map((country, index) => ({
//                 id: index + 1,
//                 name: country.name.common,
//                 flags: country.flags,
//             }));
//             setCountries(formattedCountries); // Actualiza el estado con los países
//         } catch (error) {
//             console.error('Error fetching countries:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCountries(); // Llama a fetchCountries al montar el componente
//     }, []);

//     const onSubmit = handleSubmit((data) => {
//         const hikingData = { ...data, userId: user.id };
//         createHiking(hikingData);
//         navigate('/home');
//     });

//     const validateNumber = (value) => {
//         const regex = /^-?\d+([.,]\d+)?$/;
//         if (!regex.test(value)) {
//             setError("duration", {
//                 type: "manual",
//                 message: "Por favor ingresa un número válido.",
//             });
//             return false;
//         }
//         return true;
//     };

//     const uploadImage = async (e) => {
//         const files = e.target.files;
//         const data = new FormData();
//         data.append('file', files[0]);
//         data.append('upload_preset', preset_name);

//         setLoading(true);

//         try {
//             const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//                 method: 'POST',
//                 body: data
//             });

//             const file = await response.json();
//             setValue("image", file.secure_url); // Actualiza el valor del input "image" en el formulario
//             setLoading(false);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={onSubmit}>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Name'
//                     {...register("name")}
//                     autoFocus
//                 />
//                 <input
//                     className={styles.input}
//                     type='file'
//                     accept="image/*"
//                     onChange={uploadImage}
//                 />
//                 {loading && <p>Uploading image...</p>}

//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Duration'
//                     {...register("duration", {
//                         required: true,
//                         validate: validateNumber
//                     })}
//                 />
//                 <select {...register("difficulty")} className={styles.input} required>
//                     <option value="">Select Difficulty</option>
//                     <option value="Facil">Facil</option>
//                     <option value="Moderado">Moderado</option>
//                     <option value="Dificil">Dificil</option>
//                     <option value="Muy Dificil">Muy Dificil</option>
//                 </select>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Latitude'
//                     {...register("lat", { required: true, validate: validateNumber })}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Longitude'
//                     {...register("lng", { required: true, validate: validateNumber })}
//                 />
//                 <select {...register("country")} className={styles.input} required>
//                     <option value="">Select Country</option>
//                     {countries.map(country => (
//                         <option key={country.id} value={country.name}>
//                             {country.name} <img src={country.flags} alt={`${country.name} flag`} width="20" />
//                         </option>
//                     ))}
//                 </select>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Continent'
//                     {...register("continent")}
//                     required
//                 />

//                 <button type='submit'>
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default HikingForm;


// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useHikings } from '../../Context/HikingContext';
// import { useAuth } from '../../Context/AuthContext';
// import styles from "./HikingForm.module.css";
// import React, { useState } from 'react';

// function HikingForm() {
//     const preset_name = "jvu2gwik";
//     const cloud_name = "djsqt7j6v";
//     const [loading, setLoading] = useState(false);

//     const { register, handleSubmit, setValue, setError } = useForm();
//     const { createHiking } = useHikings();
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const onSubmit = handleSubmit((data) => {
//         const hikingData = { ...data, userId: user.id };
//         createHiking(hikingData);
//         navigate('/home');
//     });

//     const validateNumber = (value) => {
//         const regex = /^-?\d+([.,]\d+)?$/;
//         if (!regex.test(value)) {
//             setError("duration", {
//                 type: "manual",
//                 message: "Por favor ingresa un número válido.",
//             });
//             return false;
//         }
//         return true;
//     };

//     const uploadImage = async (e) => {
//         const files = e.target.files;
//         const data = new FormData();
//         data.append('file', files[0]);
//         data.append('upload_preset', preset_name);

//         setLoading(true);

//         try {
//             const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//                 method: 'POST',
//                 body: data
//             });

//             const file = await response.json();
//             setValue("image", file.secure_url); // Actualiza el valor del input "image" en el formulario
//             setLoading(false);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             setLoading(false);
//         }
//     }

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={onSubmit}>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Name'
//                     {...register("name")}
//                     autoFocus
//                 />
//                 <input
//                     className={styles.input}
//                     type='file'
//                     accept="image/*" // Permitir solo imágenes
//                     onChange={uploadImage} // Llama a uploadImage al seleccionar un archivo
//                 />
//                 {loading && <p>Uploading image...</p>} {/* Mensaje de carga */}

//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Duration'
//                     {...register("duration", {
//                         required: true,
//                         validate: validateNumber
//                     })}
//                 />
//                 <select {...register("difficulty")}
//                     className={styles.input}
//                     required>
//                     <option value="">Select Difficulty</option>
//                     <option value="Facil">Facil</option>
//                     <option value="Moderado">Moderado</option>
//                     <option value="Dificil">Dificil</option>
//                     <option value="Muy Dificil">Muy Dificil</option>
//                 </select>
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Latitude'
//                     {...register("lat", { required: true, validate: validateNumber })}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Longitude'
//                     {...register("lng", { required: true, validate: validateNumber })}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Country'
//                     {...register("country")}
//                     required
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Flag'
//                     {...register("flag")}
//                 />
//                 <input
//                     className={styles.input}
//                     type='text'
//                     placeholder='Continent'
//                     {...register("continent")}
//                     required
//                 />
                
//                 <button type='submit'>
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default HikingForm;
