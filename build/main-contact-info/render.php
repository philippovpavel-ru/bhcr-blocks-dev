<?php
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$list = !empty($attributes['list']) ? $attributes['list'] : [];
?>

<nav <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-footer__links-column']); ?>>
	<ul>
		<?php foreach ($list as $item) :
			$title = !empty($item['title']) ? esc_html($item['title']) : '';
			$link = !empty($item['link']) ? $item['link'] : [];

			$link_title = !empty($link['title']) ? esc_html(do_shortcode($link['title'])) : 'Link';
			$link_url = !empty($link['url']) ? esc_url(do_shortcode($link['url'])) : '#';
			$link_target = !empty($link['target']) ? '_blank' : '_self';
		?>
			<li class="menu-item menu-item_contact">
				<?php echo $title ? "<p>$title</p>" : ''; ?>

				<a href="<?php echo $link_url; ?>" target="<?php echo $link_target; ?>">
					<?php echo $link_title; ?>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>