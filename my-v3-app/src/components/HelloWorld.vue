<template>
	<input type="text" v-model="todoMsg" />
	<button @click="add">添加</button>
	<button @click="clearHasDone">清理</button>
	<div>{{ demo1 === undefined ? 'demo1 is undefined' : '' }}</div>
	<div v-if="lists.length">
		<div v-for="(item, index) in lists" :key="item.msg">
			<input type="checkbox" v-model="item.done" />
			<Transition name="fade">
				<div :class="{ display: 'flex' }">
					<span :class="{ done: item.done }">{{ item.msg }}</span>
					<span @click="deleteItem(index)">❎</span>
				</div>
			</Transition>
		</div>
		<div>
			<span>全选</span>
			<input type="checkbox" v-model="isAllDone" />
			<span>{{ hasDown }} / {{ lists.length }}</span>
		</div>
	</div>
	<div v-else>暂无数据</div>
</template>

<script lang="ts" setup>
	import { ref, computed, reactive, onMounted } from 'vue';
	interface TodoItem {
		msg: string;
		done: boolean;
	}

	interface descriptionItem {
		id: number;
		info: string;
		children: (string | number)[];
	}

	interface DemoItem {
		name: string;
		description: descriptionItem;
	}

	const todoMsg = ref<string>('');

	const demo1 = ref<string>();
	const demo2 = ref<DemoItem[]>([
		{
			name: 'demo2-1',
			description: {
				id: 1,
				info: 'this is demo2-1',
				children: [12, 'duck'],
			},
		},
	]);

	const lists = ref<TodoItem[]>([
		{ msg: 'first thing', done: true },
		{ msg: 'do second thing', done: false },
		{ msg: 'get last thing', done: false },
	]);

	// // similar up
	// const lists: TodoItem[] = reactive([
	// 	{ msg: 'first thing', done: true },
	// 	{ msg: 'do second thing', done: false },
	// 	{ msg: 'get last thing', done: false },
	// ]);

	// onMounted
	onMounted(() => {
		console.log('show demo2: ', demo2.value, demo2.value[0], demo2.value[0].name);
	});

	const hasDown = computed(() => lists.value.filter((item) => item.done).length); // 已经做的事项列表

	const isAllDone = computed<boolean>({
		get() {
			console.log('get is one done');
			return hasDown.value === lists.value.length;
		},
		set(value: boolean) {
			console.log('set is all done');
			lists.value.forEach((item) => item.done === value);
		},
	});

	const add = () => {
		if (todoMsg.value) {
			lists.value.push({
				msg: todoMsg.value,
				done: false,
			});
			console.log(lists.value);
		}
	};

	const deleteItem = (index: number) => {
		lists.value.splice(index, 1);
	};

	const clearHasDone = () => {
		// 清理所有已完成事项
		lists.value = lists.value.filter((item) => !item.done);
	};
</script>

<style scoped>
	.done {
		text-decoration: line-through;
		color: gray;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
