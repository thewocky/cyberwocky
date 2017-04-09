<?php
/**
 * Author: Jeff Battema
 * URL: daffynitions.com
 * Theme init, defaults, enqueues scripts & stlyes
 */

/*------------------------------------*\
    Theme Support
\*------------------------------------*/


/* Get Minification */
function wocky_minify() {
    if ( strpos( get_site_url(), '.local' ) ) {
        $min = '';
        $ver = time();  // never cache on dev
    } else {
        $min = '.min';
    }
    return $min;
}

/* Get Version */
function wocky_version() {
    $wocky_theme = wp_get_theme();
    $ver = $wocky_theme->get( 'Version' );
    if ( strpos( get_site_url(), '.local' ) ) {
        $ver = time();  // never cache on dev
    }
    return $ver;
}

if (!isset($content_width))
{
    $content_width = 900;
}

if (function_exists('add_theme_support'))
{

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_image_size('large', 700, '', true); // Large Thumbnail
    add_image_size('medium', 250, '', true); // Medium Thumbnail
    add_image_size('small', 120, '', true); // Small Thumbnail
    add_image_size('custom-size', 700, 200, true); // Custom Thumbnail Size call using the_post_thumbnail('custom-size');

    // Add Support for Custom Backgrounds - Uncomment below if you're going to use
    /*add_theme_support('custom-background', array(
    'default-color' => 'FFF',
    'default-image' => get_template_directory_uri() . '/img/bg.jpg'
    ));*/

    // Add Support for Custom Header - Uncomment below if you're going to use
    /*add_theme_support('custom-header', array(
    'default-image'          => get_template_directory_uri() . '/img/headers/default.jpg',
    'header-text'            => false,
    'default-text-color'     => '000',
    'width'                  => 1000,
    'height'                 => 198,
    'random-default'         => false,
    'wp-head-callback'       => $wphead_cb,
    'admin-head-callback'    => $adminhead_cb,
    'admin-preview-callback' => $adminpreview_cb
    ));*/

    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Enable HTML5 support
    add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));

    // Localisation Support
    load_theme_textdomain('cyberwockytheme', get_template_directory() . '/languages');
}

/*------------------------------------*\
    Functions
\*------------------------------------*/

// Load Cyberwocky Theme scripts (header.php)
function wocky_scripts_and_styles()
{
  
   if ( ! is_admin() ) {
        // jQuery
        wp_deregister_script('jquery');

        // Modernizr
        wp_register_script('modernizr', get_template_directory_uri() . '/assets/js/lib/modernizr.min.js',
            array(),
            '2.8.3',
            false );

        // Custom scripts
        wp_register_script(
            'wockyscripts',
            get_template_directory_uri() . '/assets/js/main' . wocky_minify() . '.js',
            array( 'modernizr'),
            wocky_version(),
            true );

        // Enqueue Scripts
        wp_enqueue_script('wockyscripts');

        wp_register_style('wockystyle', get_template_directory_uri() . '/assets/css/wocky' . wocky_minify() . '.css', array(), wocky_version() );

        // Register CSS
        wp_enqueue_style('wockystyle');
    }

}


// Remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style()
{
    global $wp_widget_factory;
    
    if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
        remove_action('wp_head', array(
            $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
            'recent_comments_style'
        ));
    }
}

add_action( 'init', 'wocky_cpt_init' );
/**
 * Register custom post types.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */

function wocky_cpt_init() {
    $project_labels = array(
        'name'               => _x( 'Projects', 'Projects', 'wocky' ),
        'singular_name'      => _x( 'Project', 'Project', 'wocky' ),
        'menu_name'          => _x( 'Projects', 'admin menu', 'wocky' ),
        'name_admin_bar'     => _x( 'Projects', 'add new on admin bar', 'wocky' ),
        'add_new'            => _x( 'Add New', 'project-item', 'wocky' ),
        'add_new_item'       => __( 'Add New Project', 'wocky' ),
        'new_item'           => __( 'New Project', 'wocky' ),
        'edit_item'          => __( 'Edit Project', 'wocky' ),
        'view_item'          => __( 'View Project', 'wocky' ),
        'all_items'          => __( 'All Projects', 'wocky' ),
        'search_items'       => __( 'Search Projects', 'wocky' ),
        'parent_item_colon'  => __( 'Parent Projects:', 'wocky' ),
        'not_found'          => __( 'No Projects found.', 'wocky' ),
        'not_found_in_trash' => __( 'No Projects found in Trash.', 'wocky' )
    );

    $project_args = array(
        'labels'             => $project_labels,
        'description'        => __( 'Description.', 'wocky' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'project' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
        'taxonomies'         => array( 'category', 'post_tag' )
    );

    register_post_type( 'project', $project_args );
    register_taxonomy_for_object_type( 'category', 'project' );
    register_taxonomy_for_object_type( 'post_tag', 'project' );

}

