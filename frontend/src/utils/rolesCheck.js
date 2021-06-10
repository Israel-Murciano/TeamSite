import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export const whatRole = () => {
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        // Decode token and get user info
        const decoded = jwt_decode(token);
        if (decoded.role == "Admin") {
           return 3;
        }
        else if (decoded.role == "High") {
            return 2;
         } 
         else if (decoded.role == "Medium") {
            return 1;
         } 
         else return 0;
      }
};