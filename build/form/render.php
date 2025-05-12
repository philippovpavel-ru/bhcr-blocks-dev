<?php
if (!class_exists('WPCF7')) {
	return;
}

$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : '';
$description = !empty($attributes['description']) ? esc_html($attributes['title']) : '';
?>

<section <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-form']); ?>>
	<div class="container">
		<?php
		if ($title) {
			echo "<h2>$title</h2>";
		}

		if ($description) {
			echo "<h3>$description</h3>";
		}

		echo '<div class="sd-dialog__form-wrapper sd-form__cf7">';
		echo $content;
		echo '</div>';
		?>
	</div>
</section>