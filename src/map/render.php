<?php
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : '';

$get_terms = get_terms([
	'taxonomy' => 'bhcr_partners_contries',
	'hide_empty' => false,
	'orderby' => 'none',
]);
?>

<section <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => "b-map"]); ?>>
	<div class="container">
		<?php
		if (function_exists('bhcr_breadcrumbs')) {
			bhcr_breadcrumbs();
		}

		if ($title) {
			echo "<h1>$title</h1>";
		}
		?>

		<?php if ($get_terms) : ?>
			<div class="b-map__flex">
				<div class="b-map__map-box">
					<?php
					$index = 0;
					foreach ($get_terms as $term_obj) {
						$map_xy = function_exists('get_field') ? get_field('map_xy', $term_obj) : '';

						if (!$map_xy) {
							continue;
						}

						$map_xy = str_replace(' ', '', $map_xy);
						$map_xy = explode(',', $map_xy);
						$map_x = (float)$map_xy[0];
						$map_y = (float)$map_xy[1];
						$active_class = $index === 0 ? 'active' : '';

						echo "<div class=\"b-map__map $active_class\" data-centerx=\"$map_x\" data-centery=\"$map_y\"></div>";

						$index++;
					}
					?>
				</div>

				<div class="b-map__list">
					<div class="b-map__country">
						<div class="b-header__currency">
							<div class="b-header__currency-now"><?php esc_html_e('Select country', 'bohicare-core'); ?></div>
							<div class="b-header__currency-menu">
								<?php
								foreach ($get_terms as $term_obj) {
									$map_xy = function_exists('get_field') ? get_field('map_xy', $term_obj) : '';

									if (!$map_xy) {
										continue;
									}

									$term_title = esc_html($term_obj->name);

									echo "<a class=\"b-header__currency-type b-map__country-button\">$term_title</a>";
								}
								?>
							</div>
						</div>
					</div>

					<ul id="myUL" data-icon="<?php echo esc_url(plugin_dir_url(__FILE__) . 'map.svg'); ?>" data-address-str="<?php echo esc_html__('Address', 'bohicare-core'); ?>" data-site-str="<?php echo esc_html__('Site', 'bohicare-core'); ?>">
						<?php
						$index = 0;
						foreach ($get_terms as $term_obj) {
							$map_xy = function_exists('get_field') ? get_field('map_xy', $term_obj) : '';

							if (!$map_xy) {
								continue;
							}

							$term_id = esc_html($term_obj->term_id);
							$active_class = $index === 0 ? 'active' : '';
							$partners = '';
							$get_posts = get_posts([
								'numberposts' => -1,
								'post_type' => 'bhcr_partners',
								'orderby' => 'title',
								'order' => 'ASC',
								'tax_query' => [
									[
										'taxonomy' => 'bhcr_partners_contries',
										'field' => 'term_id',
										'terms' => $term_id,
									],
								],
							]);

							if (!$get_posts) {
								continue;
							}

							global $post;
							foreach ($get_posts as $post) {
								setup_postdata($post);

								$partner_id = (int)($post->ID);
								$get_fields = function_exists('get_fields') ? get_fields($partner_id) : [];
								$partner_map_xy = esc_html($get_fields['map_xy'] ?? '');

								if (! ($get_fields || $partner_map_xy)) {
									continue;
								}

								$partner_title = esc_html($get_fields['title'] ?? '');
								$partner_address = esc_html($get_fields['address'] ?? '');
								$partner_link_arr = $get_fields['link'] ?? [];
								$partner_map_xy = str_replace(' ', '', $partner_map_xy);
								$partner_map_xy = explode(',', $partner_map_xy);
								$partner_x = (float)$partner_map_xy[0];
								$partner_y = (float)$partner_map_xy[1];
								$first_letter_big = esc_attr(mb_strtoupper(mb_substr($partner_title, 0, 1, 'UTF-8')));
								$partner_link = '';
								$partner_address_str = '';
								$partner_attrs_str = '';

								if ($partner_address) {
									$address_title = esc_html__('Address', 'bohicare-core');

									$partner_address_str = <<<ADDRESS
                    <div class="b-map__country-address">
                      <p class="b-map__country-address-title">$address_title</p>
                      <p>$partner_address</p>
                    </div>
                  ADDRESS;
								}

								if ($partner_link_arr) {
									$link_url = esc_url($partner_link_arr['url'] ?? '') ?: '#';
									$link_name = esc_html($partner_link_arr['title'] ?? '');
									$link_target = esc_attr($partner_link_arr['target'] ?? '_self');
									$link_title = esc_html__('Site', 'bohicare-core');

									$partner_link = <<<LINK
                    <div class="b-map__country-address b-map__country-address--site">
                      <p class="b-map__country-address-title">$link_title</p>
                      <a href="$link_url" target="$link_target">$link_name</a>
                    </div>
                  LINK;
								}

								$partner_attrs = [
									'data-geox' => $partner_x,
									'data-geoy' => $partner_y,
									'data-title' => $partner_title,
									'data-address' => $partner_address,
									'data-link' => esc_url($partner_link_arr['url'] ?? ''),
								];

								foreach ($partner_attrs as $key => $attr) {
									$key = esc_attr($key);
									$attr = esc_attr($attr);

									$partner_attrs_str .= "$key='$attr' ";
								}

								$partners .= <<<PARTNER
                  <li data-letter="$first_letter_big">
                    <h3 $partner_attrs_str">$partner_title</h3>
                    <div class="b-map__country-row">
                      $partner_address_str 
                      $partner_link
                    </div>
                  </li>
                PARTNER;
							}

							echo <<<COLUMN
                <div class="column $active_class">
                  $partners
                </div>
              COLUMN;

							wp_reset_postdata();
							$index++;
						}
						?>
					</ul>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>