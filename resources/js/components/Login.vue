<template>
    <div class="bg-white border p-5 mx-auto my-5 col-12 col-md-6 rounded">
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
        <input @click.prevent="login" type="submit" value="Войти" class="btn btn-primary mb-3" />
		<p>Нет учетной записи? <router-link :to="{name: 'user.register'}">Зарегистрироваться</router-link></p>
    </div>
</template>
<script>
export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.post("/login", {
                    email: this.email,
                    password: this.password,
                })
				.then( r => {
					localStorage.setItem('x_xsrf_token', r.config.headers['X-XSRF-TOKEN']);
					this.$emit('set-user')
					this.$router.push({
						name: 'checklists'
					})
				});
            });
        },
    },
};
</script>
