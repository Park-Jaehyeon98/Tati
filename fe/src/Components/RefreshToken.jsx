import axios from "axios";
import React from "react";
import jwt from 'jsonwebtoken';

export default function RefreshToken(){

   const refreshToken = localStorage.getItem('refreshToken');

   axios.get(`${process.env.REACT_APP_URL}/member/reissue`,{
      headers: {
         RefreshToken: refreshToken
       },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
}