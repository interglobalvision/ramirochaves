<?php

if( function_exists( 'add_theme_support' ) ) {
  add_theme_support( 'post-thumbnails' );
}

if( function_exists( 'add_image_size' ) ) {
  add_image_size( 'admin-thumb', 150, 150, false );
  add_image_size( 'opengraph', 1200, 630, true );

  add_image_size( 'mobile', 320, 9999, false );
  add_image_size( 'tablet', 768, 9999, false );
  add_image_size( 'tablet-pro', 1024, 9999, false );
  add_image_size( 'laptop-small', 1280, 9999, false );
  add_image_size( 'laptop-large', 1440, 9999, false );
  add_image_size( 'monitor', 1920, 9999, false );
}
