import { Link } from "react-router"

export const AdminNavPage = () => {
    return (
        <>
            <Link to="/admin/customers" className='back-link'>Manage Customers</Link>
            <br></br>
            <Link to="/admin/customers" className='back-link'>Manage Products</Link>
            <br></br>
            <Link to="/admin/customers" className='back-link'>Manage Orders</Link>
        </>
    )
}