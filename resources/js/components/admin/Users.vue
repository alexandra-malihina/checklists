<template>
    <div class="d-flex flex-column">
        <div
            class="d-flex border rounded-3 p-2 justify-content-between align-items-baseline"
			style="gap:25px"
            v-for="(user, index) in users"
            :key="user.id"
			:index="index"
        >
            <span>{{ user.name }}</span>
            <span class="text-secondary">{{ user.email }}</span>
            <div class="input-group mb-3">
                <input
                    type="number"
                    class="form-control "
					style="width:30px"
                    readonly
                    v-model="user.current_check_lists_count"
                />
                <span class="input-group-text">/</span>
                <input
                    type="number"
                    class="form-control"
					style="width:30px"
					:max="max"
					@input="checkListMax(index)"
					:min="user.current_check_lists_count"
                    v-model="user.max_check_lists_count"
					@change="updateUser(index)"
                />
            </div>
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="user.active"
					@change="updateUser(index)"
                />
                <label class="form-check-label"> Активен </label>
            </div>
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="user.admin"
					@change="updateUser(index)"
                />
                <label class="form-check-label"> Администратор </label>
            </div>
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
export default {
    name: "users",
    components: { Pagination },
    data() {
        return {
            current_page: 1,
            last_page: 1,
            users: [],
			max: 1000
        };
    },
    methods: {
		updateUser(index) {
			let user = this.users[index]
			this.setLoading(true) 
			axios
                .put("/api/admin/users/" + user.id, {
					admin: user.admin,
					active: user.active,
					max_check_lists_count: user.max_check_lists_count
				})
                .then((res) => {
                    this.setLoading(false);
                    console.log(res.data);
					this.setMessage(res.data.message, res.data.error)
					// console.log(this.$ref)
                });
		},
		checkListMax(index) {
			if (this.users[index].max_check_lists_count > this.max) {
				this.users[index].max_check_lists_count = this.max
			}
			if (this.users[index].max_check_lists_count < this.users[index].current_check_lists_count) {
				this.users[index].max_check_lists_count = this.users[index].current_check_lists_count
			}
		},
        setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
        getUsers() {
            this.setLoading(true);
            axios
                .get("/api/admin/users?page=" + this.current_page)
                .then((res) => {
                    this.setLoading(false);
                    console.log(res.data);
                    this.users = res.data.data;
                    this.last_page = res.data.last_page;
                    this.current_page = res.data.current_page;
                    // console.log(this.$ref)
                    this.$refs.pagination_ref.setPagination(
                        this.current_page,
                        this.last_page
                    );
                    // this.actions = res.data
                    // this.setLoading(false)
                });
            //             axios.post("/admin").then((res) => {
            //     // console.log(res);
            //     // this.user = res.data
            // 	// this.setLoading(false)
            // });
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
    },
    mounted() {
        this.getUsers();
    },
};
</script>
