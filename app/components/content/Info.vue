<template>
<section class="py-6 px-8 bg-emerald-400/40 border-2 border-green-300 rounded-md max-w-4/5">
<h2 class="text-emerald-300 font-bold text-2xl mb-5 flex items-center gap-2"><Icon name="material-symbols-light:info-outline-rounded"/><slot mdc-unwrap="p" name="title"  /></h2>
<div>
	<slot />
</div>
</section>
</template>