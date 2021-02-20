<template>
    <div class="home">
        <router-view></router-view>
        <router-link to="/profile">Profile</router-link>
        <img alt="Vue logo" src="../../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
    setup() {
        return {
            HelloWorld,
        }
    },
}
</script>
