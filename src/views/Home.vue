<template>
<!-- Page Wrapper -->
<div id="wrapper">
    <!-- Sidebar -->
    <ul :class="{'toggled': isCollapsed}" class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon">
                <i class="fas fa-tools"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Dowell Admin</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <transition name="fade">
        <div v-if="loggedIn">
            <!-- Nav Item - Dashboard -->
            <li v-if="isAdmin" class="nav-item active">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>  

            <!-- Divider -->
            <hr v-if="isAdmin" class="sidebar-divider">

            <!-- Heading -->
            <div v-if="isAdmin" class="sidebar-heading">
                User Accounts
            </div>

            <!-- Nav Item -->
            <li v-if="isAdmin" class="nav-item">
                <router-link class="nav-link" to="/users">
                    <i class="fas fa-fw fa-users"></i>
                    <span>User List</span>
                </router-link>
            </li>
        </div>
        </transition>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Heading -->
        <div class="sidebar-heading">
            Account Controls
        </div>

        <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Login</span>
            </router-link>
        </li>

        <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/logout">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Logout</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button @click="sideBarToggle()" class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <!-- Sidebar Toggle (Topbar) -->
                <button @click="sideBarToggle()" id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>
                
            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">
                <transition name="fade">
                    <router-view />
                </transition>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/auth";

export default {
    name: 'home',
    data() {
        return {
            isCollapsed: false,
            name: ''
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isAdmin() {
            return this.$store.getters.isAdmin
        },
    },
    methods: {
        sideBarToggle() {
            this.isCollapsed = !this.isCollapsed
        },
        sidebarToggleTop() {
            this.isCollapsed = !this.isCollapsed
        },
        
    },
}
</script>
