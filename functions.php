<?php

// Enqueue

function scripts_and_styles_method() {
  $templateuri = get_template_directory_uri();

  $javascriptMain = $templateuri . '/dist/js/main.js';

  $is_admin = current_user_can('administrator') ? 1 : 0;

  $javascriptVars = array(
    'siteUrl' => home_url(),
    'themeUrl' => get_template_directory_uri(),
    'isAdmin' => $is_admin,
    'restEndpoint' => rest_url( 'wp/v2/' ),
    'homeId' => get_option('page_on_front'),
    'currentId' => get_queried_object_id(),
  );

  // Add home page meta to javascriptVars
  $home_page = get_page_by_path('home');
  if(!empty($home_page)) {
    $scratch_images = get_post_meta($home_page->ID, '_igv_scratch_images', true);
    $is_shuffled_images = get_post_meta($home_page->ID, '_igv_shuffle_images', true);

    if(!empty($scratch_images)) {
      $image_array = array();
      $image_sizes = get_intermediate_image_sizes();

      foreach ($scratch_images as $key => $value) {
        $image_srcs = array();
        $image_srcs['src'] = array();

        foreach($image_sizes as $size) {
          $image_src = wp_get_attachment_image_src($key, $size);

          $image_srcs['src'][$image_src[1]] = $image_src;
        }

        array_push($image_array, $image_srcs);
      }

      $javascriptVars['images'] = $image_array;
    }

    $javascriptVars['shuffle'] = $is_shuffled_images;
  }

  wp_register_script('javascript-main', $javascriptMain);
  wp_localize_script('javascript-main', 'WP', $javascriptVars);
  wp_enqueue_script('javascript-main', $javascriptMain, '', '', true);

  // Enqueue style
  wp_enqueue_style( 'style-site', get_stylesheet_directory_uri() . '/dist/css/site.css' );

  // dashicons for admin
  if (is_admin()) {
    wp_enqueue_style( 'dashicons' );
  }
}
add_action('wp_enqueue_scripts', 'scripts_and_styles_method');

// Override MAX upload size
@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

// Declare thumbnail sizes

get_template_part( 'lib/thumbnail-sizes' );

// Register Nav Menus
/*
register_nav_menus( array(
  'menu_location' => 'Location Name',
) );
 */

// Add third party PHP libs

function cmb_initialize_cmb_meta_boxes() {
  if (!class_exists( 'cmb2_bootstrap_202' ) ) {
    require_once 'vendor/webdevstudios/cmb2/init.php';
  }
}
add_action( 'init', 'cmb_initialize_cmb_meta_boxes', 11 );

function composer_autoload() {
  require_once( 'vendor/autoload.php' );
}
add_action( 'init', 'composer_autoload', 10 );

// Add libs

get_template_part( 'lib/custom-gallery' );
get_template_part( 'lib/post-types' );
get_template_part( 'lib/taxonomies' );
get_template_part( 'lib/meta-boxes' );
get_template_part( 'lib/site-options' );

// Add custom functions

get_template_part( 'lib/functions-misc' );
get_template_part( 'lib/functions-custom' );
get_template_part( 'lib/functions-filters' );
get_template_part( 'lib/functions-hooks' );
get_template_part( 'lib/functions-utility' );

?>
