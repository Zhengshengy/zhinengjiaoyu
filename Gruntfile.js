module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build_dev: {
                src: [
                    'dist',
                    'build_dev/'
                ],
                options: {
                    force: true
                }
            },
            build: {
                src: [
                    'dist',
                    'build/'
                ],
                options: {
                    force: true
                }
            }
        },
        copy: {
            build_dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: [
                            '*.js',
                            '*.html',
                            'fonts/**',
                            'img/**',
                            'layouts/**',
                            'pages/**'
                        ],
                        dest: 'build_dev/client/'
                    },
                    {
                        expand: true,
                        cwd: 'src/static/',
                        src: ['**'],
                        dest: 'build_dev/client/'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: [
                            '*.js',
                            '*.html',
                            'fonts/**',
                            'img/**',
                            'layouts/**',
                            'pages/**'
                        ],
                        dest: 'build/client/'
                    },
                    {
                        expand: true,
                        cwd: 'src/static/',
                        src: ['**'],
                        dest: 'build/client/'
                    }
                ]
            }
        },
        rename:{
            build_dev: {
                files: [
                    {
                        src: 'build_dev/index.spa.html',
                        dest: 'build_dev/index.html'
                    }
                ],
            },
        }
    });

    grunt.registerTask('grunt_clean_build', [
        'clean:build',
    ]);
    grunt.registerTask('grunt_build', [
        'copy:build'
    ]);
    grunt.registerTask('grunt_clean_build_dev', [
        'clean:build_dev',
    ]);
    grunt.registerTask('grunt_build_dev', [
        'copy:build_dev'
    ]);

};