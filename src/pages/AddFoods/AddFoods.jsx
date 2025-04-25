import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFoods() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("image not present");
      return;
    }

    const formData = new FormData();
    formData.append("food", JSON.stringify(data));
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:8080/api/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        toast.success("Food added");
        setData({
          name: "",
          description: "",
          category: "",
          price: "",
        });
        setImage(assets.upload);
      }
    } catch (e) {
      toast.error("error in backend api");
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4 fw-bold text-primary">
                Add Food Item
              </h3>

              <form onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div className="mb-4 text-center">
                  <label htmlFor="image" className="d-block">
                    <img
                      src={
                        image && typeof image === "object"
                          ? URL.createObjectURL(image)
                          : image || assets.upload
                      }
                      alt="Upload"
                      className="img-thumbnail shadow-sm"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter food name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    placeholder="Write a description"
                    name="description"
                    onChange={onChangeHandler}
                    value={data.description}
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-select"
                    onChange={onChangeHandler}
                    value={data.category}
                  >
                    <option value="">-- Select Category --</option>
                    <option value="cold-drinks">Cold Drinks</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="burgers">Burgers</option>
                    <option value="biryani">Biryani</option>
                    <option value="sandwiches">Sandwiches</option>
                    <option value="pasta">Pasta</option>
                    <option value="salads">Salads</option>
                    <option value="desserts">Desserts</option>
                    <option value="soups">Soups</option>
                    <option value="seafood">Seafood</option>
                  </select>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label htmlFor="price" className="form-label fw-semibold">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    name="price"
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 fw-semibold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFoods;
