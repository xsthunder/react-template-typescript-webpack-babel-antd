import axios from 'axios';

axios.interceptors.response.use(function (response) {
    // see https://github.com/axios/axios#interceptors
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

const CONFIG_PATH='config.json'
const EMPTY_ROUTE = 'EMPTY_ROUTE'
const EMPTY_URL = 'EMPTY_URL'
let base_route = EMPTY_ROUTE
let base_url = EMPTY_URL

const loadConfig = async()=>{
  const { data } = await axios.get(CONFIG_PATH)
  base_route = data.base_route
  base_url = data.base_url
  return data;
}

const proxy = async(obj:{[index:string]:any})=>{
    const bodyFormData = new FormData();
    Object.entries(obj).map(([k,v])=>bodyFormData.set(k,v));
    if(base_route === EMPTY_ROUTE){
      console.error("load config first!loading config")
      await loadConfig();
    }
    return await axios('', {
            method: 'post',
            url: `${base_url}${base_route}`,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
}
export {
  loadConfig,
}