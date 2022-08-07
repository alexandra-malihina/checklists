<template>
<div class="container">
	<div class="row mb-4"   v-for="(entity, i) in entities" :key="entity.id" :index="i">
		<h4> {{ entity.name }}</h4>
		<div class="row">
            <div class="form-check form-switch col col-auto" v-for="(action, index) in actions" :key="action.id" :index="index">
                <input
                    class="form-check-input "
                    type="checkbox"
                    role="switch"
                />
                <label class="form-check-label me-3"> {{ action.name }} </label>
            </div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'ActionsInputs',
	props: ['actions', 'entities', 'user'],
	data() {
		return {

		}
	}
}
</script>