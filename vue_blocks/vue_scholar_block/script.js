/* Main URLs */
guserelement = document.getElementsByClassName('field--name-field-google-scholar-username');
gsusername = "";
if(guserelement.length > 0){
	gsusername = document.getElementsByClassName('field--name-field-google-scholar-username')[0].innerHTML;
	guserexist = true;
} else {
	gsusername = 'KBPHNxUAAAAJ';
	guserexist = false;
}
MainURL = "https://web.bftv.ucdavis.edu/googlescholar/scholar.php?user="+gsusername+"&cstart=0";
/* End Main URLs */


/* Components */

var pubList = {
    template: '#pub-list-template',

    data: function() {
        return {
            pubData: [],
			error: [],
			errorbolean: false,
			glink: "",
			guser: true,
			loading: true
        }
    },
	
	mounted: function() {
		this.guser = guserexist,
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
		},
		centeredPopup: function(url,w='1000',h='550',scroll='yes'){
			var popupWindow = null;
			LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
			TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
			settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
			popupWindow = window.open(url,"Article Info",settings)
		}
	},
}

/* End Components */

/* Router */

var router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes: [
		{ 
			path: '/:pathMatch(.*)*', 
			component: pubList 
		}
	]
});

/* End Router */

/* Initialize */

Vue.createApp(
	//el: '#scholar-block',
	//router
).use(router).mount('#scholar-block')

/* End Initialize */
