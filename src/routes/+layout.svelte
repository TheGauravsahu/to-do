<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { user, auth } from '$lib/firebase.js';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => {
			user.set(u);
		});
		return () => unsubscribe();
	});

</script>

<main class="p-8 bg-zinc-50 min-h-screen w-full">
	<slot />
</main>
