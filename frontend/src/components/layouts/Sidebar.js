import React from "react";


const Sidebar = () => {
  return (
<div class="sidebar" data-background-color="dark">
    <div class="sidebar-logo">
      <div class="logo-header" data-background-color="dark">
        <a href="" class="logo">
          <img src="/img/kaiadmin/logo_light.svg" alt="navbar brand" class="navbar-brand" height="20"/>
        </a>
        <div class="nav-toggle">
          <button class="btn btn-toggle toggle-sidebar">
            <i class="gg-menu-right"></i>
          </button>
          <button class="btn btn-toggle sidenav-toggler">
            <i class="gg-menu-left"></i>
          </button>
        </div>
        <button class="topbar-toggler more">
          <i class="gg-more-vertical-alt"></i>
        </button>
      </div>
    </div>
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <ul class="nav nav-secondary">
          <li class="nav-item ">
            <a class="collapsed" aria-expanded="false" href="">
              <i class="fas fa-home"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="">
              <i class="fas fa-comment"></i>
              <p>Chats</p>
            </a>
          </li>
          <li class="nav-item ">
            <a data-bs-toggle="collapse" href="#submenu">
              <i class="fa fa-cog"></i>
              <p>Settings</p>
            </a>
            <div class="collapse " id="submenu">
              <ul class="nav nav-collapse">
                <li>
                  <a href="">
                    <span class="sub-item">Logo Slider</span>
                  </a>
                </li>
                <li>
                    <a href="">
                      <span class="sub-item">Ads Poster</span>
                    </a>
                  </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>


  );
};

export default Sidebar;
