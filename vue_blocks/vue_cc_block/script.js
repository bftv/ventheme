/* Main URLs */
ccDbUrl = "https://web.bftv.ucdavis.edu:8080/cultural_collection/getrecord";
const blockID = document.getElementsByClassName('vue-cc-block')[0].id;
/* End Main URLs */


/* Components */

var recordList = {
    template: '#record-list-template',

    data: function() {
        return {
            recordsData: null,				
			loading: true,
			currentPage: 0,
			pageSize: 50,
			visibleRecords: [],
			s_strain_no: null,
			s_type: null,
			s_genus: null,
			s_species: null,
			s_strain: null,
			s_other_no: null,
			s_source: null,
			s_synonyms: null
        }
    },
	
	mounted: function() {
		//this.pageSize = drupalSettings.pdb.configuration[blockID].recordsPerPage,
		this.getRecordsList(ccDbUrl)
	},

    methods: {
        getRecordsList: function(url){
				axios.get(url).then(response => {			
				this.recordsData = response.data,
				this.updateVisibleRecords(),
				this.loading = false				
			})
		},
		updatePage: function(pageNumber){
			this.currentPage = pageNumber;
			this.updateVisibleRecords();
		},
		updateVisibleRecords: function(){
			this.visibleRecords = this.recordsData.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
			if(this.visibleRecords.length == 0 && this.currentPage > 0) {
				this.updatePage(this.currentPage - 1);
			}
		},
		totalPages: function() {
			return Math.ceil(this.recordsData.length / this.pageSize);
		},
		showPreviousLink: function() {
			return this.currentPage == 0 ? false : true;
		},
		showNextLink: function() {
			return this.currentPage == (this.totalPages() - 1) ? false : true;
		},
		search: function(){
			this.loading = true,
			searchURL = ccDbUrl+'?';
			if(this.s_strain_no){
				searchURL += 'strain_no='+this.s_strain_no+'&'
			}
			if(this.s_type){
				searchURL += 'type='+this.s_type+'&'
			}
			if(this.s_genus){
				searchURL += '&genus='+this.s_genus+'&'
			}
			if(this.s_species){
				searchURL += '&species='+this.s_species+'&'
			}
			if(this.s_strain){
				searchURL += '&strain='+this.s_strain+'&'
			}
			if(this.s_other_no){
				searchURL += '&other_no='+this.s_other_no+'&'
			}
			if(this.s_source){
				searchURL += '&source='+this.s_source+'&'
			}
			if(this.s_synonyms){
				searchURL += '&synonyms='+this.s_synonyms+'&'
			}
			this.getRecordsList(searchURL) 
		}
	},
}

var singleRecord = {
    template: '#single-record-template',

    data: function(){
        return {		
			record: null,			
			loading: true
        }
    },

    mounted: function(){
        this.getThisRecord();
    },

    methods: {
        getThisRecord: function(){
            recordURL = 'https://web.bftv.ucdavis.edu:8080/cultural_collection/getrecord?id='+this.$route.params.recordID,
			axios.get(recordURL).then(response => {
				this.record = response.data[0],
				//console.log(this.record),
				this.loading = false				
			})
        },		
		goBack: function(){
			router.go(-1)
		}
    }
}


/* End Components */

/* Router */

var router = VueRouter.createRouter({
	//mode: 'history',
	history: VueRouter.createWebHashHistory(),
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	
	routes: [
		{ 
			path: '/:pathMatch(.*)*', 
			component: recordList 
		},
		{ 
			path: '/record/:recordID', 
			name: 'record', 
			component: singleRecord
		}
	]
});

/* End Router */

/* Initialize */

Vue.createApp(
	//el: '#cc-block',
	//router
).use(router).mount('#cc-block')

/* End Initialize */
