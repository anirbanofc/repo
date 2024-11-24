import { AiOutlineUsergroupAdd ,AiOutlineUsergroupDelete} from "react-icons/ai";
import { CiFilter,CiEdit  } from "react-icons/ci";
import { BsSortUp } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import "./TeamManagement.css";

const initialUsers = [
  { id: 1, name: "Josh Stone", email: "josh.stone@maxihost.com", status: "Active", role: "Admin" },
  { id: 2, name: "Paul Costa", email: "paul.costa@maxihost.com", status: "Active", role: "Admin"},
  { id: 3, name: "Richard Compton", email: "richard.compton@bill.com", status: "Active", role: "Billing" ,},
  { id: 4, name: "Ricardo Bortolansa", email: "ricardo.bortolansa@maxihost.com", status: "Inactive", role: "User", description:"" },
  { id: 5, name: "Everaldo Gomes", email: "everaldo.gomes@gmail.com", status: "Active", role: "User" ,},
];

const TeamManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortPopup, setSortPopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUser, setIsAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    status: "Active",
    role: "User",
  });

  const [formErrors, setFormErrors] = useState({});

  // Initialize data in local storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
      setUsers(initialUsers);
      setFilteredUsers(initialUsers);
    } else {
      setUsers(storedUsers);
      setFilteredUsers(storedUsers);
    }
  }, []);

  // Save users to local storage and update state
  const updateUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Function for Sorting
  const sortByName = (order) => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredUsers(sortedUsers);
    setSortOrder(order);
    setSortPopup(false); 
  };

  // Function for Filtering
  const filterByRole = (role) => {
    const filtered = role ? users.filter((user) => user.role === role) : users;
    setFilteredUsers(filtered);
    setFilterRole(role);
    setFilterPopup(false); // Close the filter popup
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = () => {
    const usersToDelete = users.filter((user) => selectedUsers.includes(user.id));
    const hasAdmins = usersToDelete.some((user) => user.role === "Admin");

    if (hasAdmins) {
      alert("Admins cannot be deleted.");
      return;
    }

    const updatedUsers = users.filter((user) => !selectedUsers.includes(user.id));
    updateUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormErrors({});
  };

  const handleAddUserClick = () => {
    setIsAddUser(true);
    setNewUser({
      name: "",
      email: "",
      status: "Active",
      role: "User",
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const validateForm = (user) => {
    const errors = {};
    if (!user.name.trim()) {
      errors.name = "Name is required.";
    } else if (/[^a-zA-Z\s]/.test(user.name)) {
      errors.name = "Name can only contain letters and spaces.";
    }
    if (!user.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      errors.email = "Invalid email format.";
    }
    return errors;
  };

  const handleUpdate = () => {
    const errors = validateForm(selectedUser);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? selectedUser : user
    );
    updateUsers(updatedUsers);
    setSelectedUser(null);
    setFormErrors({});
  };

  const handleAddUser = () => {
    const errors = validateForm(newUser);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const updatedUsers = [
      ...users,
      { ...newUser, id: users.length + 1 },
    ];
    updateUsers(updatedUsers);
    setIsAddUser(false);
    setFormErrors({});
  };

  return (
    <div className="team-management">
        <div className="page-heading">
        <h1>Admin Panel</h1>
        <button className="add-user-btn" onClick={handleAddUserClick}>
         <AiOutlineUsergroupAdd/> Add User
        </button>
       
        <button
          className="delete-selected-btn"
          onClick={handleDeleteSelected}
          disabled={selectedUsers.length === 0}
        >
         <AiOutlineUsergroupDelete/> Delete Selected user(S)
        </button>
        <div className="sortfilter">
        <button className="sort-btn" onClick={() => setSortPopup(true)}>
          <BsSortUp/> Sort
        </button>
        <button className="filter-btn" onClick={() => setFilterPopup(true)}>
         <CiFilter/> Filter
        </button>
        </div>
      </div>

      {/* Sort Popup */}
      {sortPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Sort Users</h2>
            <button onClick={() => sortByName("asc")}>Sort by Name (Ascending)</button>
            <button onClick={() => sortByName("desc")}>Sort by Name (Descending)</button>
            <button className="close-button" onClick={() => setSortPopup(false)}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Filter Popup */}
      {filterPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Filter Users</h2>
            <button onClick={() => filterByRole("Admin")}>Filter by Admin</button>
            <button onClick={() => filterByRole("User")}>Filter by User</button>
            <button onClick={() => filterByRole("Billing")}>Filter by Billing</button>
            <button onClick={() => filterByRole("")}>Clear Filters</button>
            <button className="close-button" onClick={() => setFilterPopup(false)}>
              ✖
            </button>
          </div>
        </div>
      )}


      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedUsers(e.target.checked ? filteredUsers.map((user) => user.id) : [])
                }
                checked={
                  selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                }
              /> select user(s)
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Role Description</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className={user.status === "Inactive" ? "inactive-row" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>
                <span
                  className={`status-badge ${user.status === "Active" ? "active" : "inactive"}`}
                >
                  {user.status}
                </span>
              </td>
              <td>{user.role}</td>
              <td>
                {(() => {
                  switch (user.role) {

                    case 'Admin':
                      return "Configure system settings and permissions";
                      break
                    case 'User':
                      return "Make requests, orders, or bookings";
                      break
                    case 'Billing':
                      return "Process bills and invoices"

                    default:
                      return null
                  }
                })()}
              </td>

              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditClick(user)}> <CiEdit/> Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(selectedUser || isAddUser) && (
        <div className="popup">
          <div className="popup-content">
            <div className="form-header">
              <div className="formheadingDiv">
              <h2>{isAddUser ? "Add User" : "Edit User"}</h2>
              <button
                className="close-button"
                onClick={() => {
                  setSelectedUser(null);
                  setIsAddUser(false);
                  setFormErrors({});
                }}
              >
                ✖
              </button>
              </div>
            </div>

            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={isAddUser ? newUser.name : selectedUser.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? "error-input" : ""}
                />
                {formErrors.name && <span className="error">{formErrors.name}</span>}
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={isAddUser ? newUser.email : selectedUser.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? "error-input" : ""}
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={isAddUser ? newUser.status : selectedUser.status}
                  onChange={handleInputChange}
                  disabled={selectedUser?.role === "Admin"}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={isAddUser ? newUser.role : selectedUser.role}
                  onChange={handleInputChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Billing">Billing</option>
                </select>
              </label>
              <button
                type="button"
                onClick={isAddUser ? handleAddUser : handleUpdate}
                className="addUpdateBtn"
              >
                {isAddUser ? "Add" : "Update"}
              </button>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
