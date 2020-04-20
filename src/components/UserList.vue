<template>
<div v-if="loggedIn && isAdmin" class="container-fluid">
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-dark">User List</h6>
                    <div class="card-tools">
                        <div class="input-group input-group-sm" style="width: 200px;">
                            <div class>
                                <input type="text" v-model="search" @keyup.enter="searchUsers" class="form-control float-right" placeholder="Search" style="height: 37.5px;">
                                <button class="btn btn-dark mt-2" @click="newUserModal" data-toggle="modal" data-target="#userModal" style="width: 200px;">
                                    Add New
                                    <i class="fas fa-user-plus fa-fw"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Apps</th>
                                    <th>Roles</th>
                                    <th>States</th>
                                    <th>Sites</th>
                                    <th>Actions</th>
                                </tr>
                                <tr v-for="user in users.data" :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <span v-for="(app, idx) in user.apps" :key="idx" class="btn btn-success btn-sm" style="margin: 2px;">
                                            <a class="text text-white">{{ app.app | toUpperCase }}</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span v-for="(role, idx) in user.roles" :key="idx" class="btn btn-primary btn-sm" style="margin: 2px;">
                                            <a class="text text-white">{{ role.role | toUpperCase }}</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span v-for="(state, idx) in user.states" :key="idx" class="btn btn-warning btn-sm" style="margin: 2px;">
                                            <a class="text text-white">{{ state.state | toUpperCaseAll }} </a>
                                        </span>
                                    </td>
                                    <td>
                                        <span v-for="(site, idx) in user.sites" :key="idx" class="btn btn-info btn-sm" style="margin: 2px;">
                                            <a class="text text-white">{{ site.site | ToLongName }}</a>
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-secondary btn-lg" @click="editUserModal(user)" style="margin: 2px;">
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button class="btn btn-danger btn-lg" @click="deleteUser(user.id)" style="margin: 2px;">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <pagination :data="users" @pagination-change-page="getResults"></pagination>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>

    <!-- User Modal -->
    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editmode" id="userModalLabel">Create A User</h5>
                    <h5 class="modal-title" v-show="editmode" id="userModalLabel">Update User Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input v-model="form.name" type="text" name="name" placeholder="Enter name here..." class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Email Address</label>
                            <input v-model="form.email" type="email" name="email" placeholder="Enter email address here..." class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Applications</label>
                            <multiselect v-model="form.apps" :options="appOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick apps" label="app" track-by="app" :preselect-first="true">
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label>Roles</label>
                            <multiselect v-model="form.roles" :options="roleOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick roles" label="role" track-by="role" :preselect-first="true">
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label>States</label>
                            <multiselect v-model="form.states" :options="stateOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="state" track-by="state" :preselect-first="false">
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label>Sites</label>
                            <multiselect v-model="form.sites" :options="siteOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick sites" label="site" track-by="site" :preselect-first="false">
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" type="password" name="password" placeholder="Enter password here..." class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button v-show="!editmode" type="submit" class="btn btn-success">Create</button>
                        <button v-show="editmode" type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'user-list',
    data() {
        return {
            editmode: true,
            search: '',
            users: {},
            states: [],
            form: new Form({
                id: "",
                name: "",
                email: "",
                apps: "",
                roles: "",
                states: "",
                sites: "",
                password: "",
                remember: false
            }),
            appOptions: [{
                    "app": "saw"
                },
                {
                    "app": "estimating"
                },
                {
                    "app": "sales"
                },
            ],
            roleOptions: [{
                    "role": "admin"
                },
                {
                    "role": "manager"
                },
                {
                    "role": "user"
                },
            ],
            stateOptions: [{
                    "state": "nat"
                },
                {
                    "state": "vic"
                },
                {
                    "state": "qld"
                },
                {
                    "state": "nsw"
                },
                {
                    "state": "sa"
                },
                {
                    "state": "wa"
                },
                {
                    "state": "tas"
                },
                {
                    "state": "act"
                }
            ],
            siteOptions: [{
                    "site": "bay"
                },
                {
                    "site": "wod"
                },
                {
                    "site": "bal"
                },
                {
                    "site": "ben"
                },
                {
                    "site": "crg"
                },
                {
                    "site": "gel"
                },
                {
                    "site": "shp"
                },
                {
                    "site": "tra"
                },
                {
                    "site": "wbl"
                },
                {
                    "site": "mld"
                },
                {
                    "site": "lau"
                },
                {
                    "site": "moo"
                },
                {
                    "site": "per"
                },
                {
                    "site": "smt"
                },
                {
                    "site": "now"
                },
                {
                    "site": "new"
                },
                {
                    "site": "qbn"
                },
                {
                    "site": "gbg"
                },
                {
                    "site": "crn"
                },
                {
                    "site": "knp"
                },
                {
                    "site": "tvl"
                },
                {
                    "site": "eli"
                },
                {
                    "site": "lon"
                },
            ],
        };
    },
    created() {
        this.getUsers()
        Fire.$on("UserChanges", () => {
            this.getUsers();
        })
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
        searchUsers() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            return new Promise((resolve, reject) => {
                let query = this.search
                axios.get('users/search-users?q=' + query)
                    .then(response => {
                        this.users = response.data
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })

        },

        getResults(page = 1) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            return new Promise((resolve, reject) => {
                axios.get('/user/list?page=' + page)
                    .then(response => {
                        this.users = response.data
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
        getUsers() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            return new Promise((resolve, reject) => {
                axios.get('/user/list')
                    .then(response => {
                        this.users = response.data
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
        createUser() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            return new Promise((resolve, reject) => {
                axios({
                        method: 'post',
                        url: '/user/create',
                        data: this.form,
                    })
                    .then(response => {
                        //Notification
                        toast.fire({
                            type: "success",
                            title: "User created successfully"
                        });
                        //Reload user table
                        Fire.$emit("UserChanges");
                        //Close modal
                        $("#userModal").modal("hide");
                        //Resolve
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        updateUser(id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            if (this.form.password == "") {
                this.form.password = undefined;
            }
            return new Promise((resolve, reject) => {
                axios({
                        method: 'put',
                        url: '/user/update/' + this.form.id,
                        data: this.form,
                    })
                    .then(response => {
                        //Notification
                        toast.fire({
                            type: "success",
                            title: "User updated successfully"
                        });
                        //Reload user table
                        Fire.$emit("UserChanges");
                        //Close modal
                        $("#userModal").modal("hide");
                        //Resolve
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        deleteUser(id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token
            swal
                .fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then(result => {
                    if (result.value) {
                        return new Promise((resolve, reject) => {
                            axios.delete('/users/delete/' + id)
                                .then(response => {
                                    Fire.$emit("UserChanges");
                                    swal.fire(
                                        "Deleted!",
                                        "User has been successfully deleted.",
                                        "success"
                                    );
                                    resolve(response)
                                })
                                .catch(error => {
                                    reject(error)
                                    console.log(error)
                                })
                        })
                    }
                }).catch(() => {
                    swal.fire(
                        "Failed!",
                        "There was an error deleting the user.",
                        "warning"
                    );
                })

        },
        newUserModal() {
            this.editmode = false;
            this.form.reset();
            $("#userModal").modal("show");
        },
        editUserModal(user) {
            this.editmode = true;
            this.form.reset();
            $("#userModal").modal("show");
            this.form.fill(user);
        }
    },
}
</script>
