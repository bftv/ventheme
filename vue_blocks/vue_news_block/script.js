/* Global functions */

Vue.filter('imgstriptruncate', function (text, stop, clamp) {
	var content = text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
	return content.replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,"");
});
Vue.filter('fiximg', function (text) {
	var content = text;
	return content.replace(new RegExp('src="/sites', 'g'), 'class="inline-img" src="'+mainURL+'/sites');
});

/* End Global functions */
 
var mainURL = "https://news.bftv.ucdavis.edu";
const url = mainURL+"/jsonapi/node/news_article?sort=-created&filter[category][condition][path]=field_fbtv_news_for.uuid&filter[category][condition][operator]=%3D&filter[category][condition][value]=a136800e-308a-4672-a42d-141b4cb9e594&include=field_sf_primary_image&page[limit]=15";

const vm = new Vue({
	el: '#news-block',
	data: {
		newsData: null,
		newsList: true,
		newsItem: null,
		imgsrc: '',
		newsdocurl: '',
		newsdocname: '',
		thumbnails: '',
		thumbnailURL: '',
		includeindex: [],
		moment: moment,
		loading: true
	},
	mounted() {
		axios.get(url).then(response => {
			//this.newsData = response.data.data[0].relationships.field_fbtv_news_for.data.id
			this.newsData = response.data.data,			
			this.thumbnails = response.data.included,
			this.loading = false
		})
	},
	methods: {
		loadNews: function(newsid){
			this.loading = true,
			window.scrollTo(0,0),
			newsURL = mainURL+"/jsonapi/node/news_article/"+newsid+"?include=field_sf_primary_image",
			this.newsList = false,
			axios.get(newsURL).then(response => {
				this.newsItem = response.data.data,
				this.imgsrc = response.data.included ? mainURL+response.data.included[0].attributes.url : '',				
				this.loading = false				
			})
		},
		GoBack: function() {
			this.loading = true,
			this.newsList = true,
			this.imgsrc = '',
			this.newsdocurl = '',
			this.newsdocname = '',
			this.loading = false
		},
		loadNewsDoc: function(newsid){
			newsURL = mainURL+"/jsonapi/file/file/"+newsid,
			axios.get(newsURL).then(response => {
				this.newsdocurl = mainURL+response.data.data.attributes.url,
				this.newsdocname = response.data.data.attributes.filename
			})
		},
		findthumbnail: function(imgid) {
			for(var i=0; i < this.thumbnails.length; i++){
				if(this.thumbnails[i].id == imgid){
					return mainURL+"/sites/g/files/dgvnsk1131/files/styles/sf_thumbnail/public"+this.thumbnails[i].attributes.uri.value.substr(8)
				}
			}			
		},
		newsblurb: function(newsid) {
			for(var i=0; i < this.newsData.length-1; i++){
				if(this.newsData[i].id == newsid){
					return this.newsData[i].attributes.body.value;
					//console.log(this.newsData[i].attributes.body.value)
				}
			}
		}
	}
});
