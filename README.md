Role based Access control documentation Overview

The Admin Panel provides functionality to manage users, including adding,
 editing, deleting, filtering, and sorting users. It allows administrators 
 to oversee and organize user roles, statuses, and related details efficiently.

Features
1. User List Table

•	Displays the list of users with the following columns:

    o	Name: The name of the user.
    o	Status: Indicates if the user is Active or Inactive.
    o	Role: The users assigned role (e.g., Admin, User, and Billing).
    o	Role Description: A brief description of the user's role.
    o	Email: The email address of the user.
    o	Actions: Provides an option to edit user details.

•	Checkbox for Selection:

    o	A checkbox in each row allows users to select multiple rows for bulk actions like deletion.


•	Header Controls:

    o	Add User: Opens a form to add a new user.
    o	Delete Selected Users: Deletes the users selected via checkboxes.
    o	Sort: Allows sorting of users based on specified criteria.
    o	Filter: Filters users by roles or status.


2. Add/Edit User popup menu

•	Fields:

    o	Name: Editable field for the user’s full name.
    o	Email: Editable field for the user’s email address.
    o	Status: Dropdown to toggle between Active and Inactive.
    o	Role: Dropdown to assign a specific role to the user.


•	Action Buttons:

    o	Update: Saves the change(s) made to the user.
    o	Close Icon (X): Closes the popup menu without saving changes.


3. Filter Users Popup menu

•	Provides quick filters for narrowing down user data by roles: like Displays only users with the Admin role, User role, Billing role

    o	Filter by Admin: Displays only users with the Admin role.
    o	Filter by User: Displays only users with the User role.
    o	Filter by Billing: Displays only users with the Billing role.
    o	Clear Filters: Resets all applied filters and displays the full user list.

•	Close Button: Exits the filter popup menu.


4. Sort Users popup menu

•	Allows sorting the user list by:

    o	Sort by Name (Ascending): Alphabetical order A-Z.
    o	Sort by Name (Descending): Reverse alphabetical order Z-A.

•	Close Button: Exits the sort popup menu.

User Actions Workflow

Adding a User

    1.	Click the Add User button.
    2.	Fill out the user details in the form (Name, Email, Status, Role).
    3.	Click Update to save the new user.

Editing a User

    1.	Locate the user in the list and click the Edit button in the Actions column.
    2.	Update the desired fields in the popup menu.
    3.	Click Update to save the changes.

Deleting Users

    1.	Select users using the checkboxes.
    2.	Click the Delete Selected User(s) button.
    3.	Confirm the deletion.

Filtering Users

    1.	Click the Filter button.
    2.	Select the desired filter option from the popup menu.
    3.	The table updates to show only users matching the filter.

Sorting Users

    1.	Click the Sort button.
    2.	Choose the desired sorting order Ascending or Descending.
    3.	The table updates with the sorted user list.


## Demo
https://zippy-quokka-21f325.netlify.app/



## Run Locally

Clone the project

```bash
  git clone https://github.com/anirbanofc/RBAC
```

Go to the project directory

```bash
  cd RBAC
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

