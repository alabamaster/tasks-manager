<template>
	<h1>Добавтиь задачу</h1>
	<hr>
	<form @submit.prevent="submitHandler">
		<div class="mb-3">
			<label for="taskName" class="form-label">Название</label>
			<input v-model="taskName" type="text" class="form-control" id="taskName" maxlength="20" minlength="3">
		</div>
		<div class="mb-3">
			<label for="taskDesc" class="form-label">Описание</label>
			<textarea v-model="taskDesc" class="form-control" id="taskDesc" rows="3" maxlength="2000" minlength="5"></textarea>
			<small class="text-secondary text-small float-end" :class="{ 'text-danger': taskDesc.length == 2000 }">{{ taskDesc.length }} / 2000</small>
		</div>
		<div class="mb-3">
			<label for="taskTags" class="form-label">Теги</label>
			<Multiselect
				v-model="tags"
				mode="tags"
				placeholder="Выбирите/введите тег"
				:options="$store.getters.allTags"
				:searchable="true"
				:createTag="true"
			/>
		</div>
		<div class="mb-3">
			<label class="form-label">Дата</label>
			<DatePicker v-model="pickedDate" mode="dateTime" is24hr>
				<template v-slot="{ inputValue, togglePopover, hidePopover }">
					<input
						class="form-control"
						:value="inputValue"
						@click="togglePopover"
						@blur="hidePopover"
					/>
				</template>
			</DatePicker>
		</div>

		<button class="btn btn-primary">Добавить задачу</button>
	</form>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { DatePicker } from 'v-calendar'

export default {
	components: { Multiselect, DatePicker },
	data() {
		return {
			taskName: '',
			taskDesc: '',
			pickedDate: new Date(),
			tags: [],
		}
	},
	methods: {
		submitHandler() {
			if (this.taskName.length < 3 ||  this.taskDesc.length < 3) {
				return alert('Название и описание должны быть больше 3 символов')
			}
			const taskParams = {
				id: this.$store.getters.tasks.length,
				title: this.taskName,
				desc: this.taskDesc,
				tags: this.tags,
				status: 'active',
				endpoint: Date.parse(this.pickedDate)
			}
			
			this.$store.commit('addTask', taskParams)
			this.$router.push('/')
		}
	}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
