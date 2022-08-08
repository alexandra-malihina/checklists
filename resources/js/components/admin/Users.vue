<template>
    <div class="d-flex flex-column">
        <div
            class="d-flex flex-column border rounded-3 flex-column p-3 "
			style="gap:25px"
            v-for="(user, index) in users"
            :key="user.id"
			:index="index"
        >
		<div class="d-flex p-2 justify-content-between align-items-baseline" >
			<span class=" text-nowrap">#{{ user.id }} {{ user.name }}</span>
            <span class="text-secondary">{{ user.email }}</span>
            <div class="input-group mb-3 w-auto">

                <span class="input-group-text">{{user.current_check_lists_count}}</span>
                <span class="input-group-text">/</span>
                <input
                    type="number"
                    class="form-control"
					style="width:100px; flex:none!important;"
					:max="max"
					@input="checkListMax(index)"
					:min="user.current_check_lists_count"
                    v-model="user.max_check_lists_count"
					@change="updateUser(index)"
					
					:disabled="! can_edit_users"
                />
            </div>
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="user.active"
					:disabled="! can_edit_users"
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
					:disabled="(! can_edit_users && ! can_edit_roles)"
					@change="updateUser(index)"
                />
                <label class="form-check-label"> Администратор </label>
            </div>
			<button type="button" data-bs-toggle="collapse" class="btn btn-outline-info text-nowrap" :data-bs-target="'#check_' + user.id" aria-expanded="false" :aria-controls="'check_' + user.id" v-if="can_view_checklists">
				Чек-листы
			</button>
		</div>
 
			<div class="p-3 accordion w-100 collapse" :id="'check_' + user.id" v-if="can_view_checklists">
				<check-list
                    v-for="(checklist, index) in user.checklists"
                    v-bind:key="checklist.id"
                    v-bind:check_list_info="checklist"
					v-bind:index="index"
					:can_edit="false"
                    @set-loading="setLoading"
                    @set-message="setMessage"
                >
                </check-list>
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
import CheckList from '../layouts/CheckList.vue';
import Pagination from "../layouts/Pagination.vue";
export default {
    name: "users",
    components: { Pagination, CheckList, CheckList },
    data() {
        return {
            current_page: 1,
            last_page: 1,
            users: [],
			max: 1000,
			can_edit_users: false,
			can_edit_roles: false,
			can_view_checklists: false
        };
    },
    methods: {
		updateUser(index) {
			console.log(this.user_actions)
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

					this.can_edit_users = res.data.can_edit_users
					this.can_edit_roles = res.data.can_edit_roles
					this.can_view_checklists = res.data.can_view_checklists
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

		console.log(this,this.user_actions, 'user_actions')
    },
};
</script>
