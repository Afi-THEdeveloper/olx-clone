import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Contexts";
import { postContext } from "../../store/postContext";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { db } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(postContext);
  useEffect(() => {
    getDocs(collection(db, "products")).then((data) => {
      const allPost = data.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img
                    src={product.url}
                    alt=""
                    onClick={() => {
                      setPostDetails(product);
                      navigate("/Details");
                    }}
                  />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.productName}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
