module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '141.94.22.161',
      ref  : 'origin/main',
      repo : 'git@github.com:LucasVaro/gbv-api.git',
      path : '/home/ubuntu/workspace/gbv-prod/api-client',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
