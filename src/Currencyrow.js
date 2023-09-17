import React from  'react'

export default function CurrencyRow(props){
    const {
        currency_options,
        selected_currency,
        on_change_currency,
        on_change_amount,
        amount
    } = props
    return (
        <div>
            <input type = "number" className="input" value={amount} onChange={on_change_amount}/> 
            <select value={selected_currency} onChange={on_change_currency}>
                {
                    currency_options.map(option => (
                        <option key = {option} value={option}>{option}</option>
                        )
                    )
                }
                
            </select>
        </div>
    )
}