import React, { useState,useContext } from "react";
import { Route } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";


function Favourite({bookId}) {}
const [favourite, setFavourite] = useState(0);
const state = useContext(userContext);
const token = state.token;
const adding = ()=>{}









return (
    <div>
            <button onClick ={adding}>
            addToFavourite 
        </button>
        <div>
        {favourite}
        </div>
    </div>
)

export default Favourite