<?php

/* Get post objects for select field options */
function get_post_objects( $query_args ) {
  $args = wp_parse_args( $query_args, array(
    'post_type' => 'post',
  ) );
  $posts = get_posts( $args );
  $post_options = array();
  if ( $posts ) {
    foreach ( $posts as $post ) {
      $post_options [ $post->ID ] = $post->post_title;
    }
  }
  return $post_options;
}


/**
 * Include and setup custom metaboxes and fields.
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Hook in and add metaboxes. Can only happen on the 'cmb2_init' hook.
 */
add_action( 'cmb2_init', 'igv_cmb_metaboxes' );
function igv_cmb_metaboxes() {

  // Start with an underscore to hide fields from custom fields list
  $prefix = '_igv_';

  /**
   * Metaboxes declarations here
   * Reference: https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php
   */

  $home_page = get_page_by_path('home');

  if(!empty($home_page)) {

    $home_metabox = new_cmb2_box( array(
      'id'            => $prefix . 'home_metabox',
      'title'         => esc_html__( 'Options', 'cmb2' ),
      'object_types'  => array( 'page' ), // Post type
      'show_on'      => array(
        'key' => 'id',
        'value' => array($home_page->ID)
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Contact Email', 'cmb2' ),
      'id'         => $prefix . 'contact_email',
      'type'       => 'text_email',
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Portfolio PDF', 'cmb2' ),
      'id'         => $prefix . 'portfolio_pdf',
      'type'       => 'file',
      'options' => array(
    		'url' => false, // Hide the text input for the url
    	),
    	'text'    => array(
    		'add_upload_file_text' => 'Add PDF' // Change upload button text. Default: "Add or Upload File"
    	),
    	// query_args are passed to wp.media's library query.
    	'query_args' => array(
    		'type' => 'application/pdf', // Make library only display PDFs.
    	),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Scribble Images', 'cmb2' ),
      'id'         => $prefix . 'scribble_images',
      'type'       => 'file_list',
      'preview_size' => 'large', // Default: array( 50, 50 )
      'query_args' => array( 'type' => 'image' ),
    ) );

  }
}
?>
