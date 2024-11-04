import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";
import SearchResultList from "../pages/SearchResultList.jsx";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All fields are required!");
    }

    try {
      // Make API call with BASE_URL
      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?
            city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      const result = await res.json();

      // Navigate with the search results
      navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        { state: result.data }
      );
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <Form className="d-flex flex-column flex-sm-row align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where are you going?" ref={locationRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Distance</h6>
              <input type="number" placeholder="Distance km" ref={distanceRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span><i className="ri-group-line"></i></span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};


export default SearchBar;
