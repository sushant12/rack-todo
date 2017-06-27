ENV['RACK_ENV'] = 'test'

require 'test/unit'
require 'factory_girl'
# require 'rack/test'

require_relative '../../boot.rb'