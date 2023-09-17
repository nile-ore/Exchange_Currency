import React , { useEffect , useState} from 'react';
import './App.css';
import CurrencyRow from './Currencyrow';

const api = "https://api.exchangerate.host/latest"

function App() {
  const [currency_options,set_currency_options] = useState([]);
  const [from_currency,set_from_currency] = useState();
  const [to_currency,set_to_currency] = useState();
  const [exchange_rate,set_exchange_rate] = useState()
  const [amount,set_amount] = useState(1);
  const [amount_in,set_amount_in] = useState(true)
  console.log(exchange_rate)
  

  let toAmount,fromAmount;
   
  if(amount_in){
    fromAmount = amount
    toAmount = amount*exchange_rate
  }else{
    toAmount = amount;
    fromAmount = amount/exchange_rate;
  }


  useEffect( () => {  
    fetch(api)
      .then(res => res.json())
      .then(data => {
        const usd = Object.keys(data.rates)[149];

        data.base = Object.keys(data.rates)[66];

        set_currency_options( [data.base, ...Object.keys(data.rates)] );
        set_from_currency(data.base);
        set_to_currency(usd);
        set_exchange_rate(data.rates[usd])
      })
    },[] )

    useEffect( () => {

      if(from_currency != null && to_currency != null){

        fetch(`${api}?base=${from_currency}&symbols=${to_currency}`)
          .then(res => res.json())
          .then(data => set_exchange_rate(data.rates[to_currency]))
      } 
    }, [from_currency,to_currency] )
      

  function amount_change_from_situation(e){
    set_amount(e.target.value);
    set_amount_in(true)
  }
  
  function amount_change_to_situation(e){
    set_amount(e.target.value);
    set_amount_in(false)
  }    

  return (
    <>
      <h1>
      Currency Exchange Calculator 💸 
      </h1>

      <CurrencyRow 
        currency_options = {currency_options}
        selected_currency =  {from_currency}
        on_change_currency = {e => set_from_currency(e.target.value)}
        on_change_amount = {amount_change_from_situation}
        amount = {fromAmount}
        
      />
      <div className='equal'> = </div>
      <CurrencyRow 
       currency_options = {currency_options}
       selected_currency =  {to_currency}
       on_change_currency = {e => set_to_currency(e.target.value)}
       on_change_amount = {amount_change_to_situation}
       amount = {toAmount}
      />
    
    </>
    
  );
}

export default App;
