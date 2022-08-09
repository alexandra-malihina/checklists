<template>
    <div class="d-flex flex-column">
        <div
            class="d-flex flex-column border rounded-3 p-2 align-items-baseline"
            style="gap: 25px"
            v-for="(user, index) in users"
            :key="user.id"
            :index="index"
        >
            <div
                class="d-flex p-2 justify-content-between w-100 align-items-baseline"
            >
                <span>#{{ user.id }} {{ user.name }}</span>
                <div
                    class="btn btn-outline-info"
                    @click="setShowUserActions(index, true)"
                    v-if="!user.show_actions"
                >
                    Просмотреть права
                </div>
                <div
                    class="btn btn-outline-info active"
                    @click="setShowUserActions(index, false)"
                    v-else
                >
                    Скрыть права
                </div>
            </div>

            <actions-inputs
                :actions="actions"
                :entities="entities"
                :user="user"
                v-show="user.show_actions"
                @set-loading="setLoading"
                @set-message="setMessage"
                :disabled="!can_edit_roles"
            ></actions-inputs>
        </div>
        <pagination
            class="mt-3"
            ref="pagination_ref"
            :current_page="current_page"
            :last_page="last_page"
            @set-page="setCurrentPage"
        >
        </pagination>
    </div>
</template>
<script>
import Pagination from "../layouts/Pagination.vue";
import ActionsInputs from "../layouts/admin/ActionsInputs.vue";
export default {
    name: "roles",
    components: { Pagination, ActionsInputs },
    props: ["user_actions"],
    data() {
        return {
            users: [],
            actions: [],
            entities: [],
            last_page: 1,
            current_page: 1,
            action_inputs_struct: [],
            can_edit_roles: false,
        };
    },
    methods: {
        setShowUserActions(index, value) {
            this.$set(this.users[index], "show_actions", value);
        },
        setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
        setCurrentPage(current_page) {
            if (current_page === this.current_page) {
                return false;
            }
            if (current_page < 1) {
                this.current_page = 1;
            }
            if (current_page > this.last_page) {
                this.current_page = this.page_count;
            }
            this.current_page = current_page;
            this.getUsers();
        },
        getUsers() {
            this.setLoading(true);
            axios
                .get("/api/admin/roles?page=" + this.current_page)
                .then((res) => {
                    this.setLoading(false);
                    this.users = res.data.data;
                    this.last_page = res.data.last_page;
                    this.current_page = res.data.current_page;
                    this.can_edit_roles = res.data.can_edit_roles;
                    this.$refs.pagination_ref.setPagination(
                        this.current_page,
                        this.last_page
                    );
                });
        },
    },
    mounted() {
        this.setLoading(true);
        axios.get("/api/admin/roles/actions").then((res) => {
            this.setLoading(false);
            this.actions = res.data.actions;
            this.entities = res.data.entities;

            this.getUsers();
        });
    },
};
</script>
