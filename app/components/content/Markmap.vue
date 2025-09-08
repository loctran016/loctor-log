<!-- Set global styles -->
<style>
	.markmap {
		position: relative;
	}
	.markmap > svg {
		width: 100%;
		height: 300px;
	}
</style>
<template>
    <!-- Wrap Markdown source in `.markmap` elements -->
    <div class="markmap">
            <slot :mdc-unwrap="true" />
    </div>
</template>

<script>
</script>

<!-- Load markmap -->
<!-- <script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@latest"></script> -->
