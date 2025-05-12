<?php
if (!class_exists('WooCommerce')) {
	return;
}

$curent_product = !empty($attributes['product']) ? $attributes['product'] : [];
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';

if (!$curent_product || empty($curent_product['id'])) {
	return;
}

$get_product = get_post((int)$curent_product['id']);

if ($get_product) {
	global $post;

	$post = $get_product;
	setup_postdata($post);

	echo '<div ' . get_block_wrapper_attributes(['id' => $anchor, 'class' => 'swiper-slide']) . '>';
	wc_get_template_part('content', 'product');
	echo '</div>';

	wp_reset_postdata();
}