
		</div>
		</div>

		<?php
		$particle_speed = get_field( 'particle_speed', 'options' );
		if( ! $particle_speed ) {
			$particle_speed = 0;
		}
		?>
		<script type="text/javascript">
		var particleSpeed = <?php echo $particle_speed; ?>
		</script>
		<?php
		wp_footer();
		?>

	</body>
</html>
