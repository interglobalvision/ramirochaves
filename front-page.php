<?php
get_header();
?>

<main id="main-content">

  <canvas id="main-canvas"></canvas>
  <canvas id="stroke-canvas"></canvas>

</main>

<?php
  get_template_part('partials/cursor-loading.svg');
  get_template_part('partials/cursor-brush.svg');
?>

<?php
get_footer();
?>
