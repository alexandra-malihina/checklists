<template>
    <nav class="navbar bg-white">
        <div class="container-fluid me-auto">
            <a class="navbar-brand" href="/">CheckLists</a>
            <div class="d-flex my-auto align-items-baseline" v-if="user">
                <router-link
                    class="btn btn-primary mx-2"
                    v-if="user.admin && user"
                    :to="{ name: 'admin' }"
                >
                    Админка
                </router-link>
                {{ user.name }}
                <a href="#" @click.prevent="logout" class="small mx-2">Выйти</a>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "Menu",
    props: ["user"],
    methods: {
        logout() {
            axios.post("/logout").then((res) => {
                localStorage.removeItem("x_xsrf_token");
                this.$router.push({ name: "user.login" });
            });
        },
    },
};
</script>
