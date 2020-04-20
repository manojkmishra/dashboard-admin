<template>

</template>

<script>
export default {
    created() {
         this.$store.dispatch('destroyUserDetails')
            .then(response => {
                this.$router.push('/login')
                toast.fire({
                    type: "success",
                    title: "You have logged out successfully"
                });
            })
    }
}
</script>
