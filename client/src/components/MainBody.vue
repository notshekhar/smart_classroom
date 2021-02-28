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
                    <div class="card" v-if="onGoing.nClasses == 1">
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
                        <div class="buttons">
                            <button
                                class="attending"
                                @click="markPresent(onGoing.subjectCode)"
                            >
                                Present
                            </button>
                            <button class="attending">Absent</button>
                        </div>
                        <div class="people_attending"></div>
                    </div>
                    <div v-else>
                        <div
                            class="card"
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
                            <div class="buttons">
                                <button
                                    class="attending"
                                    @click="markPresent(clas.subjectCode)"
                                >
                                    Present
                                </button>
                                <button class="attending">Absent</button>
                            </div>
                            <div class="people_attending"></div>
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
                        <div class="card" v-if="tt.nClasses == 1">
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
                            <div class="buttons">
                                <button class="attending">
                                    Attending
                                </button>
                                <button class="attending">Not Attending</button>
                            </div>
                            <div class="people_attending"></div>
                        </div>
                        <!-- //if a single slot have more then 1 classes  -->
                        <div
                            class="card"
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
                            <div class="people_attending"></div>
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
                        <div class="card" v-if="tt.nClasses == 1">
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
                            <div class="buttons">
                                <button class="attending">
                                    Attended
                                </button>
                                <button class="attending">Not Attended</button>
                            </div>
                            <div class="people_attending"></div>
                        </div>
                        <!-- //if a single slot have more then 1 classes  -->
                        <div
                            class="card"
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
                            <div class="buttons">
                                <button class="attending">
                                    Attended
                                </button>
                                <button class="attending">Not Attended</button>
                            </div>
                            <div class="people_attending"></div>
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

const loading = ref(true)
const [uid] = useCookie("uid")
const [timetable, setTimetable] = useStore("timetable")
const onGoing = ref(false)
const upComming = ref([])
const ended = ref([])
const todayTimetable = ref(false)
const subjects = ref("")

const socket = io(api_url)

setInterval(() => {
    // let date = new Date()
    // let hours = date.getHours()
    // let mins = date.getMinutes()
    // let str = `${hours}:${mins}`
    // console.log(todayTimetable.value)
    checkClasses()
    // console.log(onGoing.value)
}, 2000)

function markPresent(subjectCode) {
    socket.emit("class_attend", uid(), subjectCode)
    console.log(subjectCode)
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
    console.log(day)
    try {
        let res = await fetch(`${api_url}/getTimetable?uid=${uid()}`)
        let data = await res.json()
        console.log(data)
        setTimetable(JSON.stringify(data))
        // console.log(JSON.parse(timetable()))
        // todayTimetable.value = JSON.parse(timetable()).timetable[day]
        todayTimetable.value = JSON.parse(timetable()).timetable[5]
        subjects.value = JSON.parse(timetable()).subjects
        loading.value = false
        checkClasses()
    } catch (err) {
        if (timetable()) {
            // todayTimetable.value = JSON.parse(timetable()).timetable[day]
            todayTimetable.value = JSON.parse(timetable()).timetable[5]
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
        let res = await fetch(`${api_url}/getBranchId?uid=${uid()}`)
        let data = await res.json()
        let { branch_id } = data
        console.log(data, uid())
        socket.emit("join-room", uid(), branch_id)
    } catch (err) {
        alert(err.message)
        console.log(err)
    }
}
export default {
    setup() {
        onMounted(() => {
            getTimeTable()
            joinSocketRoom()
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
            onGoing,
            upComming,
            ended,
            markPresent,
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
