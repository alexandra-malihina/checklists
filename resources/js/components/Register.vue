<template>
    <div
        class="bg-white mx-auto my-5 border p-5 col-12 col-md-6 col-lg-4 rounded"
    >
        <label>Имя</label>
        <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            class="form-control mb-3"
            @input="checkNameInput"
            :class="{ 'is-invalid': errors.name }"
        />
        <label>Email</label>
        <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            :class="{ 'is-invalid': errors.email }"
            class="form-control mb-3"
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
        <label>Повторите пароль</label>
        <input
            v-model="password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            class="form-control mb-3"
            :class="{ 'is-invalid': errors.password_confirmation }"
            @input="checkPasswordInput"
        />
        <input
            @click.prevent="register"
            type="submit"
            value="Зарегистрироваться"
            class="btn btn-primary mb-3"
            :class="{
                disabled:
                    errors.name ||
                    errors.email ||
                    errors.password ||
                    errors.password_confirmation,
            }"
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
            errors: {
                email: 1,
                name: 1,
                password: 1,
                password_confirmation: 1,
            },
        };
    },
    methods: {
        checkEmailInput() {
            this.email = this.email.trimLeft();
            this.errors.email = 0;
            if (this.email.length === 0) {
                this.errors.email = 1;
            }
        },
        checkNameInput() {
            this.name = this.name.trimLeft();
            this.errors.name = 0;
            if (this.name.length === 0) {
                this.errors.name = 1;
            }
        },
        checkPasswordInput() {
            this.password = this.password.trimLeft();
            this.password_confirmation = this.password_confirmation.trimLeft();
            this.errors.password = 0;
            this.errors.password_confirmation = 0;
            if (this.password.length === 0) {
                this.errors.password = 1;
            }
            if (this.password_confirmation.length === 0) {
                this.errors.password_confirmation = 1;
            }

            if (this.password_confirmation !== this.password) {
                this.errors.password_confirmation = 1;
            }
        },
        register() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
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
                    })
                    .catch((e) => {
                        let data = e.response.data;
                        console.log(data);
                        let message = "";
                        if (data.errors.email) {
                            this.errors.email = 1;
                            message += data.errors.email + " ";
                        }
                        if (data.errors.password) {
                            this.errors.password = 1;
                            this.errors.password_confirmation = 1;
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
