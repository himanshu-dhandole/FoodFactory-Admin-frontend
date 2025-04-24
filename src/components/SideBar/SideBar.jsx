import React from 'react';
import { Link } from 'react-router-dom';

function SideBar({sideBarVisible}) {
  return (
    <div className={`border-end bg-white ${sideBarVisible ? `` : `d-none`}`} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
        <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add"><i class="bi bi-folder-plus me-2"></i>Add Food</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list"><i class="bi bi-list-stars me-2"></i>Display  Food</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders"><i class="bi bi-box-seam me-2"></i>Orders</Link>
            
        </div>
    </div>
  );
}

export default SideBar;
