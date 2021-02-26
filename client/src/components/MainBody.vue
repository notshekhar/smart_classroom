<template>
    <div class="home_body">
        <div class="loading" v-if="{ loading }">
            <img src="@/assets/images/loading.svg" alt="" />
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue"
import { useCookie } from "@/js/store"
import { api_url } from "@/js/configs/config"

const loading = ref(true)
const [uid] = useCookie("uid")

async function getTimeTable() {
    try {
        let res = await fetch(`${api_url}/getTimetable?uid=${uid()}`)
        let data = await res.json()
        console.log(data)
    } catch (err) {
        alert(err)
        console.log(err)
    }
}
export default {
    setup() {
        onMounted(() => {
            getTimeTable()
        })
        return {
            loading,
        }
    },
}
</script>
<style>
.home_body {
    position: absolute;
    padding-top: 65px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* background: #f6f9ff; */
}
.loading {
    padding: 15px;
}
</style>
