ENV['RACK_ENV'] = 'test'

require 'test/unit'
require 'factory_girl'
require 'rack/test'


require_relative File.expand_path '../../boot',__FILE__