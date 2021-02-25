<template>
    <div>
        <MainHeader />
        <MainBody />
    </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"
import MainBody from "@/components/MainBody.vue"
export default {
    setup() {
        return {
            MainHeader,
            MainBody,
        }
    },
}
</script>
