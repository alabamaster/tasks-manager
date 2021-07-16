<template>
	<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
		<div class="container">
			<button class="navbar-toggler order-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<router-link to="/" class="navbar-brand">Менеджер задач</router-link>
			<div class="collapse navbar-collapse" id="navbarToggler">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<router-link to="/" class="nav-link">Все задачи</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/add" class="nav-link">Добавить задачу</router-link>
					</li>
				</ul>
				<span class="navbar-text">Менеджер задач на vue js 3</span>
			</div>
		</div>
	</nav>
</template>
