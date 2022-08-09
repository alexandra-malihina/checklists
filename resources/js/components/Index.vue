<template>
    <div>
        <div
            class="vw-100 vh-100 fixed-top d-flex justify-content-around"
            v-if="is_loading"
        >
            <div class="spinner-border mx-auto my-auto"></div>
        </div>
        <router-view
            :user="user"
            @set-user="onSetUser"
            @set-loading="setLoading"
            @set-message="setMessage"
        ></router-view>
        <div
            class="fixed-bottom alert"
            :class="{ 'alert-danger': error, 'alert-success': !error }"
            v-if="message"
        >
            {{ message }}
        </div>
    </div>
</template>
<script>
export default {
    name: "Index",
    data() {
        return {
            user: null,
            is_loading: false,
            is_error: false,
            message: null,
            set_new_message: false,
            message_count: 0,
        };
    },
    methods: {
        onSetUser() {
            axios.get("/api/user").then((res) => {
                this.user = res.data.data;
            });
        },
        setLoading(is_loading) {
            this.is_loading = is_loading;
        },
        removeUser() {
            this.user = null;
        },
        setMessage(message, error) {
            this.error = error;
            this.message = message;
            this.message_count++;

            setTimeout(() => {
                this.message_count--;
                if (!this.message_count) {
                    this.setMessage(null, false);
                }
            }, 3000);
        },
    },
    mounted() {
        if (
            this.$route.name !== "user.login" &&
            this.$route.name !== "user.register"
        ) {
            this.onSetUser();
        }
    },
};
</script>
