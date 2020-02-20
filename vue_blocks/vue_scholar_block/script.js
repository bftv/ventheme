/* Main URLs */
const gsusername = document.getElementsByClassName('field--name-field-google-scholar-username')[0].innerHTML;
MainURL = "https://web.bftv.ucdavis.edu/googlescholar/scholar.php?user="+gsusername+"&cstart=0";
/* End Main URLs */
 

/* Components */

var pubList = Vue.extend({
    template: '#pub-list-template',

    data: function() {
        return {
            pubData: [],
			error: [],
			errorbolean: false,
			glink: "",
			loading: true
        }
    },
	
	mounted: function() {
		this.getPubList(MainURL),
		this.glink = "https://scholar.google.com/citations?user="+gsusername+"&cstart=0&pagesize=100&view_op=list_works&sortby=pubdate"
	},

    methods: {
        getPubList: function(url){		
			axios.get(url).then(response => {				
				dresponse = response.data					
				if(typeof dresponse != "string"){
					this.pubData.push(response.data.publications),
					this.loading = false
				}			
			}).catch(e => {
				this.error.push(e),
				this.errorbolean = true,
				this.loading = false
			});	
		}		
	},
})

/* End Components */

/* Router */

var router = new VueRouter({
	
	routes: [
		{ 
			path: '*', 
			component: pubList 
		}
	]
});

/* End Router */

/* Initialize */

new Vue({
	el: '#scholar-block',
	router
})

/* End Initialize */
