<template>
    <div
        class="bg-white border p-5 mx-auto my-5 col-12 col-md-6 col-lg-4 rounded"
    >
        <label>Email</label>
        <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="form-control mb-3"
            :class="{ 'is-invalid': errors.email }"
            @input="checkEmailInput"
        />
        <label>Пароль</label>
        <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="form-control mb-3"
            :class="{ 'is-invalid': errors.password }"
            @input="checkPasswordInput"
        />
        <input
            @click.prevent="login"
            type="submit"
            value="Войти"
            class="btn btn-primary mb-3"
            :class="{ disabled: password.length === 0 || email.length === 0 }"
        />
        <p>
            Нет учетной записи?
            <router-link :to="{ name: 'user.register' }"
                >Зарегистрироваться</router-link
            >
        </p>
    </div>
</template>
<script>
export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            errors: {
                email: 1,
                password: 1,
            },
        };
    },
    methods: {
        checkPasswordInput() {
            this.password = this.password.trimLeft();
            if (this.password.length === 0) {
                this.errors.password = 1;
            } else {
                this.errors.password = 0;
            }
        },
        checkEmailInput() {
            this.email = this.email.trimLeft();
            if (this.email.length === 0) {
                this.errors.email = 1;
            } else {
                this.errors.email = 0;
            }
        },
        login() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/login", {
                        email: this.email,
                        password: this.password,
                    })
                    .then((r) => {
                        localStorage.setItem(
                            "x_xsrf_token",
                            r.config.headers["X-XSRF-TOKEN"]
                        );
                        this.$emit("set-user");
                        this.$router.push({
                            name: "checklists",
                        });
                    })
                    .catch((e) => {
                        let data = e.response.data;
                        let message = "";
                        if (data.errors.email) {
                            this.errors.email = 1;
                            message += data.errors.email;
                        }
                        if (data.errors.password) {
                            this.errors.password = 1;
                            message += data.errors.password;
                        }
                        this.$emit("set-message", message, true);
                    });
            });
        },
    },
    mounted() {
        this.$emit("set-loading", false);
    },
};
</script>
