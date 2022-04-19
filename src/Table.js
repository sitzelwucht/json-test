import { useState, useEffect } from 'react';

export const Table = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const itemsData = await fetch('https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/items.json')
        const itemsArr = await itemsData.json();
        const ordersData = await fetch('https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/orders.json')
        const ordersArr = await ordersData.json();
        const customerData = await fetch('https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/customers.json')
        const customersArr = await customerData.json();
  
        // copy items into order array based on id
        itemsArr.forEach(item => {
            for (let i = 0; i < ordersArr.length; i++) {
                if (item.orderId === ordersArr[i].id) {
                    ordersArr[i].items = ordersArr[i].items || [];
                    ordersArr[i].items.push(item)
                }
            }
        })
        // copy orders into customer array based on id
        ordersArr.forEach(order => {
            for (let i = 0; i < customersArr.length; i++) {
                if (order.customerId === customersArr[i].id) {
                    customersArr[i].orders = customersArr[i].orders || [];
                    customersArr[i].orders.push(order);
                }
            }
        })
        // set the state as the combined data
        setData(customersArr);
    }
    
    useEffect(() => {
      getData();
    }, [])
    

    return (
        <>
            <table className="main">
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>Orders</th>
                    </tr>
                    { data.map((cust) => {
                            return (
                                <tr key={cust.id}>
                                    <td>{cust.firstName}</td>
                                    <td>{cust.lastName}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.addresses[0].address}</td>
                                    <td>{cust.addresses[0].city}</td>
                                    <td>{cust.addresses[0].zip}</td>    
                                    <td>
                                        <table className="sub-table">
                                            <tbody>
                                                <tr>
                                                    <th>Order Id</th>
                                                    <th>Order Date</th>
                                                    <th>Order Items</th>
                                                </tr>
                                            { cust.orders.map((ord) => {
                                                return (
                                                        <tr key={ord.id}>
                                                            <td>{ord.id}</td>
                                                            <td>{ord.createdAt}</td>
                                                            <td>
                                                                <table className="sub-table2">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Item Id</th>
                                                                            <th>Item Name</th>
                                                                            <th>Quantity</th>
                                                                        </tr>   
                                                                    { ord.items.map(item => {
                                                                        return (
                                                                        <tr key={item.id}>
                                                                            <td>{item.id}</td>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.quantity}</td>
                                                                        </tr>
                                                                        )
                                                                    }) }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )
                                            }) }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )
                        }) }   
            </tbody>
        </table>
    </>
    )
}