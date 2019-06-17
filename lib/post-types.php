<?php
// Menu icons for Custom Post Types
// https://developer.wordpress.org/resource/dashicons/
function add_menu_icons_styles(){
?>

<style>
#menu-posts-project .dashicons-admin-post:before {
    content: '\f319';
}
</style>

<?php
}
add_action( 'admin_head', 'add_menu_icons_styles' );


//Register Custom Post Types
add_action( 'init', 'register_cpt_project' );

function register_cpt_project() {

  $labels = array(
    'name' => _x( 'Proyectos', 'project' ),
    'singular_name' => _x( 'Proyecto', 'project' ),
    'add_new' => _x( 'Add New', 'project' ),
    'add_new_item' => _x( 'Add New Proyecto', 'project' ),
    'edit_item' => _x( 'Edit Proyecto', 'project' ),
    'new_item' => _x( 'New Proyecto', 'project' ),
    'view_item' => _x( 'View Proyecto', 'project' ),
    'search_items' => _x( 'Search Proyectos', 'project' ),
    'not_found' => _x( 'No projects found', 'project' ),
    'not_found_in_trash' => _x( 'No projects found in Trash', 'project' ),
    'parent_item_colon' => _x( 'Parent Proyecto:', 'project' ),
    'menu_name' => _x( 'Proyectos', 'project' ),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,

    'supports' => array( 'title', 'editor', 'thumbnail' ),

    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,

    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => true,
    'query_var' => true,
    'can_export' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'show_in_rest' => true,
  );

  register_post_type( 'project', $args );
}
