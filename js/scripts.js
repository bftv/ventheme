// Add custom jQuery or Javascript here
// https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
(function ($, Drupal) {
  "use strict";
  
  Drupal.behaviors.customBehavior = {
    attach: function (context, settings) {
      // perform jQuery as normal in here
    }
  };
  
})(jQuery, Drupal);
jQuery(document).ready(function ($) {
  $(function(){
		if (window.location.pathname.indexOf('/jobs-post/submissions') !== -1) {
			// Change the webform title in the <h1> element.
			var customTitle = 'Your Posted Jobs';
			var pageTitleElement = document.querySelector('.page-title');

			if (pageTitleElement) {
			  pageTitleElement.textContent = customTitle;
			}
		}
	});  
});
