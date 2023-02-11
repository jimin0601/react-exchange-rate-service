import { useEffect, useState } from "react";
import styled from "styled-components";
import ExchangeAPI from "./ExchangeAPI";

const ExchangeStyle = styled.div`
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  .container {
    width: 50%;
    position: absolute;
    display: block;
    top: 40%;
    left: 40%;
    height: auto;
  }
  input {
    background-color: #fff;
    overflow: hidden;
    margin: 0;
    text-align: left;
    line-height: 24px;
    padding: 1px 6px 1px 12px;
    width: 135px;
    border: 0;
    height: 50px;
    color: #4d5156;
    outline: 0;
  }
  select {
    -webkit-appearance: none;
    z-index: 1;
    line-height: 50px;
    width: 90px;
    position: absolute;
    right: 0;
    outline: 0;
    border: 1px solid #dadce0;
    border-left: none;
  }
  input:focus, select:focus {
    border: 1px solid #1a73e8;
  }
  .input-container {
    display: flex;
    border: 1px solid #dadce0;
    caret-color: #1a73e8;
    overflow: hidden;
    width: 300px;
    border-radius: 6px;
    margin-bottom: 14px;
  }
  .select-box {
    background-color: #fff;
    overflow: hidden;
    position: relative;
    width: 85px;
    height: 50px;
    display: inline-block;
    flex-grow: 2;
  }
  .line {
    border-left: 1px solid #dadce0;
    position: absolute;
    top: 8px;
    bottom: 8px;
    z-index: 3;
  }
`

function CurrencyInput() {
  
  // 초기 값 세팅
  const [amount, setAmount] = useState('1');
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("KRW");
  const [keys, setKeys] = useState([]);
  const [objects, setObjects] = useState({});
  
  const onChnageAmount = e => {
    let value = e.target.value;
    // 값에 숫자가 아니거나 null이 들어오면 0
    if(isNaN(value) || value === null) {
      setAmount('0');
    } else {
      setAmount(value);
    }
  }
  const onChangeValue1 = e => setCurrency1(e.target.value);
  const onChangeValue2 = e => setCurrency2(e.target.value);

  // 처음 렌더링 후, 금액이나, 통화가 바뀔 때 마다 렌더링
  useEffect(() => {
    const onExchangeRate = async () => {
      // 서버 연결
      const response = await ExchangeAPI.exchangeRate(currency1, amount);
      if(response.status === 200) {
        // String으로 받아서 JSON 형식으로 파싱
        const jsonObj = JSON.parse(response.data.obj);
        // 객체의 키만 가져옴
        const keys = Object.keys(jsonObj);
        setKeys(keys.map((key) => key));
        setObjects(jsonObj);
      } else {
        console.log('서버 에러');
      }
    }
    onExchangeRate();
  }, [amount, currency1]);

  return(
    <ExchangeStyle>
      <div className="container">
        <div className="input-container">
          <input type='text' value={amount} onChange={onChnageAmount} />
          <div className="select-box">
            <div className="line"/>
              <select onChange={onChangeValue1} value={currency1}>
                {/* 받아온 키의 정보를 map을 돌려서 option에 값 넣기 */}
                {keys.map((key => (
                  <option key={key} value={key}>{key}</option>
                  )))}
              </select>
          </div>
        </div>
        <div className="input-container">
          <input type='text' value={objects[currency2] === undefined ? '' : objects[currency2]} readOnly />
          <div className="select-box">
            <div className="line"/>
              <select onChange={onChangeValue2} value={currency2}>
              {keys.map((key => (
                <option key={key} value={key}>{key}</option>
              )))}
              </select>
          </div>
        </div>
      </div>
    </ExchangeStyle>
  );
} 

export default CurrencyInput;