<template>
	<TheNavbar></TheNavbar>
   <div class="container mb-3" style="margin-top: 80px;">
		<div class="card">
			<div class="card-body">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
	components: {TheNavbar},
	mounted() {
		this.$store.getters.tasks.forEach(task => {
			if (task.endpoint < Date.now() && task.status !== 'completed') {
				task.status = 'outdate'
			}
		});
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	background-color: rgb(243, 243, 243);
}
// :before, :after {box-sizing: border-box;}
.container {
	max-width: 1160px;
	padding: 0 20px;
	margin: 0 auto;
}

// bootstrap reload
.btn-secondary {
	color: #fff;
	background-color: #7b7b7b;
	border-color: transparent;
}
.bg-success {background-color: #32a570!important;}
.bg-primary {background-color: #4088f3!important;}
.bg-danger {background-color: #e66c78!important;}

// vcalendar
.vc-popover-content-wrapper {z-index: 999 !important;}
</style>
