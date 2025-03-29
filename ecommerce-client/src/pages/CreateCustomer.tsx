import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useCustomer } from '../hooks/useCustomer';
import { Customer } from '../types/Customer';

export const CreateCustomer = () => {
  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: ""
  }); 

  const navigate = useNavigate();
  const {isLoading, error, createCustomerHandler} = useCustomer();

  const handleChange = (e: FormEvent<HTMLInputElement>, property: string) => {
    setCustomer({...customer, [property]: e.currentTarget.value});
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createCustomerHandler({
      firstname: customer!.firstname,
      lastname: customer!.lastname,
      email: customer!.email,
      password: customer!.password,
      phone: customer!.phone,
      street_address: customer!.street_address,
      postal_code: customer!.postal_code,
      city: customer!.city,
      country: customer!.country
    })
    navigate('/admin/customers');
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{
      width: "75%",
      paddingLeft:"30%"
    }}>
      <h2>Create Customer</h2>

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

        <button>Create</button>

        <Link to="/admin/customers" className='back-link'>&#x2190; back</Link>
      </form>
    </div>
  )
}
