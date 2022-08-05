<template>
	<div >
		Users
	</div>
</template>
<script>
export default {
	name: 'users',
	mounted () {
		
		axios.get("/api/admin/users/").then((res) => {
                console.log(res.data);
                // this.actions = res.data
				// this.setLoading(false)
            });
			//             axios.post("/admin").then((res) => {
            //     // console.log(res);
            //     // this.user = res.data
			// 	// this.setLoading(false)
            // });
	}
}
</script>