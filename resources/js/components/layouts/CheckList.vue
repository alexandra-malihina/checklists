<template>
<div class="accordion-item " >
    <h2 class="accordion-header" :id="check_block_id" @click="getItems">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse_' + check_block_id" aria-expanded="false" :aria-controls="'collapse_' + check_block_id">
		{{ check_list_info.name }} 
		<span class="ms-3 badge bg-success" v-if="check_list_info.is_done"> Выполнен</span>
		<span class="ms-3 badge bg-secondary" v-else> Не выполнен</span>
      </button>
    </h2>
    <div :id="'collapse_' + check_block_id" class="accordion-collapse collapse" aria-labelledby="headingOne" :data-bs-parent="'#' + check_block_id">
      <div class="accordion-body">
		<div >
			<div class=" mb-3">
				<label>Новый пункт</label>
				<div class=" form-group input-group">
					<input
						v-model="new_item"
						type="text"
						name="name"
						id="name"
						class="form-control"
					/>
					<div class=" btn btn-outline-success input-group-append " :class="{disabled:!new_item}" @click="addNewCheckListItem">
						Добавить
					</div>
				</div>

			</div>
			<CheckListItem 
			v-for="(item, index) in items" 
			v-bind:key="item.id" 
			v-bind:item="item" 
			v-bind:index="index" 
			@set-done="setDone"
			@remove="removeItem"
			@set-loading="setLoading"
            @set-message="setMessage"
			></CheckListItem>
			<div class="btn btn-outline-danger" @click="deleteCheckList">
				Удалить список
			</div>

		</div>
	  </div>
    </div>
  </div>
</template>
<script>
import CheckListItem from './CheckListItem.vue'
export default  {
	components: {CheckListItem},
	props: ['check_list_info', 'index'],
	name: 'check-list',
	data() {
		return {
			new_item: null,
			check_block_id: null,
			items: [],
			is_load_items: false,
		
		}
	},
	mounted() {
		this.check_block_id = 'check_' + this.check_list_info.id
	},
	methods: {
		setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
		removeItem(index) {
			this.$delete(this.items, index)
		},
		deleteCheckList() {
			let is_delete = confirm('Вы точно хотите удалить чек-лист "' + this.check_list_info.name + '"?')
			if ( ! is_delete) {
				return false
			}
			this.$emit('set-loading', true)
			axios.delete('/api/check-lists/' + this.check_list_info.id)
			.then( (r) => {
				this.$emit('set-loading', false)
				let data = r.data
				this.$emit('set-message', data.message, data.error)
				if (!data.error) {
      				// this.$destroy();
      				// this.$el.parentNode.removeChild(this.$el);
					this.$emit('remove', this.index)
				}
			});
			
		},
		setDone(is_done) {
			this.check_list_info.is_done = is_done
		},
		getItems() {
			if (this.is_load_items) {
				return false
			}
			this.$emit('set-loading', true)
			axios.get("/api/check-lists/" + this.check_list_info.id + '/items')
				.then( r => {
					console.log(r);
					this.$emit('set-loading', false)
					this.items = r.data
					this.is_load_items = true
					console.log(this.items)
				});

		},
		addNewCheckListItem() {
			this.$emit('set-loading', true)
			axios.post("/api/check-lists/" + this.check_list_info.id + '/items', {
                    name: this.new_item
                })
				.then( r => {
					console.log(r);
					this.$emit('set-loading', false)
					let data = r.data
					this.$emit('set-message', data.message, data.error)
					if (!data.error) {
						this.new_item = null
						this.items.push(data.data)
						this.setDone(0)
					}

				});
		}
	}
}

</script>