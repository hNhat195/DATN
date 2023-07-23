import React from "react";
import CheckboxProton from "./CheckboxProton";
import FilterListToggle from "./FilterListToggle";

import "./styles.css";

export const ratingList = [
  {
    id: 1,
    value: "1",
    label: "1🌟",
  },
  {
    id: 2,
    value: "2",
    label: "2🌟",
  },
  {
    id: 3,
    value: "3",
    label: "3🌟",
  },
  {
    id: 4,
    value: "4",
    label: "4🌟",
  },
  {
    id: 5,
    value: "5",
    label: "5🌟",
  },
];

const SideBar = ({ selectedRating, selectRating, cuisines, changeChecked }) => (
  <div>
    <div className="input-group">
      <p className="label">SELECT CATAGORIES</p>
      {cuisines.map((cuisine) => (
        <CheckboxProton
          key={cuisine.id}
          cuisine={cuisine}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <div className="input-group">
      <p className="label">MAIN FABRIC COLOR</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
  </div>
);

export default SideBar;
