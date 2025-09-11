<template>
<section class="py-2 px-4 bg-emerald-400/40 border-2 border-green-300 rounded-md max-w-4/5">
<h2 class="text-emerald-300 mb-4 align-middle"><Icon name="material-symbols-light:info-outline-rounded"/><slot mdc-unwrap="p" name="title"  /></h2>
<div>
	<slot />
</div>
</section>
</template>