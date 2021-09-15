import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Rate } from "../rate/rate";
import { AddCart } from "../cart/cart";
import Favourite from "../favourite/favourite";
import axios from "axios";
import "./book.css"

export const AllBook =  () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/books/").then((res) => {
      setBooks([...res.data.books]);
    });
  }, []);
  return (
    <div>
    <div id="main">
      {books &&
        books.map((element, index) => {
          return (
           <div className="book">
           <img className="img" src={element.image}/>

           <div className="book-info">
             <h3>{element.name}</h3>
             <span><Route
                exact
                path="/home"
                render={() => <Rate bookId={element._id} rateCount={element.rating}  />}
              /></span>
              </div>

              <div className="desc">
                <h3>Description</h3>
                {element.description}
                <div className="price">{element.price}JD</div>
                
              
              <div className="cart"> <Route
                exact
                path="/home"
                render={() => <AddCart bookId={element._id} />}
              /></div>
             </div>
            </div>
          );
        })}
             </div>
           
    </div>
  );
};
