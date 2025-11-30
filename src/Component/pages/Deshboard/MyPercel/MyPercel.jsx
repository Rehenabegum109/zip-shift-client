import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcel", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/percels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this parcel?")) return;
    await axiosSecure.delete(`/percels/${id}`);
    queryClient.invalidateQueries(["my-parcel", user?.email]);
  };

  const handleUpdate = async (id) => {
    await axiosSecure.patch(`/percels/${id}`, { paymentStatus: "paid" });
    queryClient.invalidateQueries(["my-parcel", user?.email]);
  };

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div>
      <h1>All of My Parcels: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost} TK</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <Link to={`/deshboard/payment/${parcel._id}`}>
                      <button className="btn btn-primary">Pay</button>
                    </Link>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td className="flex gap-2">
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary" onClick={() => handleUpdate(parcel._id)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-square hover:bg-primary" onClick={() => handleDelete(parcel._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
