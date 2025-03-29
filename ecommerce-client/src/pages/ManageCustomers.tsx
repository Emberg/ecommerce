import { Link, NavLink } from 'react-router'
import { useCustomer } from '../hooks/useCustomer'
import { useEffect } from 'react';

export const ManageCustomers = () => {
  const {customers, isLoading, error, fetchCustomersHandler, deleteCustomerHandler} = useCustomer();
  
  useEffect(() => {
    fetchCustomersHandler();
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Manage Customers</h2>
      
      <NavLink to={"/admin/create-customer"} className={({ isActive }) => (isActive ? " active" : "")}>New Customer</NavLink>
      <br></br>
      <br></br>

      <table style={{
        width: "100%",
        textAlign: "center",
        backgroundColor: "white",
        border: "1px solid black"
      }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td><Link to={`/admin/update-customer/${customer['id']}`}>Update</Link></td>
                <td><a onClick={() => {deleteCustomerHandler(""+customer.id)}}>Delete</a></td>
              </tr>                  
            ))
          }
          </tbody>                
      </table>
    </div>
  )
}
