<template>
	<div v-if="!task" class="alert alert-danger m-0">
		Такая задача не найдена! <router-link to="/">Список всех задач</router-link>
	</div>
	<div v-else>
		<h1>Задача <span class="text-warning">{{ title }}</span></h1>
		<div v-if="task.status === 'completed'" class="alert alert-success mb-0">Задача завершена!</div>
		<hr>
		<form @submit.prevent="updateHandler">
			<div class="mb-3">
				<label for="taskName" class="form-label">Название</label>
				<input 
					:disabled="task.status === 'completed'" 
					v-model="title" 
					type="text" class="form-control" id="taskName"
					maxlength="20" minlength="3"
				>
			</div>
			<div class="mb-3">
				<label for="taskDesc" class="form-label">Описание</label>
				<textarea 
					:disabled="task.status === 'completed'" 
					v-model="desc" 
					class="form-control" id="taskDesc" rows="3"
					maxlength="2000" minlength="5"
				></textarea>
				<small class="text-secondary text-small float-end" :class="{ 'text-danger': desc.length == 2000 }">{{ desc.length }} / 2000</small>
			</div>
			<div class="row g-md-3 g-0 mb-3 w-100">
				<div class="col-md-6">
					<label for="taskTags" class="form-label">Теги</label>
					<Multiselect
						v-model="tags"
						mode="tags"
						placeholder="Выбирите/введите тег"
						:options="$store.getters.allTags"
						:searchable="true"
						:createTag="true"
						:disabled="task.status === 'completed'"
					></Multiselect>
				</div>
				<div class="col-md-6">
					<label class="form-label">Дата</label>
					<DatePicker v-model="endpoint" mode="dateTime" is24hr>
						<template v-slot="{ inputValue, togglePopover, hidePopover }">
							<input
								class="form-control"
								:value="inputValue"
								@click="togglePopover"
								@blur="hidePopover"
								:disabled="task.status === 'completed'"
							/>
						</template>
					</DatePicker>
				</div>
			</div>


			<div class="d-flex flex-wrap justify-content-between">
				<div v-if="task.status !== 'completed'" class="m-smm-0 w-sm-100" style="margin-right: 10px;">
					<button class="btn btn-primary m-smm-0" style="margin-right: 10px;">Обновить задачу</button>
					<button class="btn btn-success" type="button" @click="$store.commit('completeTask', task.id)">Завершить задачу</button>
				</div>
				<button class="btn btn-danger" type="button" @click="removeTask">Удалить задачу</button>
			</div>
		</form>
	</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { DatePicker } from 'v-calendar'

export default {
	components: { Multiselect, DatePicker },
	data() {
		return {
			title: 'unknown',
			desc: 'unknown',
			tags: [],
			status: 'active',
			endpoint: new Date(),
		}
	},
	mounted() {
		this.title = this.task.title,
		this.desc = this.task.desc,
		this.tags = !this.task.tags ? [] : this.task.tags, // пофиксить теги
		this.endpoint = new Date(this.task.endpoint)
	},
	methods: {
		updateHandler() {
			const taskParams = {
				id: this.task.id,
				title: this.title,
				desc: this.desc,
				endpoint: Date.parse(this.endpoint),
				tags: this.tags,
				status: this.status
			}

			this.$store.commit('updateTask', taskParams)
			this.$router.push('/')
		},
		removeTask() {
			this.$router.push('/')
			this.$store.commit('removeTask', this.task.id)
		}
	},
	computed: {
		task() {
			const idx = this.$store.getters.tasks.findIndex(item => item.id === +this.$route.params.id)
			return idx === -1 ? false : this.$store.getters.tasks[idx]
		},
	}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@media screen and (max-width: 545px) {
	.btn {margin-top: 5px;}
}
@media screen and (max-width: 405px) {
	.btn {
		display: inline-block;
		width: 100%;
	}
	.m-smm-0 {margin: 0 !important;}
	.w-sm-100 {
		margin: 0;
		width: 100%;
	}
}
</style>
