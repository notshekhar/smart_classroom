<template>
    <div class="profile_wrap">
        <div v-if="AppState.loading">Loading...</div>
        <div v-else>
            <div class="top">
                <div class="back" @click="goBack">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <div
                    class="profile_photo animate__animated animate__rubberBand"
                >
                    <img
                        v-if="AppState.user.photo_url"
                        :alt="AppState.user.name"
                        :src="api_url + AppState.user.photo_url"
                    />
                </div>
                <div class="details animate__animated animate__rubberBand">
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
                <div class="edit" @click="editProfile">
                    <i class="fas fa-pen"></i>
                </div>
            </div>
            <div class="bottom">
                <div
                    class="container animate__animated animate__slideInUp"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_url } from "@/js/configs/config"
import { useCookie } from "@/js/store"

import { AppState } from "@/states"
import { onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

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
        const router = useRouter()
        function editProfile() {
            router.push({
                name: "edit_profile",
            })
        }
        function goBack() {
            router.go(-1)
        }
        onMounted(() => {
            getUserDetails()
        })
        return { AppState, editProfile, router, api_url, goBack }
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
    /* background-color: #2488f6; */
    background-color: white;
    z-index: 101;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
.profile_wrap .top {
    height: auto;
    background-color: #2488f6;
    color: white;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile_wrap .top > .back {
    position: absolute;
    top: 10px;
    left: 20px;
}
.profile_wrap .top > .profile_photo {
    position: relative;
    height: 100px;
    width: 100px;
    background-color: red;
    border-radius: 41px;
    border: solid 4px;
    border-color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
}
.profile_wrap .top > .profile_photo > img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.profile_wrap .top > .details {
    position: relative;
    /* margin-top: 20px; */
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile_wrap .top > .details > * {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 700;
}
.profile_wrap .top > .details > .name {
    font-size: 21px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
}
.profile_wrap .top > .edit {
    position: absolute;
    bottom: 20px;
    right: 20px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.profile_wrap .bottom {
    position: relative;
    background-color: #2488f6;
    height: 100%;
}
.profile_wrap .bottom > .container {
    position: relative;
    background-color: white;
    border-radius: 31px 31px 0 0;
    height: 100%;
}
</style>
