<template>
    <div class="details-wrap">
        <!-- set profile photo  -->
        <div class="profile">
            <input type="file" />
        </div>
        <!-- details  -->
        <div class="input">
            <span>Your Name</span>
            <input type="text" v-model="name" />
        </div>
        <div class="input">
            Roll Number
            <input type="text" v-model="roll_number" />
        </div>
        <div class="input">
            School
            <select
                id="school"
                name="school"
                v-model="school"
                @change="logSchool()"
            >
                <option value="null" selected hidden>Select School</option>
                <option
                    v-for="school in schools"
                    :value="school._id"
                    :key="school._id"
                >
                    {{ school.name }}
                </option>
            </select>
        </div>
        <div class="input">
            Branch
            <select id="branch" name="branch" v-model="branch">
                <option value="null" selected hidden>Select Branch</option>
                <option
                    v-for="branch in branches"
                    :value="branch._id"
                    :key="branch._id"
                >
                    {{ branch.name }}
                </option>
            </select>
        </div>
        <!-- <div class="input">
            Group
            <select id="branch" name="branch" v-model="branch">
                <option value="null" selected hidden>Select Branch</option>
                <option
                    v-for="branch in branches"
                    :value="branch._id"
                    :key="branch._id"
                >
                    {{ branch.name }}
                </option>
            </select>
        </div> -->
        <button
            @click="submitDetails()"
            class="animate__animated animate__rubberBand"
        >
            Submit
        </button>
    </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { useCookie } from "@/js/store"
import { api_url } from "@/js/configs/config"
import { useRouter } from "vue-router"

const [uid] = useCookie("uid")
const [token] = useCookie("token")

const loading = ref(false)
const name = ref("")
const roll_number = ref("")
const school = ref("")
const branch = ref("")

const schools = ref()

const branches = ref()

async function logSchool() {
    console.log(school.value)
    try {
        loading.value = true
        let branches_res = await fetch(
            `${api_url}/getBranches?school_id=${school.value}`
        )
        if (branches_res.status != 200) throw new Error("Something Went wrong")
        let branches_data = await branches_res.json()
        branches.value = branches_data
        loading.value = false
    } catch (err) {
        loading.value = false
        alert(err.message)
        console.log(err)
    }
}

async function getInfo() {
    try {
        loading.value = true
        let res = await fetch(`${api_url}/getinfo?id=${uid()}&token=${token()}`)
        if (res.status == 200) {
            let data = await res.json()
            name.value = data.name || ""
            roll_number.value = data.roll_number || ""
            school.value = data.school_id || ""
            branch.value = data.branch_id || ""
            loading.value = false
        }
        //school data
        let resSchools = await fetch(`${api_url}/allSchools`)
        if (resSchools.status != 200) throw new Error("Something went wrong")
        let schools_data = await resSchools.json()
        schools.value = schools_data

        let branches_res = await fetch(
            `${api_url}/getBranches?school_id=${school.value}`
        )
        if (branches_res.status != 200) throw new Error("Something Went wrong")
        let branches_data = await branches_res.json()
        branches.value = branches_data

        loading.value = false
    } catch (err) {
        alert(err.message)
        loading.value = false
        console.log(err)
    }
}

export default {
    setup() {
        const router = useRouter()

        async function submitDetails() {
            try {
                if (name.value.length == 0) throw new Error("Enter your name")
                if (roll_number.value.length == 0)
                    throw new Error("Enter your roll number")
                if (school.value == "") throw new Error("Select your School")
                if (branch.value == "") throw new Error("Select your Branch")
                let data = {
                    name: name.value,
                    school_id: school.value,
                    branch_id: branch.value,
                    roll_number: roll_number.value,
                }
                let req = await fetch(`${api_url}/updateDetails`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        data,
                        token: token(),
                        uid: uid(),
                        photo_url: "",
                    }),
                })
                let res_data = await req.json()
                if (!res_data.updated) throw new Error(data.message)
                console.log(res_data)
                router.push({ name: "Home" })
            } catch (err) {
                alert(err.message)
            }
        }

        onMounted(() => {
            document.title = "Enter Your Details"
            getInfo()
        })
        return {
            loading,
            schools,
            branches,
            name,
            roll_number,
            school,
            branch,
            logSchool,
            getInfo,
            submitDetails,
            router,
        }
    },
}
</script>
