import React from 'react';

const Navbar = ({  createProjectAllowed, newProjectPath, projectsUsersPath }) => {
  return (
    <nav className="navbar">
      <h2>BugMe</h2>
      <div className="d-flex justify-content-between align-items-center">
        <form className="d-flex" id="searchForm" style={{ flexGrow: 1 }} role="search">
          <input type="text" className="form-control me-2" placeholder="Search..." />
          <button type="submit" className="btn btn-outline-success mx-2">Search</button>
          {createProjectAllowed && <a href={newProjectPath} className="btn btn-outline-primary mx-2 text-nowrap">New Project</a>}
          <a href="#" className="btn btn-outline-info mx-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            <i className="bi bi-info-circle"></i>
          </a>
          
        </form>
      </div>
      {/* Modal */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">BugMe Infography</h5>
            </div>
            <div className="modal-body">
            <h3>💼 Manager</h3>
            <ul>
              <li>Can create, read, update, and delete projects.</li>
              <li>Can assign users (developers and quality assurance) to projects.</li>
              <li>Can add bugs to projects.</li>
              <li>Can view all bugs associated with the projects they manage.</li>
            </ul>

            <h3>👨🏻‍💼 Quality Assurance</h3>
            <ul>
              <li>Can view projects they are assigned to.</li>
              <li>Can view bugs associated with the projects they are assigned to.</li>
              <li>Can add bugs to projects they are assigned to.</li>
              <li>Cannot create, update, or delete projects.</li>
              <li>Can assign developers to bug.</li>
              <li>Cannot view bugs in projects they are not assigned to.</li>
            </ul>

            <h3>👨🏻‍💻 Developer</h3>
            <ul>
              <li>Can view projects they are assigned to only.</li>
              <li>Can view bugs associated with the projects they are assigned to only.</li>
              <li>Cannot create, update, or delete projects.</li>
            </ul>
           
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export  default Navbar;