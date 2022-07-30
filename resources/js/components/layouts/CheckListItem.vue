<template>

<div class="input-group mb-3">
  <div class="input-group-text">
    <input class="form-check-input mt-0" type="checkbox" v-model="item.is_done" @change="changeItemDone" >
  </div>
  <input type="text" class="form-control" :value="item.name" readonly>
</div>
	
</template>
<script>
export default {
	name:'list-item',
	props: ['item'],
	methods: {
		changeItemDone() {
			this.$emit('set-loading', true)
			axios.put("/api/check-lists/" + this.item.check_list_id + '/items/' + this.item.id, {
				'is_done': this.item.is_done
			})
				.then( r => {
					// console.log(r);
					this.$emit('set-loading', false)
					// let data = r.data
					// this.$emit('set-message', data.message, data.error)
					this.items = r.data
					this.is_load_items = true
					// console.log(this.items)
				});
		}
	}

}
</script>