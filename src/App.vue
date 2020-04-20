<template>
    <transition name="fade">
        <Home />
    </transition>
</template>

<script>
import Home from './views/Home'
export default {
    components: {
        Home
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
