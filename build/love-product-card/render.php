<?php
if (!class_exists('WooCommerce')) {
	return;
}
$curent_product = !empty($attributes['product']) ? $attributes['product'] : [];
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$block_wrapper_attributes = get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-accessories__card']);

if (empty($curent_product['id'])) {
	return;
}

$get_product = wc_get_product((int)$curent_product['id']);
if ($get_product) {
	$product_id = (int)$curent_product['id'];
	$product_url = esc_url($get_product->get_permalink());
	$product_title = esc_html($get_product->get_title());
	$product_excerpt = strip_tags(get_the_excerpt($product_id));
	$product_price = $get_product->get_price_html();
	$product_thumb_id = get_post_thumbnail_id($product_id);
	$product_thumb = wp_get_attachment_image($product_thumb_id, [334, 334]);

	echo <<<SLIDE
		<a href="$product_url" $block_wrapper_attributes>
			$product_thumb
			<p class="sd-accessories__card-name">$product_title</p>
			<p class="sd-accessories__card-description">$product_excerpt</p>
			<div class="sd-accessories__card-price">$product_price</div>
		</a>
	SLIDE;
}
