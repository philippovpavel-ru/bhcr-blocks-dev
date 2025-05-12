<?php
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$mob_header = !empty($attributes['mobHeader']);
$mirror = !empty($attributes['mirror']);
$type = !empty($attributes['type']) ? esc_attr($attributes['type']) : 'default';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : '';
$image = !empty($attributes['image']) ? $attributes['image'] : [];
$typeClass = ' sd-default';

if ($type === 'privileges') {
	$typeClass = ' sd-vacancies sd-privileges';
} elseif ($type === 'vacancies') {
	$typeClass = ' sd-vacancies';
}

$image_html = '';
$image_html_separator = '<div class="sd-404__hr"></div>';

$image_html .= $mirror ? $image_html_separator : '';
$image_html .= '<div class="sd-404__img">';
$image_html .= !empty($image['id']) ? wp_get_attachment_image((int)$image['id'], '1536x1536') : '';
$image_html .= '</div>';
$image_html .= !$mirror ? $image_html_separator : '';
?>

<main <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => "sd-contacts{$typeClass}"]); ?>>
	<?php if ($mob_header): ?>
		<div class="container sd-contacts__mob-header">
			<?php
			if (function_exists('bhcr_breadcrumbs')) {
				bhcr_breadcrumbs();
			}

			if ($title) {
				echo "<h1>$title</h1>";
			}
			?>
		</div>
	<?php endif; ?>

	<div class="container sd-contacts__grid">
		<?php
		if (!$mirror) {
			echo $image_html;
		}
		?>

		<div class="sd-contacts__text">
			<?php
			if (function_exists('bhcr_breadcrumbs')) {
				bhcr_breadcrumbs();
			}

			if ($title) {
				echo "<h1>$title</h1>";
			}
			?>

			<?php echo $content; ?>
		</div>

		<?php
		if ($mirror) {
			echo $image_html;
		}
		?>

		<div class="sd-contacts__bottom-hr"></div>
	</div>
</main>