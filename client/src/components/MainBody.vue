<template>
    <div class="home_body">
        <div class="loading" v-if="AppState.loading">
            <img src="@/assets/images/loading.svg" alt="" />
        </div>
        <div v-else>
            <div class="goingOn">
                <div class="title appear_in">On Going Class</div>
                <div v-if="onGoing.length == 0">
                    <div class="subtitle">
                        No OnGoing classes
                    </div>
                </div>
                <div v-else>
                    <div v-for="tt in onGoing" :key="tt.subjectCode">
                        <div
                            class="appear_in card"
                            v-if="
                                !tt ||
                                    !tt.group ||
                                    tt.group == AppState.user.group
                            "
                        >
                            <div class="class_name">
                                {{ subjects[tt.subjectCode].name }}
                                ({{ tt.subjectCode }})
                            </div>
                            <div class="class_time">
                                <i class="far fa-clock"></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i class="far fa-user-circle"></i>
                                <span>
                                    {{ tt.place }}
                                    {{ subjects[tt.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div
                                class="people_attending"
                                v-if="subjects[tt.subjectCode].people"
                            >
                                <div
                                    class="people_card animate__animated animate__tada"
                                    v-for="ppl in subjects[
                                        tt.subjectCode
                                    ].people.slice(0, 3)"
                                    :key="ppl.uid"
                                >
                                    <div
                                        class="icon"
                                        :style="{ backgroundColor: ppl.color }"
                                    >
                                        <img
                                            :alt="ppl.name"
                                            :src="api_url + ppl.photo_url"
                                            v-if="ppl.photo_url"
                                        />
                                        <span v-else>
                                            {{ ppl.name[0].toUpperCase() }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="people_card p_highligh animate__animated animate__tada"
                                    v-if="
                                        subjects[tt.subjectCode].people.length >
                                            3
                                    "
                                >
                                    <div class="icon">
                                        <span>
                                            +{{
                                                subjects[tt.subjectCode].people
                                                    .length - 3
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[tt.subjectCode].attended"
                            >
                                <button
                                    class="attending"
                                    @click="markPresent(tt.subjectCode)"
                                >
                                    Present
                                </button>
                                <button
                                    class="attending"
                                    @click="markAbsent(tt.subjectCode)"
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upcomming">
                <div class="title appear_in">Upcomming Classes</div>
                <div class="subtitle" v-if="upComming.length == 0">
                    No Upcomming classes
                </div>
                <div v-else>
                    <div v-for="tt in upComming" :key="tt.subjectCode">
                        <div
                            class="appear_in card"
                            v-if="
                                !tt ||
                                    !tt.group ||
                                    tt.group == AppState.user.group
                            "
                        >
                            <div class="class_name">
                                {{ subjects[tt.subjectCode].name }}
                                ({{ tt.subjectCode }})
                            </div>
                            <div class="class_time">
                                <i class="far fa-clock"></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i class="far fa-user-circle"></i>
                                <span>
                                    {{ tt.place }}
                                    {{ subjects[tt.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div
                                class="people_attending"
                                v-if="subjects[tt.subjectCode].peopleAttending"
                            >
                                <div
                                    class="people_card animate__animated animate__tada"
                                    v-for="ppl in subjects[
                                        tt.subjectCode
                                    ].peopleAttending.slice(0, 3)"
                                    :key="ppl.uid"
                                >
                                    <div
                                        class="icon"
                                        :style="{ backgroundColor: ppl.color }"
                                    >
                                        <img
                                            :alt="ppl.name"
                                            :src="api_url + ppl.photo_url"
                                            v-if="ppl.photo_url"
                                        />
                                        <span v-else>
                                            {{ ppl.name[0].toUpperCase() }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="people_card p_highligh animate__animated animate__tada"
                                    v-if="
                                        subjects[tt.subjectCode].peopleAttending
                                            .length > 3
                                    "
                                >
                                    <div class="icon">
                                        <span>
                                            +{{
                                                subjects[tt.subjectCode]
                                                    .peopleAttending.length - 3
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[tt.subjectCode].attending"
                            >
                                <button
                                    class="attending"
                                    @click="markAttending(tt.subjectCode)"
                                >
                                    Attending
                                </button>
                                <button
                                    class="attending"
                                    @click="markNotAttending(tt.subjectCode)"
                                >
                                    Not Attending
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ended">
                <div class="appear_in title">Ended Classes</div>
                <div class="subtitle" v-if="ended.length == 0">
                    No Ended classes
                </div>
                <div v-else>
                    <div v-for="tt in ended" :key="tt.subjectCode">
                        <div
                            class="appear_in card"
                            v-if="
                                !tt ||
                                    !tt.group ||
                                    tt.group == AppState.user.group
                            "
                        >
                            <div class="class_name">
                                {{ subjects[tt.subjectCode].name }}
                                ({{ tt.subjectCode }})
                            </div>
                            <div class="class_time">
                                <i class="far fa-clock"></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i class="far fa-user-circle"></i>
                                <span>
                                    {{ tt.place }}
                                    {{ subjects[tt.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div
                                class="people_attending"
                                v-if="subjects[tt.subjectCode].people"
                            >
                                <div
                                    class="people_card animate__animated animate__tada"
                                    v-for="ppl in subjects[
                                        tt.subjectCode
                                    ].people.slice(0, 3)"
                                    :key="ppl.uid"
                                >
                                    <div
                                        class="icon"
                                        :style="{ backgroundColor: ppl.color }"
                                    >
                                        <img
                                            :alt="ppl.name"
                                            :src="api_url + ppl.photo_url"
                                            v-if="ppl.photo_url"
                                        />
                                        <span v-else>
                                            {{ ppl.name[0].toUpperCase() }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="people_card p_highligh animate__animated animate__tada"
                                    v-if="
                                        subjects[tt.subjectCode].people.length >
                                            3
                                    "
                                >
                                    <div class="icon">
                                        <span>
                                            +{{
                                                subjects[tt.subjectCode].people
                                                    .length - 3
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[tt.subjectCode].attended"
                            >
                                <button
                                    class="attending"
                                    @click="markPresent(tt.subjectCode)"
                                >
                                    Attended
                                </button>
                                <button
                                    class="attending"
                                    @click="markAbsent(tt.subjectCode)"
                                >
                                    Not Attended
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_gap"></div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue"
import { useCookie, useStore } from "@/js/store"
import { api_url } from "@/js/configs/config"
import io from "socket.io-client"
import axios from "axios"
import { AppState } from "@/states"

// const loading = ref(true)
const [uid] = useCookie("uid")
const [token] = useCookie("token")
const [timetable, setTimetable] = useStore("timetable")
const onGoing = ref([])
const upComming = ref([])
const ended = ref([])
const todayTimetable = ref(false)
const subjects = ref("")
const branchId = ref("")

const socket = io(api_url)
window.socket = socket

setInterval(() => {
    if (!AppState.loading) checkClasses()
}, 2000)

function markPresent(subjectCode) {
    socket.emit("class_attend", { token: token(), subjectCode, present: true })
}
function markAbsent(subjectCode) {
    socket.emit("class_attend", { token: token(), subjectCode, present: false })
}
function markAttending(subjectCode) {
    socket.emit("class_attending", {
        token: token(),
        subjectCode,
        present: true,
    })
}
function markNotAttending(subjectCode) {
    socket.emit("class_attending", {
        token: token(),
        subjectCode,
        present: false,
    })
}

function checkClasses() {
    ended.value = []
    upComming.value = []
    onGoing.value = []
    if (todayTimetable.value && todayTimetable.value.length != 0)
        todayTimetable.value.forEach((slot) => {
            let pattern = /(\d+):(\d+)/
            // start time
            let st = slot.start.match(pattern)
            let ss_hours = parseInt(st[1])
            let ss_mins = parseInt(st[2])
            // end time
            let et = slot.end.match(pattern)
            let es_hours = parseInt(et[1])
            let es_mins = parseInt(et[2])
            // console.log(st, et)
            if (
                isOngoing(
                    { hours: ss_hours, mins: ss_mins },
                    { hours: es_hours, mins: es_mins }
                )
            ) {
                onGoing.value.push(slot)
                // console.log(slot)
            } else if (
                isEnded(
                    { hours: ss_hours, mins: ss_mins },
                    { hours: es_hours, mins: es_mins }
                )
            ) {
                ended.value.push(slot)
            } else {
                upComming.value.push(slot)
            }
        })
    // console.log(ended, onGoing, upComming)
}

function isOngoing(start, end) {
    let date = new Date()
    // let hours = date.getHours()
    // let mins = date.getMinutes()
    let s = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        start.hours,
        start.mins
    )
    let e = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        end.hours,
        end.mins
    )
    return !!((date >= s) & (date <= e))
}
function isEnded(start, end) {
    let date = new Date()
    // let hours = date.getHours()
    // let mins = date.getMinutes()
    let s = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        start.hours,
        start.mins
    )
    let e = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        end.hours,
        end.mins
    )
    return !!((date > e) & (date > s))
}
async function getTimeTable() {
    // let day = new Date().getDay()
    try {
        let { data } = await axios.get(`${api_url}/getTimetable`, {
            params: {
                uid: uid(),
                token: token(),
            },
        })
        console.log(data)
        setTimetable(JSON.stringify(data))
        // console.log(JSON.parse(timetable()))
        // todayTimetable.value = JSON.parse(timetable()).timetable[day]
        todayTimetable.value = JSON.parse(timetable()).timetable[5]
        subjects.value = JSON.parse(timetable()).subjects
        AppState.loading = false
        checkClasses()
    } catch (err) {
        if (timetable()) {
            // todayTimetable.value = JSON.parse(timetable()).timetable[day]
            todayTimetable.value = JSON.parse(timetable()).timetable[5]
            subjects.value = JSON.parse(timetable()).subjects
            console.log(todayTimetable)
            AppState.loading = false
            checkClasses()
        }
        // alert(err)
        console.log(err)
    }
}
async function joinSocketRoom() {
    try {
        let {
            data: { branch_id },
        } = await axios.get(`${api_url}/getBranchId`, {
            params: {
                uid: uid(),
            },
        })
        branchId.value = branch_id
        socket.emit("join-room", uid(), branch_id)
    } catch (err) {
        alert(err.message)
        console.log(err)
    }
}
function handle_socket_response_of_attendandance_self(data) {
    if (!data.attended) alert(data.message)
    else {
        subjects.value[data.subjectCode].attended = true
        if (!subjects.value[data.subjectCode].people)
            subjects.value[data.subjectCode].people = []
        if (data.present)
            subjects.value[data.subjectCode].people.push(data.user)
    }
}
function handle_socket_response_of_attendandance(data) {
    if (!data.attended) alert(data.message)
    else {
        if (data.user.uid == uid()) {
            subjects.value[data.subjectCode].attended = true
        }
        if (!subjects.value[data.subjectCode].people)
            subjects.value[data.subjectCode].people = []
        if (data.present)
            subjects.value[data.subjectCode].people.push(data.user)
    }
}
function handle_socket_response_of_attendandance_self_upcomming(data) {
    if (!data.attended) alert(data.message)
    else {
        subjects.value[data.subjectCode].attending = true
        if (!subjects.value[data.subjectCode].peopleAttending)
            subjects.value[data.subjectCode].peopleAttending = []
        if (data.present)
            subjects.value[data.subjectCode].peopleAttending.push(data.user)
    }
}
function handle_socket_response_of_attendandance_upcomming(data) {
    if (!data.attended) alert(data.message)
    else {
        if (data.user.uid == uid()) {
            subjects.value[data.subjectCode].attending = true
        }
        if (!subjects.value[data.subjectCode].peopleAttending)
            subjects.value[data.subjectCode].peopleAttending = []
        if (data.present)
            subjects.value[data.subjectCode].peopleAttending.push(data.user)
    }
}
async function getUserDetails() {
    try {
        let { data } = await axios.get(`${api_url}/getinfo`, {
            params: {
                id: uid(),
                token: token(),
            },
        })
        AppState.user = data
        console.log(AppState.user)
    } catch (err) {
        alert(err.message)
    }
}

async function setObserver() {
    let elements = document.querySelectorAll(".appear_in")
    const options = {
        // threshold: 1,

    }
    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("show")
            entry.target.classList.add("animate__animated")
            entry.target.classList.add("animate__bounceIn")
            appearOnScroll.unobserve(entry.target)
        })
    },
    options)
    elements.forEach((el) => {
        appearOnScroll.observe(el)
    })
}

export default {
    setup() {
        onMounted(async () => {
            await getUserDetails()
            await getTimeTable()
            await setObserver()
            await joinSocketRoom()
            socket.on(
                "class_attend_response",
                handle_socket_response_of_attendandance_self
            )
            socket.on("new_attendance", handle_socket_response_of_attendandance)
            socket.on(
                "class_attending_response",
                handle_socket_response_of_attendandance_self_upcomming
            )
            socket.on(
                "new_attendance_attending",
                handle_socket_response_of_attendandance_upcomming
            )
        })
        return {
            AppState,
            socket,
            joinSocketRoom,
            // loading,
            todayTimetable,
            subjects,
            isOngoing,
            isEnded,
            api_url,
            checkClasses,
            branchId,
            onGoing,
            upComming,
            ended,
            markPresent,
            markAbsent,
            markAttending,
            markNotAttending,
        }
    },
}
</script>
<style>
.home_body {
    position: absolute;
    /* padding: 20px; */
    padding-top: 55px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* background: #f6f9ff; */
}
.home_body > .bottom_gap {
    position: relative;
    height: 20px;
}
.loading {
    padding: 15px;
}
.home_body > * {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.home_body > * .subtitle {
    color: rgb(180, 180, 180);
    font-size: 15px;
    margin: 20px;
}
.home_body .title {
    position: relative;
    font-weight: 700;
    font-size: 19px;
    color: rgba(44, 62, 80, 0.8);
}
.home_body .card {
    position: relative;
    padding: 20px;
    border-radius: 21px;
    /* background-color: rgb(244, 244, 244); */
    background-color: #f4f9ff;
    border: solid 1px;
    border-color: rgb(36 136 246 / 10%);
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
.card > .class_name {
    font-weight: 600;
    font-size: 16px;
}
.card > .class_time,
.class_place {
    font-weight: 500;
    font-size: 13px;
    color: grey;
    display: flex;
    gap: 10px;
    align-items: center;
}
.card > .class_time > i,
.class_place > i {
    color: #2488f6;
}
.card > .people_attending {
    position: relative;
    margin-top: 10px;
    height: 28px;
    display: flex;
}
.card > .people_attending .people_card {
    position: relative;
    max-height: 28px;
    min-height: 28px;
    max-width: 28px;
    min-width: 28px;
    overflow: hidden;
    border-radius: 15px;
    margin-right: -15px;
    /* box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.1); */
    border: solid 3px;
    border-color: #f4f9ff;
}
.p_highligh {
    margin-left: 18px;
    background-color: #2488f6;
}
.p_highligh > .icon > span {
    color: white;
    font-size: 11px;
}
.card > .people_attending .people_card > .icon {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
}
.card > .people_attending .people_card > .icon > img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.card > .buttons {
    position: relative;
    margin-top: 10px;
    display: flex;
    gap: 10px;
    height: 30px;
}
.card > .buttons > button {
    border-radius: 11px;
    border: none;
    color: white;
    font-weight: 700;
    padding: 0 15px 0 15px;
}
.card > .buttons > button:first-child {
    background: #2488f6;
}
.card > .buttons > button:nth-child(2) {
    background: rgb(255, 63, 63);
}
.appear_in {
    opacity: 0;
}
.show {
    opacity: 1;
}
</style>
