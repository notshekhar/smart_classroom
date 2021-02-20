<template>
    <div class="wrap">
        <div class="get-top">
            <div class="skip"></div>
        </div>
        <div class="get-bottom">
            <div class="title">
                Easy of track of Student progress
            </div>
            <div class="desc">
                Check the student daily and customise, their study material,
                check scores easily
            </div>
            <div class="next">
                <button @click="goNext()">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
    setup() {
        const router = useRouter()
        function goNext() {
            router.push({ name: "login" })
        }
        return {
            goNext,
        }
    },
}
</script>
