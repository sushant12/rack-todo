source 'https://rubygems.org'

gem 'activerecord', '~> 5.0', '>= 5.0.0.1', require: 'active_record'
gem 'pg'
gem 'puma'
gem 'require_all'
gem 'sinatra'

group :development do
  gem 'brakeman', require: false
  gem 'rubocop', '~> 0.49.1', require: false
end

group :development , :test do
  gem 'awesome_print', :require => 'ap'
  gem 'byebug'
end

group :test do
  gem 'test-unit'
  gem 'rack-test'
  gem 'factory_girl'
end
