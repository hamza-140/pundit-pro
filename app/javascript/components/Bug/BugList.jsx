import React from "react";
import { Link } from "react-router-dom";

const BugList = ({ bugs }) => {
  return (
    <div>
      <h4>List of bugs:</h4>
      <div id="searchResults">
        <table className="table">
          <thead>
            <tr>
              <th>bug title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No bugs found. Add a new bug.
                </td>
              </tr>
            ) : (
              bugs.map((bug, index) => (
                <tr key={index}>
                  <td>{bug.title}</td>
                  <td>
                    {/* <Link to={`/bug/${bug.id}`} className="btn btn-primary mr-2">
                      View bug
                    </Link>
                    <Link to={editbugPath(bug.id)} className="btn btn-warning mr-2">
                      Edit
                    </Link> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugList;
