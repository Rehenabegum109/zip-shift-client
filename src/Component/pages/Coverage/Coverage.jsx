import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const serviceCenters =useLoaderData();
  const mapRef =useRef(null)
  console.log(serviceCenters)

  const handleSearch =e =>{
    e.preventDefault();
    const location =e.target.location.value
    const district =serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
    if(district) {
      const coord =[district.latitude,district.longitude];
      console.log(coord,district)
      mapRef.current.flyTo(coord,14)
    }
  }


  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4 text-center">We are available in 64 districts</h1>

      
        {/* Search Button */}

        <form onSubmit={handleSearch}>
        <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className="grow" name='location' placeholder="Search" />
  <kbd className="kbd kbd-sm">⌘</kbd>
  <kbd className="kbd kbd-sm">K</kbd>
</label>

        </form>



      <div className="border w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
          ref ={mapRef}
          // <-- পুরো parent div ভর্তি হবে
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
{
    serviceCenters.map((center,index) => <Marker key={index} position={[center.latitude,center.longitude]}>
            <Popup>
             <strong>{center.district}</strong>  <br /> Service Area :{center.covered_area.join(', ')}
            </Popup>
          </Marker>)
}

          
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

// import React, { useRef, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useLoaderData } from "react-router";

// const Coverage = () => {
//   const serviceCenters = useLoaderData() || [];

//   const center = [23.6850, 90.3563]; 
//    const mapRef = useRef();
//      const markerRefs = useRef({}); 
//   const [search, setSearch] = useState("");

//     const handleSearch = () => {
//     const district = serviceCenters.find(
//       (d) => d.district.toLowerCase() === search.toLowerCase()
//     );
//     if (district && mapRef.current) {
//       const { latitude, longitude } = district;
//       mapRef.current.setView([latitude, longitude], 12); // zoom to marker

//       // Open popup programmatically
//       const marker = markerRefs.current[district.district];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   };

//   // Bangladesh center

//   return (
//     <div className="p-4">
//       <h1 className="text-4xl mb-4 text-center">We are available in 64 districts</h1>
//            {/* Search Bar */}
//       <div className="mb-4 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search District..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-l-md w-64"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white p-2 rounded-r-md"
//         >
//           Search
//         </button>
//       </div>

//       <div className="border w-full h-[800px]">
//         <MapContainer center={center} zoom={7} scrollWheelZoom={false} className="w-full h-full"            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Marker for each district */}
//           {serviceCenters.map((district, idx) => (
//             <Marker key={idx} position={[district.latitude, district.longitude]}>
//               {/* Tooltip shows on hover */}
//               <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
//                 <strong>{district.district}</strong>
//               </Tooltip>

//               {/* Popup shows on click */}
//               <Popup>
//                 <h2 className="font-bold">{district.district}</h2>
//                 <p>
//                   Covered Area: {district.covered_area.join(", ")}
//                 </p>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Coverage;

