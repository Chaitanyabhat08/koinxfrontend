import React, { Fragment, useState ,useEffect} from 'react';
import axios from 'axios';
import { Input } from 'antd';
import './Home.css';
import Loader from './Loader';

const Home = () => {
  const [address, setAddress] = useState('');
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
      await axios.get(`api/v1/balance/getOtherEther/${address}`)
          .then((res) =>setCurrentBalance(res.data.ethPrice))
          .catch((e) => console.error(e));
      };
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
     const interMed = async () => {
       const {data} = await axios.get(`/api/v1/balance/getMyBalance`);
       setBalanceSheet(data);
     };
    interMed();
  }, []);
  const getOthersBalance = async (a) => {
    const { data } = await axios.get(`api/v1/balance/getOtherEther/${a}`);
    setCurrentBalance(data.ethPrice);
  }
  return (
     balanceSheet === null
      ?
      <Loader />
      :
      <Fragment id="Homefragment">
        <h1>Welcome to KoinX Assignment</h1>
        <div id="first" className='container'>
          <h3>my account balance and transaction</h3>
          <table>
            <tr>
              <th>blockNumber</th>
              <th>confirmation</th>
              <th>cumulativeGasused</th>
              <th>from</th>
              <th>to</th>
              <th>gas</th>
              <th>gasPrice</th>
              <th>GasUsed</th>
            </tr>
            {balanceSheet && balanceSheet.data.map((item =>
              <tr>
                <td key={item.blockNumber}>{item.blockNumber}</td>
                <td key={item.confirmations}>{item.confirmations}</td>
                <td key={item.cumulativeGasUsed}>{item.cumulativeGasUsed}</td>
                <td key={item.from}>{item.from}</td>
                <td key={item.to}>{item.to}</td>
                <td key={item.gas}>{item.gas}</td>
                <td key={item.gasPrice}>{item.gasPrice}</td>
                <td key={item.gasUsed}>{item.gasUsed}</td>
              </tr>

            ))}
          </table>
        </div>
        <div id="second" className='container'>
          <form>
            <label>Enter your address
              <Input
                type='text'
                allowClear
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </label>
          </form>
          <button disabled={address !== '' ? false : true} type="button" color="Blue" onClick=
            {() => {
              getOthersBalance(address)
            }}>
             current ether balance
          </button>
          <Fragment id='currentBalance'>
            <table>
            <tr>
              <th>your current ether price</th>
            </tr>
            <tr>
              <td>{ currentBalance }</td>
              </tr>
            </table>
          </Fragment>
        </div>
      </Fragment >
  )
}
export default Home;