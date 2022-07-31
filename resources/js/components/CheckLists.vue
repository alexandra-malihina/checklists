<template>
    <div>
        <Menu :user="user"></Menu>

        <div class="container my-5 bg-white p-3">
            <div
                class="row col col-12 col-md-6 mb-3 mx-auto"
                v-if="
                    checklists.length < user.max_check_lists_count && user
                "
            >
                <label>Новый чек-лист</label>
                <div class="form-group input-group">
                    <input
                        v-model="new_checklist"
                        type="text"
                        name="name"
                        id="name"
                        class="form-control"
                    />
                    <div
                        class="btn btn-outline-success input-group-append"
                        :class="{ disabled: !new_checklist }"
                        @click="addNewCheckList"
                    >
                        Добавить
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <h2 class="h2 text-secondary col col-auto mx-auto">
                    {{ checklists.length }} / {{ user.max_check_lists_count }}
                </h2>
            </div>
            <div class="accordion col col-12 col-md-6 mx-auto">
                <check-list
                    v-for="(checklist, index) in checklists"
                    v-bind:key="checklist.id"
                    v-bind:check_list_info="checklist"
					v-bind:index="index"
                    @set-loading="setLoading"
                    @set-message="setMessage"
					@remove="removeChecList"
                >
                </check-list>
            </div>
        </div>
    </div>
</template>
<script>
import Menu from "./layouts/Menu.vue";
import CheckList from "./layouts/CheckList.vue";
export default {
    props: ["user"],
    name: "check-lists",
    components: { Menu, CheckList },

    methods: {
		removeChecList(index) {
			this.$delete(this.checklists, index)
		},
        setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
        addNewCheckList() {
            this.$emit("set-loading", true);
            axios
                .post("/api/check-lists", {
                    name: this.new_checklist,
                })
                .then((r) => {
                    console.log(r);
                    this.$emit("set-loading", false);
                    let data = r.data;
                    this.$emit("set-message", data.message, data.error);
                    if (!data.error) {
                        this.new_checklist = null;
                        this.checklists.push(data.data);
                        this.user.current_check_lists_count++;
                    }
                });
        },
    },
    mounted() {
        console.log(this.user);
        this.$emit("set-loading", true);
        axios.get("/api/check-lists").then((r) => {
            console.log(r);
            this.$emit("set-loading", false);
            this.checklists = r.data;
            // let data = r.data
            // this.$emit('set-message', data.message, data.error)
            // if (!data.error) {
            // 	this.new_checklist = null
            // 	this.checklists.push(data.data)
            // }
        });
    },
    data() {
        return {
            checklists: [],
            new_checklist: null,
        };
    },
};
</script>
