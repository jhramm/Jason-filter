import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const addItem = (e) => {
    e.preventDefault();
    if (
      !titleRef.current.value ||
      !contentRef.current.value ||
      !categoryRef.current.value
    ) {
      alert("All fields are required!");
      return;
    }
    const payload = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      category: categoryRef.current.value,
    };
    axios
      .post("https://filter-api-vcyp.onrender.com/items", payload)
      .then((res) => {
        console.log(res.data);
        titleRef.current.value = "";
        contentRef.current.value = "";
        categoryRef.current.value = "";
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="additem-container">
      <div className="additem">
        <h1>Please add your listing below.</h1>
        <div className="items">
          <div>
            <input
              type="text"
              ref={titleRef}
              placeholder="Title"
              className="input-field"
            />
          </div>
          <div>
            <textarea
              type="text"
              ref={contentRef}
              placeholder="Discription"
              className="input-field"
            />
          </div>
          <div>
            <select
              name="Category"
              ref={categoryRef}
              placeholder="Category"
              className="input-field"
            >
              <option value="default">Choose Category</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>
          <div>
            <button onClick={addItem}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
