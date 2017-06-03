require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

ActiveRecord::Base.establish_connection(
    adapter:  'postgresql',
    host:     'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'testdb'
)

require_all 'app'

use TaskController

run ApplicationController
