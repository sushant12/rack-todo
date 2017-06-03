require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

# ActiveRecord::Base.establish_connection(
#   adapter:  'postgresql',
#   host:     'localhost',
#   username: 'postgres',
#   password: 'postgres',
#   database: 'testdb'
# )

# uncomment while deploying to heroku
ActiveRecord::Base.establish_connection(ENV["HEROKU_POSTGRESQL_SILVER_URL"])

require_all 'app'

configure { set :server, :puma }

use TaskController

run ApplicationController
