import React, { useState } from "react";

const Card = ({ onClick, value, index, win }) => {
  const [id, setId] = useState(null);
  const handleClick = () => {
    setId(index);
    onClick(value.value);
  };
  return (
    <div
      style={value.color ? { backgroundColor: value.color } : null}
      className={`card`}
      onClick={handleClick}
    />
  );
};

export default Card;
