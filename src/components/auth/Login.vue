<template>
<div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-div p-0">
                    <!-- Nested Row within Card div -->
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>

                                <form @submit.prevent="login" class="user">
                                    <div class="form-group">
                                        <input v-model="email" type="email" class="form-control form-control-user" placeholder="Enter Email Address...">
                                    </div>
                                    <div class="form-group">
                                        <input v-model="password" type="password" class="form-control form-control-user" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox small">
                                            <input type="checkbox" class="custom-control-input" id="customCheck">
                                            <label class="custom-control-label" for="customCheck">Remember Me</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    this.$store.dispatch('getUserDetails')
                    .then(response => {
                        if (this.$store.getters.isAdmin) {
                            this.$router.push('/users')
                            toast.fire({
                                type: "success",
                                title: "You have logged in successfully"
                            })
                        } else {
                            this.$store.dispatch('destroyUserDetails2')
                            swal.fire(
                                "Login Failed",
                                "There was an error logging in. Please try again.",
                                "warning"
                            )
                        }
                    }) 
                })
                .catch(() => {
                    this.$store.dispatch('destroyUserDetails2')
                    swal.fire(
                        "Login Failed",
                        "There was an error logging in. Please try again.",
                        "warning"
                    );
                })
        }
    }
}
</script>
