<template>
    <div class="home_body">
        <div class="loading" v-if="loading">
            <img src="@/assets/images/loading.svg" alt="" />
        </div>
        <div v-else>
            <div class="goingOn">
                <div class="title">On Going Class</div>
                <div v-if="!onGoing">
                    <div class="subtitle">
                        No OnGoing classes
                    </div>
                </div>
                <div v-else>
                    <div
                        class="card animate__animated animate__bounceIn"
                        v-if="onGoing.nClasses == 1"
                    >
                        <div class="class_name">
                            {{ subjects[onGoing.subjectCode].name }}
                        </div>
                        <div class="class_time">
                            <i><!-- time iconn --></i>
                            <span>{{ onGoing.start }} - {{ onGoing.end }}</span>
                        </div>
                        <div class="class_place">
                            <i> <!-- time iconn --></i>
                            <span>
                                {{ onGoing.place }}
                                {{ subjects[onGoing.subjectCode].teacherName }}
                            </span>
                        </div>
                        <div class="people_attending">
                            <div v-if="subjects[onGoing.subjectCode].people">
                                {{
                                    subjects[onGoing.subjectCode].people.length
                                }}
                            </div>
                        </div>
                        <div
                            class="buttons"
                            v-if="!subjects[onGoing.subjectCode].attended"
                        >
                            <button
                                class="attending"
                                @click="markPresent(onGoing.subjectCode)"
                            >
                                Present
                            </button>
                            <button
                                class="attending"
                                @click="markAbsent(onGoing.subjectCode)"
                            >
                                Absent
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <div
                            class="card animate__animated animate__bounceIn"
                            v-for="clas in onGoing.classes"
                            :key="clas.subjectCode"
                        >
                            <!-- multiple classes  -->
                            <div class="class_name">
                                {{ subjects[clas.subjectCode].name }}
                            </div>
                            <div class="class_time">
                                <i><!-- time iconn --></i>
                                <span
                                    >{{ onGoing.start }} -
                                    {{ onGoing.end }}</span
                                >
                            </div>
                            <div class="class_place">
                                <i><!-- time iconn --></i>
                                <span>
                                    {{ clas.place }}
                                    {{ subjects[clas.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div class="people_attending">
                                <div v-if="subjects[clas.subjectCode].people">
                                    {{
                                        subjects[clas.subjectCode].people.length
                                    }}
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[clas.subjectCode].attended"
                            >
                                <button
                                    class="attending"
                                    @click="markPresent(clas.subjectCode)"
                                >
                                    Present
                                </button>
                                <button
                                    class="attending"
                                    @click="markAbsent(clas.subjectCode)"
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upcomming">
                <div class="title">Upcomming Classes</div>
                <div class="subtitle" v-if="upComming.length == 0">
                    No Upcomming classes
                </div>
                <div v-else>
                    <div v-for="tt in upComming" :key="tt.subjectCode">
                        <div
                            class="card animate__animated animate__bounceIn"
                            v-if="tt.nClasses == 1"
                        >
                            <div class="class_name">
                                {{ subjects[tt.subjectCode].name }}
                            </div>
                            <div class="class_time">
                                <i> <!-- time iconn --></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i> <!-- time iconn --></i>
                                <span>
                                    {{ tt.place }}
                                    {{ subjects[tt.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div class="people_attending">
                                <div v-if="subjects[tt.subjectCode].people">
                                    {{ subjects[tt.subjectCode].people.length }}
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[tt.subjectCode].attend"
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
                        <!-- //if a single slot have more then 1 classes  -->
                        <div
                            class="card animate__animated animate__bounceIn"
                            v-else
                            v-for="clas in tt.classes"
                            :key="clas.subjectCode"
                        >
                            <div class="class_name">
                                {{ subjects[clas.subjectCode].name }}
                            </div>
                            <div class="class_time">
                                <i> <!-- time iconn --></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i> <!-- time iconn --></i>
                                <span>
                                    {{ clas.place }}
                                    {{ subjects[clas.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div class="people_attending">
                                <div v-if="subjects[clas.subjectCode].people">
                                    {{
                                        subjects[clas.subjectCode].people.length
                                    }}
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[clas.subjectCode].attended"
                            >
                                <button
                                    class="attending"
                                    @click="markAttending(clas.subjectCode)"
                                >
                                    Attending
                                </button>
                                <button
                                    class="attending"
                                    @click="markNotAttending(clas.subjectCode)"
                                >
                                    Not Attending
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ended">
                <div class="title">Ended Classes</div>
                <div class="subtitle" v-if="ended.length == 0">
                    No Ended classes
                </div>
                <div v-else>
                    <div v-for="tt in ended" :key="tt.subjectCode">
                        <div
                            class="card animate__animated animate__bounceIn"
                            v-if="tt.nClasses == 1"
                        >
                            <div class="class_name">
                                {{ subjects[tt.subjectCode].name }}
                            </div>
                            <div class="class_time">
                                <i> <!-- time iconn --></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i> <!-- time iconn --></i>
                                <span>
                                    {{ tt.place }}
                                    {{ subjects[tt.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div class="people_attending">
                                <div v-if="subjects[tt.subjectCode].people">
                                    {{ subjects[tt.subjectCode].people.length }}
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
                        <!-- //if a single slot have more then 1 classes  -->
                        <div
                            class="card animate__animated animate__bounceIn"
                            v-else
                            v-for="clas in tt.classes"
                            :key="clas.subjectCode"
                        >
                            <div class="class_name">
                                {{ subjects[clas.subjectCode].name }}
                            </div>
                            <div class="class_time">
                                <i> <!-- time iconn --></i>
                                <span>{{ tt.start }} - {{ tt.end }}</span>
                            </div>
                            <div class="class_place">
                                <i> <!-- time iconn --></i>
                                <span>
                                    {{ clas.place }}
                                    {{ subjects[clas.subjectCode].teacherName }}
                                </span>
                            </div>
                            <div class="people_attending">
                                <div v-if="subjects[clas.subjectCode].people">
                                    {{
                                        subjects[clas.subjectCode].people.length
                                    }}
                                </div>
                            </div>
                            <div
                                class="buttons"
                                v-if="!subjects[clas.subjectCode].attended"
                            >
                                <button
                                    class="attending"
                                    @click="markPresent(clas.subjectCode)"
                                >
                                    Attended
                                </button>
                                <button
                                    class="attending"
                                    @click="markAbsent(clas.subjectCode)"
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

const loading = ref(true)
const [uid] = useCookie("uid")
const [token] = useCookie("token")
const [timetable, setTimetable] = useStore("timetable")
const onGoing = ref(false)
const upComming = ref([])
const ended = ref([])
const todayTimetable = ref(false)
const subjects = ref("")
const branchId = ref("")

const socket = io(api_url)
window.socket = socket

setInterval(() => {
    checkClasses()
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
    onGoing.value = false
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
                onGoing.value = slot
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
    let day = new Date().getDay()
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
        todayTimetable.value = JSON.parse(timetable()).timetable[day]
        // todayTimetable.value = JSON.parse(timetable()).timetable[5]
        subjects.value = JSON.parse(timetable()).subjects
        loading.value = false
        checkClasses()
    } catch (err) {
        if (timetable()) {
            todayTimetable.value = JSON.parse(timetable()).timetable[day]
            // todayTimetable.value = JSON.parse(timetable()).timetable[5]
            subjects.value = JSON.parse(timetable()).subjects
            console.log(todayTimetable)
            loading.value = false
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
    console.log(data)
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
    console.log(data)
}
function handle_socket_response_of_attendandance_upcomming(data) {
    console.log(data)
}
export default {
    setup() {
        onMounted(() => {
            getTimeTable()
            joinSocketRoom()
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
            socket,
            joinSocketRoom,
            loading,
            todayTimetable,
            subjects,
            isOngoing,
            isEnded,
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
    background-color: rgb(36 136 246 / 5%);
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
}
</style>
