<template>
    <div>
        enter your details
    </div>
</template>

<script>
import { onMounted } from "vue"
export default {
    setup() {
        onMounted(() => {
            document.title = "Enter Your Details"
        })
    },
}
</script>
