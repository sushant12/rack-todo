class ApplicationController < Sinatra::Base
  set :views, (Proc.new { File.join(root, '../views/') })
  set :public_folder, 'public'
end
