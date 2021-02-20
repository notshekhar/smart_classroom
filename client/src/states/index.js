import { reactive } from "vue"

import { useStore } from "../js/store"
let [first] = useStore("first_time")
console.log(first())

export const AppState = reactive({
    first_time: first() ? first() == "true" : true,
})
