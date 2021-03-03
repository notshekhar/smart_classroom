<template>
    <div>
        <router-view v-slot="{ Component, route }">
            <transition
                :leave-active-class="route.meta.transitionOut"
                :enter-active-class="route.meta.transitionIn"
            >
                <component :is="Component" />
            </transition>
        </router-view>
        <!-- <router-link :to="{ name: 'Home' }">About</router-link> -->
    </div>
</template>

<script>
import { onMounted } from "vue"
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        onMounted(() => {
            document.title = "Home"
        })
        return {
            route,
        }
    },
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css";
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;900&display=swap");
* {
    outline: none;
}
#app {
    position: absolute;
    top: 0px;
    left: calc(50% - 300px);
    width: 600px;
    font-family: Heebo, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
@media (max-width: 600px) {
    #app {
        width: 100%;
        left: 0px;
    }
}
/* .fade-enter-active,
.fade-leave-active {
    transition: opacity 1000ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
} */
/* #nav {
    padding: 30px;
} */

/* #nav a {
    font-weight: bold;
    color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
    color: #42b983;
} */
</style>
