import React, {useState} from "react";

import Calendar from "./Calendar";
import axios from "axios";


export default function Schedule() {

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    console.log(e.target.value)
    // const { value } = e.target.value;
    // console.log(e.target.value)
    setFile(e.target.value)
    // setFile(e.target.files[0])
  };

  const heandle = ()=>{
    console.log(file,'===========')
    const formdata = new FormData();
    formdata.append('file',file)
    console.log(process.env.REACT_APP_URL)


    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_URL}:8080/member/upload`,
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    }
  

  return (
    <div>
      <Calendar />
      <img src={file} alt="" />
      <input type="file" value={file} onChange={handleFileChange}/>
      <button onClick={heandle}>실험</button>
    </div>
  )
}