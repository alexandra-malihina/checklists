<template>
    <div class="bg-white mx-auto my-5 border p-5 col-12 col-md-6 rounded">
        <label>Имя</label>
        <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            class="form-control mb-3"
        />
        <label>Email</label>
        <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="form-control mb-3"
        />
        <label>Пароль</label>
        <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="form-control mb-3"
        />
        <label>Повторите пароль</label>
        <input
            v-model="password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            class="form-control mb-3"
        />
        <input
            @click.prevent="register"
            type="submit"
            value="Зарегистрироваться"
            class="btn btn-primary mb-3"
        />
        <p>
            Есть учетная запись?
            <router-link :to="{ name: 'user.login' }">Войти</router-link>
        </p>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            name: "",
            password_confirmation: "",
            email: "",
            password: "",
        };
    },
    methods: {
        register() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                // Login...
                axios
                    .post("/register", {
                        email: this.email,
                        name: this.name,
                        password_confirmation: this.password_confirmation,
                        password: this.password,
                    })
                    .then((r) => {
                        localStorage.setItem(
                            "x_xsrf_token",
                            r.config.headers["X-XSRF-TOKEN"]
                        );
                        this.$router.push({
                            name: "checklists",
                        });
                    });
            });
        },
    },
};
</script>
