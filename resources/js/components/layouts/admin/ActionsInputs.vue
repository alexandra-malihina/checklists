<template>
    <div class="container">
        <div
            class="row mb-4"
            v-for="(entity, i) in entities"
            :key="entity.id"
            :index="i"
        >
            <h4>{{ entity.name }}</h4>
            <div class="row">
                <div
                    class="form-check form-switch col col-auto"
                    v-for="(action, index) in actions"
                    :key="action.id"
                    :index="index"
                >
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        v-model="user.actions[action.code][entity.code]"
                        :disabled="disabled"
                        @change="
                            updateUserAction(
                                user.id,
                                action.id,
                                entity.id,
                                user.actions[action.code][entity.code]
                            )
                        "
                    />
                    <label class="form-check-label me-3">
                        {{ action.name }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ActionsInputs",
    props: ["actions", "entities", "user", "disabled"],
    data() {
        return {};
    },
    methods: {
        setMessage(message, error) {
            this.$emit("set-message", message, error);
        },
        setLoading(is_loading) {
            this.$emit("set-loading", is_loading);
        },
        updateUserAction(user_id, action_id, entity_id, active) {
            this.setLoading(true);
            axios
                .put("/api/admin/roles/" + user_id, {
                    action: action_id,
                    entity: entity_id,
                    active: active,
                })
                .then((res) => {
                    this.setLoading(false);
                    this.setMessage(res.data.message, res.data.error);
                });
        },
    },
};
</script>
