
  <footer id="footer">
  <?php
    $home_page = get_page_by_path('home');

    if(!empty($home_page)) {
      $email = get_post_meta($home_page->ID, '_igv_contact_email', true);
      $pdf = get_post_meta($home_page->ID, '_igv_portfolio_pdf', true);
  ?>
    <div class="grid-row justify-end">
    <?php
      if (!empty($email)) {
    ?>
      <div class="grid-item">
        <a href="mailto:<?php echo $email; ?>" class="link-underline"><?php echo $email; ?></a>
      </div>
    <?php
      }

      if (!empty($email) && !empty($pdf)) {
    ?>
      <div class="grid-item"><span>/</span></div>
    <?php
      }

      if (!empty($pdf)) {
    ?>
      <div class="grid-item">
        <a href="<?php echo $pdf; ?>" class="link-underline">Descargar PDF</a>
      </div>
    <?php
      }
    ?>
    ?>
    </div>
  <?
    }
  ?>
  </footer>

</section>

<?php
get_template_part('partials/scripts');
get_template_part('partials/schema-org');
?>

</body>
</html>
