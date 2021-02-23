<template>
    <div class="home">
        <router-view></router-view>
        <!-- <router-link to="/profile">Profile</router-link> -->
        <Footer />
    </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue"
import { onMounted } from "vue"

export default {
    setup() {
        onMounted(() => {
            document.title = "Timetable | Home"
        })
        return {
            Footer,
        }
    },
}
</script>
