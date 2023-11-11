import React from 'react'
import { useState, useEffect, } from "react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./viewInformation.css"

export default function ViewInformation(id1) {
    const { user } = useContext(Context);
    const [allData, setAllData] = useState([])
    const [profession, setProfession] = useState([])
    const [bio, setBio] = useState("")
    const [interest, setInterest] = useState([])
    const [matchedId , setMatchedId] = useState("")




  
  useEffect(() => {
    console.log("my url11111")
    async function fethcData() {
      const res = await axios.get(`/information/info`)
    console.log("res data", res.data)
    const matchedData = (res.data.filter((x) => x.username === user.username && x.email === user.email))
         setAllData(matchedData)
         console.log("matchedData", matchedData);
         setProfession(matchedData[0].profession)
         setInterest(matchedData[0].interest)
         setBio(matchedData[0].bio)
         setMatchedId(matchedData[0]._id)
      }

      fethcData()
  }, []);



//delete profile info




  return (
    <div>
      <span className="registerTitle">Information of {user?.username}</span>
        <div action="" className="registerForm">
          <label >Profession :</label>
          <span>{profession} </span>
          <label >Interests :</label>
          <span>{interest} </span>
          <label >Profession :</label>
          <span>{bio} </span>
          
          </div>
    </div>
  )
}
