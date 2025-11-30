import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const SendPercel = () => {
  const { register, control, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const surviceCenter = useLoaderData();
  const navigate = useNavigate();

  const regions = [...new Set(surviceCenter.map(c => c.region))];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = surviceCenter.filter(c => c.region === region);
    return regionDistrict.flatMap(d => d.district);
  };

  const handleSendParcel = data => {
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 100 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay ${cost} TK for sending this parcel.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I agree!"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.post("/percels", { ...data, cost, createdAt: new Date(), paymentStatus: "pending", deliveryStatus: "pending" })
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({ position: "top-end", icon: "success", title: "Parcel Created! Please pay.", showConfirmButton: false, timer: 1500 })
                .then(() => navigate("/deshboard/my-percel"));
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div>
          <label className="label">
            <input type="radio" {...register("parcelType")} value="document" defaultChecked className="radio" />
            Document
          </label>
          <label className="label">
            <input type="radio" {...register("parcelType")} value="non-document" className="radio" />
            Non-document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input type="number" {...register("parcelWeight")} className="input w-full" placeholder="Parcel Weight" />
          </fieldset>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-semibold">Sender Details</h3>
            <label className="label">Sender Name</label>
            <input type="text" {...register("senderName")} className="input w-full" defaultValue={user?.displayName} />
            <label className="label">Sender Email</label>
            <input type="text" {...register("senderEmail")} className="input w-full" defaultValue={user?.email} />
            <fieldset className="fieldset">
              <legend>Sender Region</legend>
              <select {...register("senderRegion")} className="select">
                <option disabled>Pick a region</option>
                {regions.map((region, idx) => <option key={idx} value={region}>{region}</option>)}
              </select>
            </fieldset>
            <label className="label">Sender Address</label>
            <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
            <fieldset className="fieldset">
              <legend>Sender District</legend>
              <select {...register("senderDistrict")} className="select">
                <option disabled>Pick a district</option>
                {senderRegion && districtByRegion(senderRegion).map((d, idx) => <option key={idx} value={d}>{d}</option>)}
              </select>
            </fieldset>
          </fieldset>

          {/* Receiver */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-semibold">Receiver Details</h3>
            <label className="label">Receiver Name</label>
            <input type="text" {...register("receiverName")} className="input w-full" placeholder="Receiver Name" />
            <label className="label">Receiver Email</label>
            <input type="text" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />
            <label className="label">Receiver Address</label>
            <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />
            <fieldset className="fieldset">
              <legend>Receiver Region</legend>
              <select {...register("receiverRegion")} className="select">
                <option disabled>Pick a region</option>
                {regions.map((region, idx) => <option key={idx} value={region}>{region}</option>)}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend>Receiver District</legend>
              <select {...register("receiverDistrict")} className="select">
                <option disabled>Pick a district</option>
                {receiverRegion && districtByRegion(receiverRegion).map((d, idx) => <option key={idx} value={d}>{d}</option>)}
              </select>
            </fieldset>
          </fieldset>
        </div>

        <input type="submit" className="btn btn-primary text-black" value="Send Parcel" />
      </form>
    </div>
  );
};

export default SendPercel;
