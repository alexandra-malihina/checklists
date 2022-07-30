<template>
<div class="accordion-item " >
    <h2 class="accordion-header" :id="check_block_id" @click="getItems">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse_' + check_block_id" aria-expanded="true" aria-controls="collapseOne">
		{{ check_list_info.name }}
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
			<CheckListItem v-for="item in items" v-bind:key="item.id" v-bind:item="item"></CheckListItem>


		</div>
	  </div>
    </div>
  </div>
</template>
<script>
import CheckListItem from './CheckListItem.vue'
export default  {
	components: {CheckListItem},
	props: ['check_list_info'],
	name: 'check-list',
	data() {
		return {
			new_item: null,
			check_block_id: null,
			items: [],
			is_load_items: false
		}
	},
	mounted() {
		this.check_block_id = 'check_' + this.check_list_info.id
	},
	methods: {
		getItems() {
			if (this.is_load_items) {
				return false
			}
			this.$emit('set-loading', true)
			axios.get("/api/check-lists/" + this.check_list_info.id + '/items')
				.then( r => {
					console.log(r);
					this.$emit('set-loading', false)
					// let data = r.data
					// this.$emit('set-message', data.message, data.error)
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
					}

				});
		}
	}
}

</script>