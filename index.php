<?php
get_header();
?>

<main id="main-content">
  <div id="doodle-view">
    <h1 id="site-title" class="font-size-large">Ramiro Chaves</h1>

    <canvas id="main-canvas"></canvas>
    <canvas id="stroke-canvas"></canvas>
  </div>

<?php
if (have_posts()) {
  while (have_posts()) {
    the_post();
?>
  <article id="project-holder" class="hide-brush">
    <div class="grid-column padding-bottom-mid">
      <header class="grid-item no-gutter margin-bottom-basic grid-row justify-between">
        <div class="js-menu-close grid-item item-s-auto padding-top-small padding-bottom-tiny u-pointer mobile-trigger">
          <span>&ShortLeftArrow;</span>
        </div>
        <div class="js-menu-trigger grid-item item-s-auto padding-top-small padding-bottom-tiny u-pointer mobile-trigger">
          <span>Projects</span>
        </div>
        <div class="grid-item item-s-12 padding-top-small">
          <h1 id="project-title" class="font-size-large"><?php the_title(); ?></h1>
        </div>
      </header>
      <div id="project-content" class="grid-item"><?php the_content(); ?></div>
    </div>
  </article>
<?php
  }
}
?>

<?php
  get_template_part('partials/cursor-loading.svg');
  get_template_part('partials/cursor-brush.svg');
?>

</main>

<?php
get_footer();
?>
