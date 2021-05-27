const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");




module.exports = function(eleventyConfig){
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPassthroughCopy({
        'src/main.css': 'assets/main.css',
        'src/scripts/app.js': 'assets/app.js',
        'src/img': 'assets/img'

    });

    eleventyConfig.addFilter('highlighted', function(news){
        return news.filter(article => article.data.highlighted == true)
    });


    return{
        dir :{
            input : 'views', 
            output:  'docs'
        }
    }
}

