import Vue from 'vue';

// import { VueComponent, Prop } from 'vue-typescript'
import template from './posts.html';

import { LoadingState } from '../../main';
import { postsResource } from '../../helpers/resources';

export default Vue.extend({
  template,

  data() {
    return {
      posts: []
    };
  },

  created(){
    this.fetchPosts();
  },

  methods: {
    fetchPosts(){
      LoadingState.$emit('toggle', true);
      return postsResource.get().then((response) => {
        this.posts = response.data;
        LoadingState.$emit('toggle', false);
      }, (errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse.status);
        LoadingState.$emit('toggle', false);
      });
    }
  }

});
