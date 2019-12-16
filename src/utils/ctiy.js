import axios from 'axios'
const KEY = 'hfzk_city_key'

export const setCity = city =>{
    window.localStorage.setItem(KEY,JSON.stringify(city))
}

const getCity = () => {
    window.localStorage.getItem(KEY)
}

const BMap = window.BMap 
export const getLocalStorage = () =>{
    const city = getCity()
   
    if(!city){
        return new Promise((resolve,reject)=>{


           var myCity = new BMap.LocalCity()
            myCity.get(async result =>{
                // console.log(result)
                let res = await axios.get(`/area/info?name=${result.name}`) 
                console.log(res)
                // Object.assign(result,res.data.body)
                setCity(res.data.body)
                resolve(res.data.body)
            })
        })
    }else{
        return Promise.resolve(JSON.parse(city))
    }

}