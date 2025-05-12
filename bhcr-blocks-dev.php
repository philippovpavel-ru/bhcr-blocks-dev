<?php
/**
 * Plugin Name:       [ Bohicare Blocks ]
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Команда СайтыиДизайн.рф
 * Author URI:        https://sitesanddesign.ru
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

function snd_block_categories($categories)
{
  $custom_categories = [
    [
      'slug'  => 'snd-blocks-frontpage',
      'title' => 'BOHICARE Blocks Frontpage',
    ],
    [
      'slug'  => 'snd-blocks-product',
      'title' => 'BOHICARE Blocks Product',
    ],
    [
      'slug'  => 'snd-blocks-other',
      'title' => 'BOHICARE Blocks Other',
    ],
  ];

  $existing_slugs = array_column($categories, 'slug');
  $new_categories = [];

  foreach ($custom_categories as $category) {
    if (!in_array($category['slug'], $existing_slugs, true)) {
      $new_categories[] = $category;
    }
  }

  return array_merge($new_categories, $categories);
}
add_filter('block_categories_all', 'snd_block_categories');

function snd_create_blocks_bhcr_blocks_init() {
  if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
    wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
    return;
  }

  if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
    wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
  }

  $manifest_data = require __DIR__ . '/build/blocks-manifest.php';
  foreach ( array_keys( $manifest_data ) as $block_type ) {
    register_block_type( __DIR__ . "/build/{$block_type}" );
  }
}
add_action( 'init', 'snd_create_blocks_bhcr_blocks_init' );