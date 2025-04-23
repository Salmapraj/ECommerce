// src/api/axiosInstance.js
import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
