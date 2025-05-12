<?php
if (!class_exists('WooCommerce')) {
	return;
}

$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$link = !empty($attributes['link']) ? $attributes['link'] : [];
$compilations = !empty($attributes['compilations']) ? $attributes['compilations'] : [];
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$get_products = [];
?>

<section <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-compilations']); ?>>
	<div class="container">
		<div class="sd-best__header">
			<?php
			if ( $title ) {
				echo "<h2>$title</h2>";
			}

			if ($link && !empty($link['url'])) {
				$link_url = !empty($link['url']) ? esc_url($link['url']) : '#';
				$link_target = !empty($link['target']) ? '_blank' : '_self';
				$link_title = !empty($link['title']) ? esc_attr($link['title']) : 'Buy';

				echo "<a href='{$link_url}' target='{$link_target}' title='{$link_title}'>{$link_title} →</a>";
			}
			?>
		</div>

		<?php if ($compilations) : ?>
			<nav class="sd-compilations__nav-box">
				<?php for ($i=0; $i < count($compilations); $i++) {
					$compilation = $compilations[$i];

					$compilation_title = !empty($compilation['title']) ? esc_attr($compilation['title']) : "Tab {$i}";

					$active_class = '';
					if ($i === 0) {
						$active_class = ' active';
					}

					echo "<p class=\"sd-compilations__nav{$active_class}\">{$compilation_title}</p>";
				}?>
			</nav>

			<?php for ($i=0; $i < count($compilations); $i++) : ?>
				<?php
				$compilation = $compilations[$i];
				$compilation_products = !empty($compilation['products']) ? $compilation['products'] : [];
				$compilation_link = !empty($compilation['link']) ? $compilation['link'] : [];

				$get_products = [];
				$product_ids = [];
				if ($compilation_products) {
					foreach($compilation_products as $compilation_product_item) {
						$product_ids[] = $compilation_product_item['id'];
					}

					$get_products = get_posts([
						'post_type' => 'product',
						'include' => $product_ids,
						'orderby' => 'post__in',
						'tax_query' => array(
							array(
								'taxonomy'  => 'product_visibility',
								'terms'     => array('exclude-from-catalog'),
								'field'     => 'name',
								'operator'  => 'NOT IN',
							),
						),
					]);
				}
				?>
				<div class="sd-compilations__cards-box<?php echo ($i === 0 ? ' active' : ''); ?>">
					<div class="sd-compilations__slider-buttons">
						<div class="swiper-button-prev-best"></div>
						<div class="swiper-button-next-best"></div>
					</div>

					<div class="swiper swiper-best">
						<div class="swiper-wrapper">
							<?php if ($compilation_link && $compilation_link['show'] && $compilation_link['url']): ?>
								<?php
								$compilation_link_url = !empty($compilation_link['url']) ? esc_url($compilation_link['url']) : '#';
								$compilation_link_target = !empty($compilation_link['target']) ? '_blank' : '_self';
								$compilation_link_title = !empty($compilation_link['title']) ? esc_attr($compilation_link['title']) : 'Compilation';
								$compilation_link_preview_is_video = !empty($compilation_link['preview']['isVideo']) ? true : false;
								$compilation_link_preview_url = !empty($compilation_link['preview']['url']) ? esc_url($compilation_link['preview']['url']) : '';
								?>
								<a href="<?php echo $compilation_link_url; ?>" target="<?php echo $compilation_link_target; ?>" class="swiper-slide sd-compilations__link">
									<?php if ($compilation_link_preview_url): ?>
										<?php if ($compilation_link_preview_is_video) : ?>
											<video src="<?php echo $compilation_link_preview_url; ?>" autoplay="autoplay" muted loop playsinline loading="lazy"></video>
										<?php else : ?>
											<img src="<?php echo $compilation_link_preview_url; ?>" alt="" loading="lazy">
										<?php endif; ?>
									<?php endif; ?>
									<p><?php echo $compilation_link_title; ?> →</p>
								</a>
							<?php endif; ?>

							<?php if ($get_products) : global $post; ?>
								<?php foreach ($get_products as $post ) {
									setup_postdata($post);

									echo '<div class="swiper-slide">';
										wc_get_template_part('content', 'product');
									echo '</div>';
								} ?>
								<?php wp_reset_postdata(); ?>
							<?php endif; ?>
						</div>
					</div>
				</div>
			<?php endfor; ?>
		<?php endif; ?>
	</div>
</section>