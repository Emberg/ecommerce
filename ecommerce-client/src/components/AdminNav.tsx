import { NavLink } from 'react-router'

export const AdminNav = () => {
  return (
    <nav id="main-nav">
      <ul>
        <li>
          <NavLink to={"/admin"} className={({ isActive }) => (isActive ? " active" : "")}>Admin Root</NavLink>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  )
}
