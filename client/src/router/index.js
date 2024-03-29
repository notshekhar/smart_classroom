import { createRouter, createWebHistory } from "vue-router"

import Home from "@/views/home/Home.vue"
import Profile from "@/views/home/Profile.vue"
// import EditProfile from "@/views/home/EditProfile.vue"
import NotFound from "@/views/NotFound.vue"
import Details from "@/views/Details.vue"
import Main from "@/views/home/Main.vue"
import GetStarted from "@/views/getStarted/getStarted.vue"
import GetStarted2 from "@/views/getStarted/getStarted2.vue"
import Login from "@/views/auth/Login.vue"

import { useCookie, useStore } from "@/js/store"
import { handleRouterTransisitions } from "@/js/routerTransitions"
import { api_url } from "@/js/configs/config"
import axios from "axios"

const [first] = useStore("first-time")
const [token] = useCookie("token")

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: async (to, from, next) => {
            let f = first() ? first() == "true" : true
            if (f) {
                // [x]TODO: if use came for the first time
                next({ name: "getStarted" })
            } else {
                //[]TODO: check if not logged in redirect to login page
                try {
                    let { data, status } = await axios.get(`${api_url}/auth`, {
                        params: {
                            token: token(),
                        },
                    })
                    if (status == 403) next({ name: "login" })
                    if (data.auth) {
                        if (data.detail_page) {
                            next({ name: "details" })
                        } else {
                            next()
                        }
                    } else {
                        next({ name: "login" })
                    }
                } catch (err) {
                    next({ name: "login" })
                }
            }
        },
        children: [
            {
                path: "/",
                name: "home",
                component: Main,
            },
            {
                path: "/timetable",
                name: "timetable",
                component: Main,
            },

            {
                path: "/announcement",
                name: "announcement",
                component: Main,
            },
            {
                path: "/myclasses",
                name: "myclasses",
                component: Main,
            },
            {
                path: "/polls",
                name: "polls",
                component: Main,
            },
            {
                path: "/profile",
                name: "profile",
                component: Profile,
            },
            {
                path: "/editProfile",
                name: "edit_profile",
                component: Details,
            },
        ],
    },
    {
        path: "/get-started",
        name: "getStarted",
        component: GetStarted,
        beforeEnter: (to, from, next) => {
            if (from.name == "getStarted2") next()
            let f = first() ? first() == "true" : true
            if (!f) {
                next({ name: "Home" })
            } else {
                next()
            }
        },
    },
    {
        path: "/get-started2",
        name: "getStarted2",
        component: GetStarted2,
        beforeEnter: (to, from, next) => {
            if (from.name == "getStarted") next()
            let f = first() ? first() == "true" : true
            if (!f) {
                next({ name: "Home" })
            } else {
                next()
            }
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: async (to, from, next) => {
            let f = first() ? first() == "true" : true
            if (f) {
                // [x]TODO: if use came for the first time
                next({ name: "getStarted" })
            } else {
                //if already loggedIn redirect to home page
                try {
                    let { data } = await axios.get(`${api_url}/auth`, {
                        params: {
                            token: token(),
                        },
                    })
                    if (data.auth) {
                        next({ name: "Home" })
                    } else {
                        next()
                    }
                } catch (err) {
                    next()
                }
            }
        },
    },
    {
        path: "/details",
        name: "details",
        component: Details,
        beforeEnter: async (to, from, next) => {
            let f = first() ? first() == "true" : true
            if (f) {
                // [x]TODO: if use came for the first time
                next({ name: "getStarted" })
            } else {
                //if already loggedIn redirect to home page
                let { data, status } = await axios.get(`${api_url}/auth`, {
                    params: {
                        token: token(),
                    },
                })
                if (status == 403) next({ name: "Home" })
                if (data.auth & !data.detail_page) {
                    next({ name: "Home" })
                } else {
                    // show offline page
                    next()
                }
            }
        },
    },
    //404 not found
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})
//handeling router transitions
handleRouterTransisitions(router)

export default router
