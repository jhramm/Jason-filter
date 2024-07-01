import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Content() {
  const [list, setList] = useState([]);
  const searchRef = useRef();
  const [savedList, setSavedList] = useState([]);
  const [sortDirection, setSortDirection] = useState("a-z");
  const [filterItems, setFilterItems] = useState([]);

  const getItems = async () => {
    axios
      .get("https://filter-api-vcyp.onrender.com/items")
      .then((res) => {
        console.log(res.data);
        setList(res.data);
        setSavedList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  // Data direction change code start.
  const sortList = (list, direction) => {
    return [...list].sort((a, b) => {
      if (direction === "a-z") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };
  const handleSort = (e) => {
    const newDirection = e.target.value;
    setSortDirection(newDirection);
    setSavedList(sortList(list, newDirection));
  };

  // Data direction change code end.

  // Filter for checkboxes start.

  const filterData = (val, checked) => {
    let updatedFilters = [];
    if (checked) {
      updatedFilters = [...filterItems, val];
    } else {
      updatedFilters = filterItems.filter((item) => item !== val);
    }
    setFilterItems(updatedFilters);

    if (updatedFilters.length > 0) {
      const payload = {
        categories: updatedFilters,
      };
      axios
        .post("https://filter-api-vcyp.onrender.com/filteritems", payload)
        .then((res) => {
          console.log(res.data);
          setSavedList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      getItems();
    }
  };
  // Filter for checkboxes end.

  // search filter by title start

  const searchList = () => {
    const value = searchRef.current.value.toLowerCase();
    const filterList = list.filter((item) => {
      // more data can be added to search here example `${item.content}`
      const input = item.title.toLowerCase();
      return input.includes(value);
    });
    setSavedList(sortList(filterList, sortDirection));
  };
  // search filter by title end

  return (
    <>
      <div className="nav-container">
        <div>
          <input
            type="text"
            id="search"
            ref={searchRef}
            placeholder="Filter by title"
            onChange={searchList}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="security"
            name="security"
            value="Cyber Security"
            onChange={(e) => {
              filterData(e.target.value, e.target.checked);
            }}
          />
          <label htmlFor="security">Cyber Security</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="marketing"
            name="marketing"
            value="Digital Marketing"
            onChange={(e) => {
              filterData(e.target.value, e.target.checked);
            }}
          />
          <label htmlFor="marketing">Digital Marketing</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="development"
            name="development"
            value="Web Development"
            onChange={(e) => {
              filterData(e.target.value, e.target.checked);
            }}
          />
          <label htmlFor="development">Web Development</label>
        </div>
        <div className="sort-dir">
          <label htmlFor="category">Sort Direction: </label>
          <select
            id="category"
            name="category"
            onChange={handleSort}
            value={sortDirection}
          >
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
        </div>
        <div>
          <a href="/additem">
            {" "}
            <button className="btn-style">Add Item</button>
          </a>
        </div>
      </div>
      <div className="content-container">
        <div className="content-cards">
          {savedList.map((item) => {
            return (
              <div className="card">
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <p>
                  <em>{item.category}</em>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
