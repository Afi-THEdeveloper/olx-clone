import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseContext, AuthContext } from "../../store/Contexts";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [Pname, setPname] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const { db, storage } = useContext(FirebaseContext);
  const date = new Date().toDateString();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validation checks
    const validationErrors = {};
    if (!Pname) {
      validationErrors.Pname = "Product name is required";
    }
    if (!category) {
      validationErrors.Category = "Category is required";
    }
    if (!price) {
      validationErrors.Price = "Price is required";
    }
    if (price < 0) {
      validationErrors.Price = "please enter a valid price";
    }
    if (!image) {
      validationErrors.Image = "Image is required";
    }

    

    if (Object.keys(validationErrors).length === 0) {
      const storageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(storageRef, image).then((reference) => {
        getDownloadURL(reference.ref).then((url) => {
          addDoc(collection(db, "products"), {
            productName: Pname,
            category: category,
            price: price,
            url: url,
            userID: user.uid,
            createdAt: date,
          })
            .then(() => navigate("/"))
            .catch((err) => alert(err.message));
        });
      });
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={Pname}
              onChange={(e) => setPname(e.target.value)}
              defaultValue="John"
            />
            <div className="error-message">{errors.Pname}</div>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="John"
            />
            <div className="error-message">{errors.Category}</div>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
            />
            <div className="error-message">{errors.Price}</div>
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <div className="error-message">{errors.Image}</div>
          <form>
            <br />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
