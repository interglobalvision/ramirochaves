<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php wp_title('|',true,'right'); bloginfo('name'); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

<?php
get_template_part('partials/globie');
get_template_part('partials/seo');
?>

  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
  <link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">
  <link rel="shortcut" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.ico">
  <link rel="apple-touch-icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon-touch.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">

<?php if (is_singular() && pings_open(get_queried_object())) { ?>
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<?php } ?>

  <?php wp_head(); ?>
</head>
<?php
$classes = is_singular('project') ? 'loading project-open' : 'loading';
?>
<body <?php body_class($classes); ?>>
<!--[if lt IE 9]><p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->

<section id="main-container">

  <header id="header" class="hide-brush u-hidden">
    <div class="js-menu-trigger padding-top-small padding-bottom-tiny grid-row u-pointer">
      <div class="grid-item item-s-12"><span>Projects</span></div>
    </div>
    <nav id="project-menu">
      <div class="grid-row align-content-start">
        <div class="js-menu-close grid-item item-s-auto padding-top-small padding-bottom-tiny u-pointer">
          <span>&ShortLeftArrow;</span>
        </div>
        <div class="grid-item item-s-12 padding-top-tiny padding-bottom-basic">
          <?php wp_nav_menu( array( 'theme_location' => 'projects' ) ); ?>
        </div>
      </div>
    </nav>
  </header>
