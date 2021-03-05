<template>
    <div class="wrap">
        <div id="recp"></div>
        <div class="login-wrap">
            <div class="text">
                <div class="title" v-if="!otp_sent">
                    Enter your mobile number
                </div>
                <div class="title animate__animated animate__flipInX" v-else>
                    Enter OTP
                </div>
                <div class="desc" v-if="!otp_sent">
                    We will send you a confirmation code
                </div>
                <div class="desc animate__animated animate__flipInX" v-else>
                    Enter OTP code to confirmation code
                </div>
            </div>
            <div class="inputs" v-if="!otp_sent">
                <div class="mob_div" @click="focusInput()">
                    <span>+91 </span>
                    <input
                        type="number"
                        ref="mobile_inp"
                        v-model="mobile"
                        @change="sendOTP()"
                    />
                </div>
                <button @click="sendOTP()" v-if="!sending_otp">Send OTP</button>
                <button
                    @click="sendOTP()"
                    class="animate__animated animate__rubberBand"
                    v-if="sending_otp"
                >
                    ...
                </button>
            </div>
            <div class="inputs" v-else>
                <div
                    class="mob_div animate__animated animate__jello"
                    @click="focusInput()"
                >
                    <input
                        type="number"
                        ref="mobile_inp"
                        v-model="otp"
                        @change="verifyOTP()"
                    />
                </div>
                <button
                    @click="sendOTP()"
                    class="animate__animated animate__rubberBand"
                    v-if="!sending_otp"
                >
                    Next
                </button>
                <button
                    @click="sendOTP()"
                    class="animate__animated animate__rubberBand"
                    v-else
                >
                    ...
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue"

import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from "@/js/configs/firebase_configs"

import { api_url } from "@/js/configs/config"
import { useRouter } from "vue-router"
import { useCookie } from "@/js/store"

const [token, setToken] = useCookie("token")
const [uid, setUid] = useCookie("uid")

const mobile = ref("")
const mobile_inp = ref("")
const otp = ref("")
const otp_sent = ref(false)
const sending_otp = ref(false)
const recaptcha_done = ref(false)

function sendOTP() {
    sending_otp.value = true
    // validate number
    // if (mobile.value.length != 10) {
    //     alert("Enter a Valid Mobile Number")
    //     sending_otp.value = false
    //     return
    // }
    //verify recaptcha
    if (!recaptcha_done.value) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recp", {
            size: "invisible",
            callback: function() {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("captcha solved")
            },
        })
        recaptcha_done.value = true
    }
    let m = `+91${mobile.value}`
    firebase
        .auth()
        .signInWithPhoneNumber(m, window.recaptchaVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult
            otp_sent.value = true
            sending_otp.value = false
        })
        .catch((err) => {
            console.log(err)
            alert(err.message)
            sending_otp.value = false
        })
    // otp_sent.value = true
}

function focusInput() {
    mobile_inp.value.focus()
}

export default {
    setup() {
        const router = useRouter()
        onMounted(() => {
            //setting title of page
            document.title = "LogIn"
            console.log(token())
            console.log(uid())
            //initialize firebase app
            firebase.initializeApp(firebaseConfig)
            firebase.auth().languageCode = "en"
            //focus on mobile input and otp input
            focusInput()
        })
        function verifyOTP() {
            console.log("verifying....")
            sending_otp.value = true
            window.confirmationResult
                .confirm(otp.value)
                .then(function(result) {
                    console.log("verify done")
                    console.log(result.user)
                    // localStorage.setItem("user", JSON.stringify(result.user))
                    //getToken
                    console.log("getting id token")
                    firebase
                        .auth()
                        .currentUser.getIdToken(/* forceRefresh */ true)
                        .then(function(idToken) {
                            console.log("got the token")
                            console.log(idToken)
                            //send to server -> verify token from server
                            checkLoginAuth(idToken)
                        })
                        .catch(function(error) {
                            console.log(error)
                            alert(error.message)
                            sending_otp.value = false
                        })
                })
                .catch(function(err) {
                    console.log(err)
                    alert(err.message)
                    sending_otp.value = false
                })
        }
        async function checkLoginAuth(idToken) {
            try {
                let res = await fetch(`${api_url}/login?token=${idToken}`)
                let data = await res.json()
                if (data.auth) {
                    //set cookie
                    setToken(data.token)
                    setUid(data.uid)
                    router.push({ name: "home" })
                } else {
                    alert(data.message)
                }
            } catch (err) {
                console.log(err)
                alert(err.message)
            }
        }
        return {
            mobile,
            mobile_inp,
            otp,
            sending_otp,
            otp_sent,
            recaptcha_done,
            sendOTP,
            focusInput,
            verifyOTP,
        }
    },
}
</script>

<style>
.login-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 60px 0 0 20px;
    /* align-items: center; */
    /* justify-content: center; */
    /* border-radius: 21px 21px 0 0; */
}
.login-wrap > .text > .title {
    font-weight: 800;
    font-size: 25px;
}
.login-wrap > .text > .desc {
    font-size: 13px;
    color: #6a6a6a;
}
.login-wrap > .inputs > .mob_div {
    margin-top: 20px;
    height: 50px;
    width: 80%;
    border-radius: 21px;
    border: none;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    background-color: #eaeaea;
    padding-left: 10px;
}
.login-wrap > .inputs > .mob_div > input {
    font-size: 17px;
    font-weight: 700;
    color: #2c3e50;
    border: none;
    padding: 0px;
    padding-left: 10px;
    background-color: transparent;
}
.login-wrap > .inputs > button {
    position: absolute;
    bottom: 100px;
    width: 60px;
    height: 60px;
    border: none;
    background-color: #2488f6;
    color: white;
    font-weight: 800;
    border-radius: 21px;
    box-shadow: 0 0px 11px 2px rgb(36 136 246 / 50%);
    left: calc(50% - 30px);
}
</style>
