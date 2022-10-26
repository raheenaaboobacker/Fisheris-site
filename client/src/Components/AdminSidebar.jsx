import React from 'react'

export default function AdminSidebar() {
  return (
    <aside className="adminapp-sidebar">
    <div className="adminapp-sidebar__user">
      {/* <img className="adminapp-sidebar__user-avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg" alt="User Image"/> */}
      <div>
        <p className="adminapp-sidebar__user-name">MatsyaBhavan</p>
        <p className="adminapp-sidebar__user-designation"></p>
      </div>
    </div>
    <ul className="app-menu">
      <li><a className="app-menu__item" href="/admindashboard"><i className="app-menu__icon fa fa-dashboard"></i><span className="app-menu__label">Dashboard</span></a></li>
      {/* <li className="treeview"><a className="app-menu__item" href="#" data-toggle="treeview"><i className="app-menu__icon fa fa-laptop"></i><span className="app-menu__label">UI Elements</span><i className="treeview-indicator fa fa-angle-right"></i></a>
        <ul className="treeview-menu">
          <li><a className="treeview-item" href="bootstrap-components.html"><i className="icon fa fa-circle-o"></i> Bootstrap Elements</a></li>
          <li><a className="treeview-item" href="https://fontawesome.com/v4.7.0/icons/" target="_blank" rel="noopener"><i className="icon fa fa-circle-o"></i> Font Icons</a></li>
          <li><a className="treeview-item" href="ui-cards.html"><i className="icon fa fa-circle-o"></i> Cards</a></li>
          <li><a className="treeview-item" href="widgets.html"><i className="icon fa fa-circle-o"></i> Widgets</a></li>
        </ul>
      </li> */}
      <li><a className="app-menu__item" href="/posttrollingalert"><i className="app-menu__icon fa fa-pie-chart"></i><span className="app-menu__label">Add Trolling Alert</span></a></li>
      <li><a className="app-menu__item" href="/viewtrollingalert"><i className="app-menu__icon fa fa-eye"></i><span className="app-menu__label">View Trolling Alert</span></a></li>
      <li><a className="app-menu__item" href="/viewUsers"><i className="app-menu__icon fa fa fa-users"></i><span className="app-menu__label">Manage Users</span></a></li>
      <li><a className="app-menu__item" href="/viewFisherman"><i className="app-menu__icon fa fa-users"></i><span className="app-menu__label">Manage Fisherman</span></a></li>
      <li><a className="app-menu__item" href="/manageInsurance"><i className="app-menu__icon fa fa-users"></i><span className="app-menu__label">Manage Insurance</span></a></li>
      <li><a className="app-menu__item" href="/manageRoomBooking"><i className="app-menu__icon fa fa-users"></i><span className="app-menu__label">Manage Room Booking</span></a></li>
      <li><a className="app-menu__item" href="/addVessels"><i className="app-menu__icon fa fa-plus" aria-hidden="true"></i><span className="app-menu__label">Add Vessaals</span></a></li>
      <li><a className="app-menu__item" href="/viewVessel"><i className="app-menu__icon fa fa-eye" aria-hidden="true"></i><span className="app-menu__label">View Vessaals</span></a></li>
      <li><a className="app-menu__item" href="/addProducts"><i className="app-menu__icon fa fa-plus" aria-hidden="true"></i><span className="app-menu__label">Add Products</span></a></li>
      <li><a className="app-menu__item" href="/ProductsView"><i className="app-menu__icon fa fa-eye" aria-hidden="true"></i><span className="app-menu__label">View Products</span></a></li>
      <li><a className="app-menu__item" href="/addRooms"><i className="app-menu__icon fa fa-plus" aria-hidden="true"></i><span className="app-menu__label">Add Rooms</span></a></li>
      <li><a className="app-menu__item" href="/roomView"><i className="app-menu__icon fa fa-eye" aria-hidden="true"></i><span className="app-menu__label">View Rooms</span></a></li>
      <li><a className="app-menu__item" href="/viewRequest"><i className="app-menu__icon fa fa-comment" aria-hidden="true"></i><span className="app-menu__label">View Vessel Request</span></a></li>
      <li><a className="app-menu__item" href="/vieworderitems"><i className="app-menu__icon fa fa-pie-chart"></i><span className="app-menu__label">Ordered Products</span></a></li>
      <li><a className="app-menu__item" href="/viewfeed"><i className="app-menu__icon fa fa-pie-chart"></i><span className="app-menu__label">View Feedback</span></a></li>

      {/* <li className="treeview is-expanded"><a className="app-menu__item" href="#" data-toggle="treeview"><i className="app-menu__icon fa fa-edit"></i><span className="app-menu__label">Forms</span><i className="treeview-indicator fa fa-angle-right"></i></a>
        <ul className="treeview-menu">
          <li><a className="treeview-item active" href="form-components.html"><i className="icon fa fa-circle-o"></i> Form Components</a></li>
          <li><a className="treeview-item" href="form-custom.html"><i className="icon fa fa-circle-o"></i> Custom Components</a></li>
          <li><a className="treeview-item" href="form-samples.html"><i className="icon fa fa-circle-o"></i> Form Samples</a></li>
          <li><a className="treeview-item" href="form-notifications.html"><i className="icon fa fa-circle-o"></i> Form Notifications</a></li>
        </ul>
      </li>
      <li className="treeview"><a className="app-menu__item" href="#" data-toggle="treeview"><i className="app-menu__icon fa fa-th-list"></i><span className="app-menu__label">Tables</span><i className="treeview-indicator fa fa-angle-right"></i></a>
        <ul className="treeview-menu">
          <li><a className="treeview-item" href="table-basic.html"><i className="icon fa fa-circle-o"></i> Basic Tables</a></li>
          <li><a className="treeview-item" href="table-data-table.html"><i className="icon fa fa-circle-o"></i> Data Tables</a></li>
        </ul>
      </li> */}
      {/* <li className="treeview"><a className="app-menu__item" href="#" data-toggle="treeview"><i className="app-menu__icon fa fa-file-text"></i><span className="app-menu__label">Pages</span><i className="treeview-indicator fa fa-angle-right"></i></a>
        <ul className="treeview-menu">
          <li><a className="treeview-item" href="blank-page.html"><i className="icon fa fa-circle-o"></i> Blank Page</a></li>
          <li><a className="treeview-item" href="page-login.html"><i className="icon fa fa-circle-o"></i> Login Page</a></li>
          <li><a className="treeview-item" href="page-lockscreen.html"><i className="icon fa fa-circle-o"></i> Lockscreen Page</a></li>
          <li><a className="treeview-item" href="page-user.html"><i className="icon fa fa-circle-o"></i> User Page</a></li>
          <li><a className="treeview-item" href="page-invoice.html"><i className="icon fa fa-circle-o"></i> Invoice Page</a></li>
          <li><a className="treeview-item" href="page-calendar.html"><i className="icon fa fa-circle-o"></i> Calendar Page</a></li>
          <li><a className="treeview-item" href="page-mailbox.html"><i className="icon fa fa-circle-o"></i> Mailbox</a></li>
          <li><a className="treeview-item" href="page-error.html"><i className="icon fa fa-circle-o"></i> Error Page</a></li>
        </ul>
      </li> */}
      {/* <li><a className="app-menu__item" href="docs.html"><i className="app-menu__icon fa fa-file-code-o"></i><span className="app-menu__label">Docs</span></a></li> */}
    </ul>
  </aside>
  )
}
