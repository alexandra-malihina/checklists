<template>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input
                class="form-check-input mt-0"
                type="checkbox"
                v-model="item.is_done"
                @change="changeItemDone"
            />
        </div>
        <input type="text" class="form-control" :value="item.name" readonly />
        <div class="btn btn-outline-danger col col-auto" @click="deleteItem">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
            </svg>
            <!-- Удалить -->
        </div>
    </div>
</template>
<script>
export default {
    name: "list-item",
    props: ["item", "index"],
    methods: {
		deleteItem() {
			let is_delete = confirm('Вы точно хотите удалить пункт "' + this.item.name + '"?')
			if ( ! is_delete) {
				return false
			}
			this.$emit('set-loading', true)
			axios.delete('/api/check-lists/' + this.item.check_list_id + '/items/' + this.item.id)
			.then( (r) => {
				this.$emit('set-loading', false)
				let data = r.data
				this.$emit('set-message', data.message, data.error)
				if (!data.error) {
      				// this.$destroy();
      				// this.$el.parentNode.removeChild(this.$el);
					this.$emit('remove', this.index)
					this.$emit("set-done", data.data.check_list.is_done);
				}
			});
		},
        changeItemDone() {
            this.$emit("set-loading", true);
            axios
                .put(
                    "/api/check-lists/" +
                        this.item.check_list_id +
                        "/items/" +
                        this.item.id,
                    {
                        is_done: this.item.is_done,
                    }
                )
                .then((r) => {
                    // console.log(r);
                    this.$emit("set-loading", false);
                    let data = r.data
                    this.$emit('set-message', data.message, data.error)
                    this.items = data;
                    this.is_load_items = true;
                    this.$emit("set-done", data.data.check_list.is_done);
                    // console.log(this.items)
                });
        },
    },
};
</script>
