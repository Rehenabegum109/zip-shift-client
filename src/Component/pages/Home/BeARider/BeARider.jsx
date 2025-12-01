import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import { useLoaderData} from 'react-router';
import Swal from 'sweetalert2';

const BeARider = () => {
    const { register, control, handleSubmit } = useForm();
      const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
    const surviceCenter = useLoaderData();
//   const navigate = useNavigate();

  const regions = [...new Set(surviceCenter.map(c => c.region))];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const districtByRegion = (region) => {
    const regionDistrict = surviceCenter.filter(c => c.region === region);
    return regionDistrict.flatMap(d => d.district);
  };
  const handleRider = data=>{
        console.log(data);
        axiosSecure.post('/riders',data)
        .then(res =>{
            if(res.data.insertedId) {
                 Swal.fire({ position: "top-end", icon: "success", title: "Parcel Created! Please pay.", showConfirmButton: false, timer: 1500 })
            }
        })
  }
    return ( 
        <div>
          

            <form onSubmit={handleSubmit(handleRider)}>


        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-semibold">Rider Details</h3>
            <label className="label">Your  Name</label>
            <input type="text" {...register("Name")} className="input w-full" defaultValue={user?.displayName} />
            <label className="label"> Email</label>
            <input type="text" {...register("Email")} className="input w-full" defaultValue={user?.email} />
            
            <label className="label">Sender Address</label>
            <input type="text" {...register("Address")} className="input w-full" placeholder="Address" />
            <fieldset className="fieldset">
              <legend> District</legend>
              <select {...register("senderDistrict")} className="select">
                <option disabled>Pick a district</option>
                {senderRegion && districtByRegion(senderRegion).map((d, idx) => <option key={idx} value={d}>{d}</option>)}
                <label className="label">Region</label>
<select {...register("senderRegion")} className="select w-full">
  <option disabled>Select region</option>
  {regions.map((r, idx) => (
    <option key={idx} value={r}>{r}</option>
  ))}
</select>

              </select>
            </fieldset>
          </fieldset>

          {/* Receiver */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-semibold">More Details</h3>
            <label className="label">Driving License</label>
            <input type="text" {...register("license")} className="input w-full" placeholder="Driving License" />
            <label className="label">NID</label>
            <input type="text" {...register("nid")} className="input w-full" placeholder="NID" />
            <label className="label">BIKE</label>
            <input type="text" {...register("bike")} className="input w-full" placeholder="bike" />
           
          </fieldset>
        </div>

        <input type="submit" className="btn btn-primary text-black" value="Send Parcel" />
      </form>
        </div>
    );
};

export default BeARider;