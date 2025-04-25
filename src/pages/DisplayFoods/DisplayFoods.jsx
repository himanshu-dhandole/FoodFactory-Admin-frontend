import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DisplayFoods() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/food");
      if (res.status === 200) {
        setList(res.data);
      }
    } catch (err) {
      console.error("API Error: ", err);
      toast.error("Failed to fetch food list");
    }
  };

  const deleteFood = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/food/${id}`);
      if (res.status === 204) {
        setList((prevList) => prevList.filter((food) => food.id !== id));
      }
      toast.success("Food deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4 text-primary">Food Dashboard</h2>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((food, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={food.imageurl}
                      alt={food.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>
                  <td className="fw-semibold">{food.name}</td>
                  <td style={{ maxWidth: "250px" }}>{food.description}</td>
                  <td>{food.category}</td>
                  <td className="fw-bold text-success">₹{food.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteFood(food.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted">
                  No foods found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayFoods;
