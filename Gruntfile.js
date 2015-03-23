module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			files: ["*.js"],
			options: {
				node: true,  // because the Gruntfile will be linted
				browser: true,
				undef: true,
				unused: true
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.registerTask("default", ["jshint"]);
	grunt.registerTask("travis", ["jshint"]);
};
