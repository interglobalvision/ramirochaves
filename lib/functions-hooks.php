<?php

// Custom hooks (like excerpt length etc)

// Programatically create pages
function create_custom_pages() {
  $custom_pages = array(
    'home' => 'Home',
  );
  foreach($custom_pages as $page_name => $page_title) {
    $page = get_page_by_path($page_name);
    if( empty($page) ) {
      wp_insert_post( array(
        'post_type' => 'page',
        'post_title' => $page_title,
        'post_name' => $page_name,
        'post_status' => 'publish'
      ));
    }
  }

  // Set static Homepage
  $home = get_page_by_path('home');
  update_option( 'page_on_front', $home->ID );
  update_option( 'show_on_front', 'page' );
}
add_filter( 'after_setup_theme', 'create_custom_pages' );

// WP Nav Menu
function register_igv_nav_menus() {
  register_nav_menu('projects',__( 'Project Menu' ));
}
add_action( 'init', 'register_igv_nav_menus' );

add_filter( 'allowed_block_types', 'igv_allowed_block_types' );
function igv_allowed_block_types( $allowed_blocks ) {
	return array(
		'core/image',
		'core/paragraph',
		'core/heading',
		'core/list',
    'core/audio',
    'core/video',
    'core/separator',
    'core-embed/youtube',
    'core-embed/vimeo'
	);
}
