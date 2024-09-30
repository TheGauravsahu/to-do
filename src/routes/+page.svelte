<script>
	import Login from '../lib/components/Login.svelte';
	import Todo from '../lib/components/Todo.svelte';
	import { user } from '$lib/firebase.js';
</script>

{#if $user}
	<Todo />
{:else}
	<Login />
{/if}
