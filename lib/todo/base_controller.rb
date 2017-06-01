module Todo
  class BaseController
    attr_reader :env

    def initialize(env)
      @env = env
    end

    def params
      Rack::Request.new(env).params
    end

    def render(view)
      Tilt::ERBTemplate.new("app/views/layouts/application.html.erb").render {
        Tilt::ERBTemplate.new("app/views/#{view}.html.erb").render(self)
      }
    end

    def redirect_to path
      body = %Q(Redirecting to <a href="#{path}">#{path}</a>)
      header = { "Location" => path }
      [body, 301, header]
    end
  end
end