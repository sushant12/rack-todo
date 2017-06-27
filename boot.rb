require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

configure :production do
  require_relative 'config/environments/production'
end

configure :development do
  require_relative 'config/environments/development'
end

configure :test do
  require_relative 'config/environments/test'
end

require_all 'app'
