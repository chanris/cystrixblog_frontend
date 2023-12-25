<script setup>
import { useStore } from 'vuex'
const store = useStore()
const user = window.sessionStorage.getItem('user')
user && store.dispatch('setLoginInfo', JSON.parse(user))
</script>

<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<style scoped>
</style>
