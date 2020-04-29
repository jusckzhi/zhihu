import React from "react";
import "./List.css";
import Card from "../Card/Card";

function List(props) {
  const { list } = props;
  return (
    <div className="list">
      {list.map((item) => {
        return (
          <div className="list-item" key={item.title}>
            <h3 className="list-item-title">{item.title}</h3>
            {item.data.map((i) => {
              return <Card key={i.id} d={i}></Card>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default List;
