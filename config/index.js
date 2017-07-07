require('log4js').configure(__dirname + '/log4js.json');
var config = {
    development: {
        port: 3000,
        trustProxy: 1,
        modules: {
            'upload': {
                module: process.cwd() + '/lib',
                config: {
                    prefix: '/upload',
                    fields: {
                        avatar: 1,
                        gallery: 8
                    }
                }
            },
            'upload2': {
                module: process.cwd() + '/lib',
                config: {
                    prefix: '/upload2',
                }
            }
        }
    },
    production: {
        port: 3000,
        trustProxy: 1,
        modules: {
            'upload': {
                module: process.cwd() + '/lib',
                config: {
                    prefix: '/upload',
                }
            }
        }
    }
};

var env = process.env.NODE_ENV || 'development';
config = config[env] || config['development'];
config.env = env;

module.exports = config;
