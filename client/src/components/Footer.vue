<template>
    <div class="footer">
        <div
            class="tabs home"
            :class="{ 'home-selected': route.meta.selected == 'home' }"
            @click="() => router.push({ name: 'home' })"
        >
            <i
                class="animate__animated"
                :class="{ animate__bounceIn: route.meta.selected == 'home' }"
            ></i>
        </div>
        <div
            class="tabs timetable animate_animated"
            :class="{
                'timetable-selected': route.meta.selected == 'timetable',
            }"
            @click="() => router.push({ name: 'timetable' })"
        >
            <i
                class="animate__animated"
                :class="{
                    animate__bounceIn: route.meta.selected == 'timetable',
                }"
            ></i>
        </div>
        <div
            class="tabs announcement animate_animated"
            :class="{
                'announcement-selected': route.meta.selected == 'announcement',
            }"
            @click="() => router.push({ name: 'announcement' })"
        >
            <i
                class="animate__animated"
                :class="{
                    animate__bounceIn: route.meta.selected == 'announcement',
                }"
            ></i>
        </div>
        <div
            class="tabs myclasses animate_animated"
            :class="{
                'myclasses-selected': route.meta.selected == 'myclasses',
            }"
            @click="() => router.push({ name: 'myclasses' })"
        >
            <i
                class="animate__animated"
                :class="{
                    animate__bounceIn: route.meta.selected == 'myclasses',
                }"
            ></i>
        </div>
        <div
            class="tabs polls animate_animated"
            :class="{ 'polls-selected': route.meta.selected == 'polls' }"
            @click="() => router.push({ name: 'polls' })"
        >
            <i
                class="animate__animated"
                :class="{ animate__bounceIn: route.meta.selected == 'polls' }"
            ></i>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
const selected = ref({
    home: true,
    timetable: false,
    announcement: false,
    myclass: false,
    poll: false,
})
export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            selected,
            route,
            router,
        }
    },
}
</script>

<style>
.footer {
    position: fixed;
    bottom: 10px;
    left: calc(50% - 48%);
    width: 96%;
    height: 55px;
    background-color: white;
    box-shadow: 0 0px 4px 0px rgb(36 136 246 / 50%);
    display: flex;
    border-radius: 21px 21px 21px 21px;
}
.footer > .tabs {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer > .tabs > i {
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-image: url(../assets/icons/icon-sprite.png);
    transition: height width 400ms;
}
.footer > .home > i {
    background-position: -150px 0;
}
.footer > .home > i:active {
    background-position: 0 0;
}
.footer > .timetable > i {
    background-position: -270px 0;
}
.footer > .timetable > i:active {
    background-position: -120px 0;
}
.footer > .announcement > i {
    background-position: -180px 0;
}
.footer > .announcement > i:active {
    background-position: -30px 0;
}
.footer > .myclasses > i {
    background-position: -210px 0;
}
.footer > .myclasses > i:active {
    background-position: -60px 0;
}
.footer > .polls > i {
    background-position: -240px 0;
}
.footer > .polls > i:active {
    background-position: -90px 0;
}
.footer > .home-selected > i {
    background-position: 0 0;
}
.footer > .myclasses-selected > i {
    background-position: -60px 0;
}
.footer > .announcement-selected > i {
    background-position: -30px 0;
}
.footer > .timetable-selected > i {
    background-position: -120px 0;
}
.footer > .polls-selected > i {
    background-position: -90px 0;
}
</style>
