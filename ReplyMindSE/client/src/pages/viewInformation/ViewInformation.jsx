import React from 'react'
import { useState, useEffect, } from "react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./viewInformation.css"

export default function ViewInformation(id1) {
    const { user } = useContext(Context);

  console.log("user", user, "id", id1,"id1.varOne", id1.varOne);

  // useEffect(() => {

  //   const getInfo = async () => {
  //     const res = await axios.get(`/information/info/${id1.varOne}`)
  //     console.log("info", res)
  //   };
  //   getInfo();
  // }, [])

  return (
    <div>
      here is the information
    </div>
  )
}
