<?php
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<article <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => "sd-article"]); ?>>
	<div class="container">
		<?php echo $content; ?>
	</div>
</article>