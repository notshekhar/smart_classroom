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
import { useRouter } from "vue-router"

export default {
    setup() {
        const router = useRouter()
        onMounted(() => {
            document.title = "Timetable | Home"
            router.push({ name: "home" })
        })
        return {
            Footer,
        }
    },
}
</script>
