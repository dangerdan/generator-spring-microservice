'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _S = require('underscore.string');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(SpringGenerator, yeoman.generators.Base);

SpringGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(chalk.green('\n.............DD88888888888888888,............\n' +
        '...........:888888888888888888888,...........\n' +
        '..........+88888888888888888888888+..........\n' +
        '.........,8888888888888888888888888..........\n' +
        '.........888888888888...888888888888.........\n' +
        '.......,88888887..D88...88Z..88888888,.......\n' +
        '.......8888888,...888...88D...=8888888.......\n' +
        '......D888888,..$8888...88887...8888888......\n' +
        '.....Z888888$..I88888...88888:..88888888,....\n' +
        '....D8888888...888888...88888D..,88888888....\n' +
        '....88888888,..888888..,888888...88888888....\n' +
        '....88888888,..8888888$888888D..,88888888....\n' +
        '....88888888I..Z8888888888888+..888888888....\n' +
        '.....Z8888888...O888888888888..,88888888.....\n' +
        '......88888888...,88888888D...,88888888......\n' +
        '.......88888888=.....?I+.....I88888888.......\n' +
        '.......,88888888D7.........ZD88888888,.......\n' +
        '.........888888888888888888888888888.........\n' +
        '.........,8888888888888888888888888..........\n' +
        '..........+88888888888888888888888+..........\n' +
        '...........,888888888888888888888:...........\n' +
        '.............DD888888888888888DD.............\n' +
        chalk.red('\nWelcome to the Spring Boot Microservice Generator\n\n')));

    var prompts = [
        {
            type: 'string',
            name: 'packageName',
            message: '(1/3) What is your default package name?',
            default: 'com.myapp'
        },
        {
            type: 'string',
            name: 'baseName',
            message: '(2/3) What is the base name of app?',
            default: 'app'
        },
        {
            type: 'string',
            name: 'dockerPrefix',
            message: '(3/3) What is your Docker prefix?',
            default: 'example'
        }
    ];

    this.prompt(prompts, function (props) {
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.starters = props.starters;
        this.dockerPrefix = props.dockerPrefix;

        cb();
    }.bind(this));
};

SpringGenerator.prototype.app = function app() {
    // ----------------------------
    // Micro service starter REST
    // ----------------------------
    var packageFolder = this.packageName.replace(/\./g, '/');
    var restDir = this.baseName + '-rest/';
    var restDirTemplate = 'microservice-starter-rest/';
    var javaDir = restDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = restDirTemplate + 'src/main/java/package/';
    var dockerDir = restDir + 'src/main/docker/';
    var dockerDirTemplate = restDirTemplate + 'src/main/docker/';
    var resourceDir = restDir + 'src/main/resources/';
    var resourceDirTemplate = restDirTemplate + 'src/main/resources/';
    var testDir = restDir + 'src/test/java/' + packageFolder + '/';
    var testDirTemplate = restDirTemplate + 'src/test/java/package/';

    // Docker
    this.mkdir(dockerDir);
    this.template(dockerDirTemplate + 'Dockerfile', dockerDir  + 'Dockerfile', this, {});

    // Resource
    this.mkdir(resourceDir);
    this.template(resourceDirTemplate + 'application.yml', resourceDir  + 'application.yml', this, {});
    this.template(resourceDirTemplate + 'bootstrap.yml', resourceDir  + 'bootstrap.yml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Test
    this.mkdir(testDir);
    this.mkdir(testDir + "/rest");
    this.mkdir(testDir + "/config");
    this.template(testDirTemplate + 'ApplicationTests.java', testDir + 'ApplicationTests.java', this, {});
    this.template(testDirTemplate + 'rest/HomeResourceTest.java', testDir + 'rest/HomeResourceTest.java', this, {});


    // Java
    this.mkdir(javaDir);
    this.mkdir(javaDir + '/config');
    this.mkdir(javaDir + '/domain');
    this.mkdir(javaDir + '/repository');
    this.mkdir(javaDir + '/rest');
    this.mkdir(javaDir + '/security');
    this.mkdir(javaDir + '/service');
    this.template(javaDirTemplate + 'Application.java', javaDir + 'Application.java', this, {});
    this.template(javaDirTemplate + 'config/ApplicationSettings.java', javaDir + 'config/ApplicationSettings.java', this, {});
    this.template(javaDirTemplate + 'config/SecurityConfig.java', javaDir + 'config/SecurityConfig.java', this, {});
    this.template(javaDirTemplate + 'domain/package-info.java', javaDir + 'domain/package-info.java', this, {});
    this.template(javaDirTemplate + 'repository/package-info.java', javaDir + 'repository/package-info.java', this, {});
    this.template(javaDirTemplate + 'rest/HomeResource.java', javaDir + 'rest/HomeResource.java', this, {});
    this.template(javaDirTemplate + 'security/CustomPermissionEvaluator.java', javaDir + 'security/CustomPermissionEvaluator.java', this, {});
    this.template(javaDirTemplate + 'service/package-info.java', javaDir + 'service/package-info.java', this, {});


    // Project
    this.template(restDirTemplate + 'pom.xml', restDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // ----------------------------
    // Micro service starter MODEL
    // ----------------------------
    var modelDir = this.baseName + '-model/';
    var modelDirTemplate = 'microservice-starter-model/';
    var modelJavaDir = modelDir + 'src/main/java/' + packageFolder + '/';
    var modelJavaDirTemplate = modelDirTemplate + 'src/main/java/package/';
    var modelResourceDir = modelDir + 'src/main/resources/';
    var modelResourceDirTemplate = modelDirTemplate + 'src/main/resources/';
    var modelTestDir = modelDir + 'src/test/java/' + packageFolder + '/';
    var modelTestDirTemplate = modelDirTemplate + 'src/test/java/package/';


    // Java
    this.mkdir(modelJavaDir);

    // Resource
    this.mkdir(modelResourceDir);

    // Test
    this.mkdir(modelTestDir);

    // Project
    this.template(modelDirTemplate + 'pom.xml', modelDir + 'pom.xml', this, {});

    // ----------------------------
    // Micro service starter MAIN
    // ----------------------------
    this.template('pom.xml', 'pom.xml', this, {});
    this.template('.gitignore', '.gitignore', this, {});

    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};

SpringGenerator.prototype.projectfiles = function projectfiles() {

};
