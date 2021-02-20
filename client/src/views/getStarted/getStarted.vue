<template>
    <div class="wrap">
        <div class="get-top">
            <div class="skip ">hello</div>
        </div>
        <div class="get-bottom">
            <div class="title">
                Easy of track of class timings
            </div>
            <div class="desc">
                Check the timetable daily and customise your class, track your
                class timing easily.
            </div>
            <div class="next ">
                <button @click="goNext()">Next</button>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "../../js/store"

const [first, setFirst] = useStore("first-time")

export default {
    setup() {
        const router = useRouter()
        function goNext() {
            router.push({ name: "getStarted2" })
        }
        onMounted(() => {
            document.title = "Get Started"
            console.log(first())
            setFirst(false)
        })
        return {
            goNext,
        }
    },
}
</script>

<style>
.wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #2488f6;
    display: flex;
    flex-direction: column;
    /* animation: show-get 1000ms forwards; */
}
@keyframes show-get {
    from {
        opacity: 0;
        /* top: 100%; */
    }
    to {
        opacity: 1;
        /* top: 0px; */
    }
}
.get-top {
    position: relative;
    height: calc(100% - 230px);
}
.get-bottom {
    position: relative;
    height: 230px;
    background-color: white;
    border-radius: 40px 40px 0 0;
    padding: 20px 40px 0 40px;
}
.get-bottom > .title {
    font-size: 22px;
    font-weight: 800;
}
.get-bottom > .desc {
    margin-top: 10px;
    color: grey;
    font-size: 14px;
}
.get-bottom > .next {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.get-bottom > .next > button {
    position: relative;
    height: 50px;
    width: 50px;
    border: none;
    border-radius: 21px;
    background: #2488f6;
    color: white;
    font-weight: 700;
    box-shadow: 0 0px 11px 2px rgb(36 136 246 / 50%);
}
</style>
