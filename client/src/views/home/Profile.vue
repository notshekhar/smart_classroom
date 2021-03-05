<template>
    <div class="profile_wrap">
        <div v-if="AppState.loading">Loading...</div>
        <div v-else>
            <div class="top">
                <div class="back"><i class="fas fa-arrow-left"></i></div>
                <div class="profile_photo">
                    <div
                        class="img"
                        v-if="AppState.user.photo_url"
                        :style="{
                            backgroundImage: url(AppState.user.photo_url),
                        }"
                    ></div>
                </div>
                <div class="details">
                    <div class="name">{{ AppState.user.name }}</div>
                    <div class="roll_number">
                        {{ AppState.user.roll_number }}
                    </div>
                    <div class="branch_details">
                        {{ AppState.user.school }}
                        {{ AppState.user.branch }}
                    </div>
                    <div class="group">
                        <span>Group:</span>{{ AppState.user.group }}
                    </div>
                    <div class="mobile">{{ AppState.user.mobile }}</div>
                    <div class="email">{{ AppState.user.email }}</div>
                </div>
                <div class="edit"></div>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script>
import { api_url } from "@/js/configs/config"
import { useCookie } from "@/js/store"

import { AppState } from "@/states"
import { onMounted } from "vue"
import axios from "axios"

const [uid] = useCookie("uid")
const [token] = useCookie("token")

async function getUserDetails() {
    AppState.loading = true
    try {
        let { data } = await axios.get(`${api_url}/getinfo`, {
            params: {
                id: uid(),
                token: token(),
            },
        })
        console.log(data)
        AppState.user = data
        AppState.loading = false
    } catch (err) {
        alert(err.message)
    }
}

export default {
    setup() {
        onMounted(() => {
            getUserDetails()
        })
        return { AppState }
    },
}
</script>

<style>
.profile_wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: white;
    z-index: 101;
}
.profile_wrap {
}
</style>
