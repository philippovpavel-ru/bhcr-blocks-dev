<?php
if (!class_exists('WooCommerce')) {
	return;
}
$curent_product = !empty($attributes['product']) ? $attributes['product'] : [];
$curent_link = !empty($attributes['link']) ? $attributes['link'] : [];
$curent_image = !empty($attributes['image']) ? $attributes['image'] : [];

$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$block_wrapper_attributes = get_block_wrapper_attributes(['id' => $anchor, 'class' => 'swiper-slide sd-you__card sd-best__card']);

if (empty($curent_product['id'])) {
	return;
}

$get_product = wc_get_product((int)$curent_product['id']);
if ($get_product) {
	$product_id = (int)$curent_product['id'];
	$product_url = esc_url($get_product->get_permalink());
	$product_title = esc_html($get_product->get_title());
	$product_sku = esc_attr($get_product->get_sku());

	if (!empty($curent_image['id'])) {
		$slide_thumb = wp_get_attachment_image($curent_image['id'], [334, 334]);
	} else {
		$product_thumb_id = get_post_thumbnail_id($product_id);
		$slide_thumb = wp_get_attachment_image($product_thumb_id, [334, 334]);
	}

	$add_to_cart_url = esc_url($get_product->add_to_cart_url());
	$add_to_cart_text = esc_html($get_product->add_to_cart_text());

	$product_link = "<a href='$add_to_cart_url' aria-describedby='woocommerce_loop_add_to_cart_link_describedby_$product_id' data-quantity='1' class='button product_type_simple add_to_cart_button ajax_add_to_cart' data-product_id='$product_id' data-product_sku='$product_sku' rel='nofollow'>$add_to_cart_text</a>";

	if (!empty($curent_link['show'])) {
		$slide_link_url = !empty($curent_link['url']) ? esc_url($curent_link['url']) : '#';
		$slide_link_title = !empty($curent_link['title']) ? esc_html($curent_link['title']) : '@profile';
		$slide_link_target = !empty($curent_link['target']) ? '_blank' : '_self';
	} else {
		$slide_link_url = $product_url;
		$slide_link_title = $product_title;
		$slide_link_target = '_self';
	}

	$slide_link = "<a href='$slide_link_url' target='$slide_link_target' class='sd-best__card-name'>$slide_link_title</a>";

	echo <<<SLIDE
		<div $block_wrapper_attributes>
			<div class="sd-best__img-box">
				<a href="$product_url" title="$product_title" class="sd-best__img-link">
					$slide_thumb
				</a>

				$product_link
			</div>
			$slide_link
		</div>
	SLIDE;
}
