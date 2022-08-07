<template>
    <div class="d-flex flex-column">
        <div
            class="d-flex  flex-column border rounded-3 p-2 justify-content-between align-items-baseline"
            style="gap: 25px"
            v-for="(user, index) in users"
            :key="user.id"
            :index="index"
        >
			<div class="d-flex p-2 justify-content-between align-items-baseline" style="gap: 25px">
            <span>{{ user.name }}</span>
            <span class="text-secondary">{{ user.email }}</span>
            <div class="btn btn-outline-info" @click="setShowUserActions(index, true)" v-if="!user.show_actions">
				Просмотреть права
			</div>
            <div class="btn btn-outline-info active" @click="setShowUserActions(index, false)" v-else>
				Скрыть права
			</div>

			</div>

			 <actions-inputs :actions="actions" :entities="entities" :user="user" v-if="user.show_actions"></actions-inputs>
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
    data() {
        return {
            users: [],
            actions: [],
            entities: [],
            last_page: 1,
            current_page: 1,
        };
    },
    methods: {
		setShowUserActions(index, value) {

			this.$set(this.users[index], 'show_actions',  value)
			
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
    },
	mounted() {
		this.setLoading(true);
		 axios
                .get("/api/admin/roles/actions")
                .then((res) => {
                    this.setLoading(false);
                    console.log(res.data);
                    this.actions = res.data.actions;
                    this.entities = res.data.entities;

					this.getUsers()
                    // this.actions = res.data
                    // this.setLoading(false)
                });
	}
};
</script>
