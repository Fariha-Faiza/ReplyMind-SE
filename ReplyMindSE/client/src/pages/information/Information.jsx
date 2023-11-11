import "./information.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import ViewInformation from "../viewInformation/ViewInformation";
export default function Information() {
 
  const [profession, setProfession] = useState([])
  var [userName, setUserName] = useState("")
  var [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [result, setResult] = useState("")
  const [id, setID] = useState("")
  const [error, setError] = useState(false);
  const arr= ['Marketing Professional', 'Entrepreneur', 'Content Creator']
  const interestsofMP= ['Growth marketing', 'Digital Marketing', 'Product Marketing','Paid marketing', 'Organic marketing']
  const interestsofEnterpreneur= ['Startup enthusiast','SME', 'Product enthusiast','Product Leader','Product owner etc' ]
  const interestsofCC= ['Youtube', 'Twitch', 'Twitter', 'Video Content ' ]
  const { user, dispatch, isFetching } = useContext(Context);
  const [professionShow, setProfessionShow] = useState([])
  const [bioShow, setBioShow] = useState("")
  const [interestShow, setInterestShow] = useState([])
  const [save, setSave] = useState(true)



  const [checked, setChecked] = useState([]);


  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      console.log(updatedList, checked);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      console.log(updatedList, checked);
    }
    setChecked(updatedList);
  };

 

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

userName = user.username;
email = user.email;




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
     try {
      const res = await axios.post("/information/info", {
       
        username : userName,
        email : email,
        profession,
        interest : checked,
        bio
      });
     
     console.log(res)
      setResult(res);
      setID(res.data._id)
      setSave(false)
       //res.data && window.location.replace("/view");
     } catch (err) {
       setError(true);
     }
  };

 
console.log("checked", checked)

  const getInfo = async (e) => {
  //  e.preventDefault();
    if(id!== null){
    setError(false);
     try {
      const res = await axios.get(`/information/info/${id}`)
     console.log("res", res);
     setProfessionShow(res.data.profession)
     setInterestShow(res.data.interest)
     setBioShow(res.data.bio)
    
     } catch (err) {
       setError(true);
     }
    }
  };
   
   useEffect(()=>{
    // getInfo()

   })

  //console.log("id", id)
 
  return (
    <div className="register">
      

      <div className="info-alignment">
       {save=== true && <div>
        <span className="registerTitle">ADD Information of {user?.username}</span>
      <form action="" className="registerForm"  onSubmit={handleSubmit}>
          <label >Profession</label>
          {/* <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setProfession(e.target.value)} /> */}
<select   onChange={e=>setProfession(e.target.value)} className="registerInput">
         <option>
          --Choose and option--
        </option>
        {
        arr.map(item => {
          return <option key={item} value={item}>{item}</option>
        })
      }
      </select>
          <label >Interests</label>
          {/* <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setInterest(e.target.value)} /> */}
            {profession === "Marketing Professional" && 
             <div className="list-container">
 {interestsofMP.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}
{profession === "Entrepreneur" && 
             <div className="list-container">
 {interestsofEnterpreneur.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}
{profession === "Content Creator" && 
             <div className="list-container">
 {interestsofCC.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}
          <label >Bio</label>
          <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setBio(e.target.value)} />

          <button className="registerButton" type="submit" disabled={id!==null} >Save  
          </button>
            </form>
            
    
      
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </div>}
       {save=== false && <div> 
      {/* <button type="submit" onClick= {getInfo}>view </button> */}

      <span className="registerTitle">Update Information of {user?.username}</span>
      <form action="" className="registerForm" onSubmit={handleSubmit}>
      

         

          <label >Profession</label>
          {/* <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setProfession(e.target.value)} /> */}
<select   onChange={e=>setProfession(e.target.value)} className="registerInput">
         <option>
         {professionShow}
        </option>
        {
        arr.map(item => {
          return <option key={item} value={item}>{item}</option>
        })
      }
      </select>




          <label >Interests</label>
          {/* <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setInterest(e.target.value)} /> */}
            {profession === "Marketing Professional" && 
             <div className="list-container">
 {interestsofMP.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}
{profession === "Entrepreneur" && 
             <div className="list-container">
 {interestsofEnterpreneur.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}
{profession === "Content Creator" && 
             <div className="list-container">
 {interestsofCC.map((item, index) => (
  <div key={index}>
    <input value={item} type="checkbox" onChange={handleCheck} />
    <span className={isChecked(item)}>{item}</span>
  </div>
))}
</div>}



          <label >Bio</label>
          <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setBio(e.target.value)} />

          <button className="registerButton" type="submit" >Update
          
          </button>

      </form>
      
      
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}

      </div>}


      </div>
      {/* <ViewInformation varOne={id}/> */}

     


      
    </div>
  )
}
