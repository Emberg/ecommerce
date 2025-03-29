/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ICustomer } from '../models/ICustomer';
import { useCustomer } from '../hooks/useCustomer';

export const UpdateCustomer = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null); 
  const navigate = useNavigate();
  const params = useParams();
  const {isLoading, error, fetchCustomerByIdHandler, updateCustomerHandler} = useCustomer();

  useEffect(() => {
    if (!params.id) return;
    fetchCustomerByIdHandler(params.id).then((data) => setCustomer(data));  
  }, [])

  const handleChange = (e: FormEvent<HTMLInputElement>, property: string) => {
    if (!customer) return;
    setCustomer({...customer, [property]: e.currentTarget.value});
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    await updateCustomerHandler(""+customer.id, {...customer});
    navigate('/admin/customers');
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p> 

  return (
    <div style={{
      width: "75%",
      height: "50%",
      paddingLeft:"30%"
    }}>
      <h2>Update Customer {customer?.id}</h2>

      <form onSubmit={handleSubmit}>
        <label>Firstname:</label>
        <input type="text" id="firstname" value={customer?.firstname} onChange={e=>handleChange(e, "firstname")}/>

        <label>Lastname:</label>
        <input type="text" id="lastname" value={customer?.lastname} onChange={e=>handleChange(e, "lastname")}/>

        <label>Email:</label>
        <input type="text" id="email" value={customer?.email} onChange={e=>handleChange(e, "email")}/>

        <label>Password:</label>
        <input type="text" id="password" value={customer?.password} onChange={e=>handleChange(e, "password")}/>

        <label>Phone:</label>
        <input type="text" id="phone" value={customer?.phone} onChange={e=>handleChange(e, "phone")}/>

        <label>Street adress:</label>
        <input type="text" id="street_address" value={customer?.street_address} onChange={e=>handleChange(e, "street_address")}/>

        <label>Postal code:</label>
        <input type="text" id="postal_code" value={customer?.postal_code} onChange={e=>handleChange(e, "postal_code")}/>

        <label>City:</label>
        <input type="text" id="city" value={customer?.city} onChange={e=>handleChange(e, "city")}/>

        <label>Country:</label>
        <input type="text" id="country" value={customer?.country} onChange={e=>handleChange(e, "country")}/>

        <button>Update</button>

        <Link to="/admin/customers" className='back-link'>&#x2190; back</Link>
      </form>
    </div>
  )
}
