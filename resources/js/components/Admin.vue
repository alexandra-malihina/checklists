<template>
    <div>
        <Menu :user="user"></Menu>

        <div class="my-3 bg-white d-flex p-3 nav-pills">
            <ul
                class="col col-2 d-flex flex-column my-3 nav nav-pills"
                v-if="actions"
            >
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'users' }"
                        class="mb-3 nav-link"
                        v-if="actions.view && actions.view.users"
                    >
                        Пользователи
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'roles' }"
                        class="nav-link"
                        v-if="actions.view && actions.view.roles"
                    >
                        Управление правами
                    </router-link>
                </li>
            </ul>
            <div class="col col-9 p-3 ms-2">
                <router-view
                    :user_actions="actions"
                    :a="1"
                    @set-loading="setLoading"
                    @set-message="setMessage"
                ></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Menu from "./layouts/Menu.vue";
export default {
    props: ["user"],
    name: "dashboard",
    components: { Menu },
    methods: {
        setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
    },
    data() {
        return {
            actions: {},
        };
    },
    mounted() {
        this.setLoading(true);
        axios.get("/api/admin/user/actions").then((res) => {
            this.actions = res.data;
            this.setLoading(false);
        });
    },
};
</script>
