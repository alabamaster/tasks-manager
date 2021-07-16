<template>
   <div class="box">
      <div v-if="!tasks.length" class="alert alert-primary m-0">
         Задач пока нет. <router-link to="/add">Добавь</router-link> первую!
      </div>
      <div v-else>
         <div class="row align-items-center">
            <div class="col-md-4">
               <h1>Список задач</h1>
            </div>
            <div class="col-md-4">
               <select class="form-select w-100" v-model="taskFilter">
                  <option selected disabled value="0">Фильтр по задачам</option>
                  <option value="active">Активные</option>
                  <option value="completed">Завершенные</option>
                  <option value="outdate">Устаревшие</option>
               </select>
            </div>
            <div class="col-md-4 mt-2 mt-md-0" v-if="taskFilter">
               <button class="btn btn-primary w-100" @click="taskFilter = 0">
                  Сбросить фильтр
               </button>
            </div>
         </div>
         <hr />
         <div v-if="tasksFiltered.length" class="table-responsive">
            <table class="table table-hover">
               <thead>
                  <tr>
                     <th>Название</th>
                     <th>Описание</th>
                     <th>Дата</th>
                     <th class="text-center">Статус</th>
                     <th>Опции</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="task in tasksFiltered" :key="task.id">
                     <td>{{ task.title }}</td>
                     <td class="desc">{{ task.desc }}</td>
                     <td>
                        {{ new Date(task.endpoint).toLocaleString("ru",dateOptions) }}
                     </td>
                     <td class="text-center">
                        <span
                           class="status badge"
                           :class="statusClasses(task.status)"
                           >{{ task.status }}</span
                        >
                     </td>
                     <td>
                        <router-link :to="'/update/' + task.id">
                           <button class="btn btn-secondary btn-sm">
                              Открыть
                           </button>
                        </router-link>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div v-else class="alert alert-danger fw-bold mb-0">
            По этому фильтру задач нет
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         taskFilter: 0,
         dateOptions: {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timezone: "UTC",
         },
      };
   },
   methods: {
      statusClasses(status) {
         return {
            "bg-primary": status === "active",
            "bg-success": status === "completed",
            "bg-danger": status === "outdate",
         };
      },
   },
   computed: {
      tasks() {
         return this.$store.getters.tasks;
      },
      tasksFiltered() {
         return !this.taskFilter
            ? this.tasks
            : this.tasks.filter((item) => item.status === this.taskFilter);
      },
   },
};
</script>

<style lang="scss" scoped>
table {
   width: 100%;
}
.id {
   width: 50px;
}
.desc {
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   max-width: calc(15rem + 5vw); // 400px
}
.status {
   text-align: center;
   padding-top: 4px;
   text-transform: uppercase;
   font-weight: 600;
   letter-spacing: 0.8px;
}
tr td {
   vertical-align: middle;
}
</style>
