<script>
	import { db,logout } from '$lib/firebase.js';
	import {
		addDoc,
		collection,
		onSnapshot,
		updateDoc,
		doc,
		deleteDoc,
		query,
		where
	} from 'firebase/firestore';
	import { user } from '$lib/firebase.js';

	let todos = [];
	let todo;

	const getToDO = async () => {
		const todosRef = collection(db, 'todos');
		const q = query(todosRef, where('userId', '==', $user.uid));

		onSnapshot(q, (snapshot) => {
			todos = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		});
	};

	getToDO();

	async function createToDo() {
		if (todo.trim()) {
			await addDoc(collection(db, 'todos'), {
				userId: $user.uid,
				title: todo,
				isCompleted: false,
				createdAt: +new Date()
			});
			todo = '';
		}
	}

	async function markComplete(todoItem) {
		const todoRef = doc(db, 'todos', todoItem.id);
		await updateDoc(todoRef, {
			isCompleted: !todoItem.isCompleted
		});
	}

	async function deleteToDo(todoItem) {
		const todoRef = doc(db, 'todos', todoItem.id);
		await deleteDoc(todoRef);
	}
</script>

<h1 class="text-4xl font-bold text-center">Todos</h1>
<div class="flex items-center flex-col gap-4">
	<div class="flex items-center justify-center w-full mt-8">
		<input
			bind:value={todo}
			type="text"
			placeholder="Add a task"
			class="border p-2 focus:outline-gray-200"
		/>
		<button on:click={createToDo} class="bg-green-400 p-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
			>
		</button>
	</div>

	<ul class="flex flex-col gap-2 lg:px-24 mt-2">
		{#each todos as todoItem (todoItem.id)}
			<div
				class="flex items-center justify-between w-full gap-16 {todoItem.isCompleted
					? 'complete'
					: ''}"
			>
				<li class="flex items-center gap-2 font-semibold">
					<button on:click={markComplete(todoItem)} class="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-circle-check"
							><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg
						>
					</button>
					{todoItem.title}
				</li>
				<button on:click={deleteToDo(todoItem)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-circle-x"
						><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
					>
				</button>
			</div>
		{/each}
	</ul>
	<div class="flex items-center gap-2 absolute bottom-4 left-4">
		<button on:click={logout} class="hover:scale-110">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-log-out"
				><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
					points="16 17 21 12 16 7"
				/><line x1="21" x2="9" y1="12" y2="12" /></svg
			>
		</button>
		<div class="flex flex-col">
			<p class="font-semibold">{$user.displayName}</p>
			<p class="text-slate-400 text-sm">{$user.email}</p>
		</div>
	</div>
</div>

<style>
	.complete {
		text-decoration: line-through;
	}
</style>
