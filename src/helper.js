import axios from 'axios';
export function initialize() 
{  
   axios.interceptors.request.use(function (config) 
     {  console.log('req',config)
        return config;
      });
   axios.interceptors.response.use(function (response) {
       console.log('res',response)
        return response;
      }, function (error) { 
        console.log('err',error)
        return Promise.reject(error); });
  }