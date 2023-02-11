import axios from "axios";

const SERVER = 'http://localhost:8100/v1/api/exchange';
const HEADER = {'Content-Type' : 'application/json'}

// 서버 통신
const ExchangeAPI = {
  exchangeRate : async function(baseCode, amount) {
    if(amount === '') amount = 1;
    const obj = {
      baseCode : baseCode,
      amount : amount
    }
    return await axios.post(SERVER, obj, HEADER);
  }
}

export default ExchangeAPI;