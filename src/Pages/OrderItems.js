import React from 'react'
import { useState, useEffect } from "react"

const OrderItems = (props) => {

    const [itemss, setItemss] = useState()
    console.log("itemssss"+itemss);

    useEffect(() => {

        const order = JSON.parse(localStorage.getItem('orderItems'))
        
      setItemss(props.OrderItems)
      console.log("order"+props.OrderItems);
    //   console.log("items"+itemss);
    }, [])




    if(itemss) {
        console.log(true)

        return (
            <div>
                <h2>{itemss.title}</h2>
            </div>
        )

    }else {
        console.log(false)
        return (
       
            <div>
                <p>No Ordered Items Right Now</p>
            </div>
        )

    }
 
}

export default OrderItems
