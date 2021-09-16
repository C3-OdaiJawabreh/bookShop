
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";


export const  FavBage =()=> {
    const [book, setBook] = useState();
    const [status, setStatus] = useState();

    const state = useContext(userContext);
    const token = state.token;


    const getAllFavo =()=>{
      axios
      .get("http://localhost:5000/favorite/getAllFav/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
          console.log( `hi ${res.data}`)
        setBook(res.data.message);
      })
      .catch((err)=>{setBook([])
      console.log(err)
        console.log("servr error")})
    }
   
      useEffect((
        )=>{ getAllFavo()},[book])

      const deleteBook=(id)=>{

        axios.delete(`http://localhost:5000/favorite/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then( 
          (res)=>{
            getAllFavo()
            setStatus(<div>{`Success deleted the book with id=>${id}`}</div>)})
        .catch((err)=>{setStatus(<div>Some thing wrong</div>)})
    
      }

      return (
        <div>
          {!book ? (
            <div> favourite is Empty</div>
          ) : (
            <div>
            {book.map((element, i) => {
                
              return (
                <div key={element._id}>
                  {/* {element.bookId.image}
                  <br></br>  */}
                  {element.bookId.name}
                  <br></br>
                  {element.bookId.type}
                  <br></br>
                  {element.bookId.author}
                  <br></br>
                  {element.bookId.description}
                  <br></br>
                  {element.bookId.language}
                  <br></br>
                  {element.bookId.price}
                  <br></br>
                  <button onClick={()=>{deleteBook(element._id)}}>X</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };


  

