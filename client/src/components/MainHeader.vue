<template>
    <div class="home_header">
        <div v-if="AppState.loading"></div>
        <div v-else>
            <div class="logo"></div>
            <div class="profile" @click="router.push({ name: 'profile' })">
                <img
                    :src="api_url + AppState.user.photo_url"
                    :alt="AppState.user.name"
                    v-if="AppState.user.photo_url"
                />
                <span v-else>{{ AppState.user.name[0] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router"
import { AppState } from "@/states"
import { api_url } from "@/js/configs/config"

export default {
    setup() {
        let router = useRouter()
        return {
            router,
            AppState,
            api_url,
        }
    },
}
</script>

<style>
.home_header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 55px;
    background-color: white;
    /* box-shadow: 0 0px 1px 0px rgb(36 136 246 / 50%); */
    border-bottom: solid 1.5px;
    border-color: rgb(224, 224, 224);
    z-index: 10;
}
.home_header > div {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}
.home_header .profile {
    margin-left: auto;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    background-color: #2488f6;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 800;
    font-size: 21px;
    overflow: hidden;
}
</style>
