// import axios from 'axios'
async function getUrl(url) {
  try {
    console.log(url)
    const response = await(await fetch(url,{method:"GET"})).json();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function postUrl(url, details) {
  try {
    console.log(url,details);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
  };
  
    const response = await fetch(url,requestOptions)
    // console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function deleteUrl(url, details) {
  try {
    console.log(url,details);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
  };
  
    const response = await fetch(url,requestOptions)
    // console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function formUrl(url, details) {
  try {
    console.log(url,details.get('file'));
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data;boundary=XXX' },
      body:details
  };
  
    const response = await fetch(url,requestOptions)
    // console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
const network = { getUrl, postUrl,formUrl,deleteUrl };
export default network;
