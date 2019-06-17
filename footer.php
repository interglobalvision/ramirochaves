
  <footer id="footer" class="padding-bottom-tiny">
  <?php
    $home_page = get_page_by_path('home');

    if(!empty($home_page)) {
      $email = get_post_meta($home_page->ID, '_igv_contact_email', true);
      $pdf = get_post_meta($home_page->ID, '_igv_portfolio_pdf', true);
  ?>
    <div class="grid-row">
    <?php
      if (!empty($email)) {
    ?>
      <div class="grid-item font-light hide-brush">
        <a href="mailto:<?php echo $email; ?>" class="link-underline"><?php echo $email; ?></a>
      </div>
    <?php
      }
    ?>
    </div>
  <?php
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
