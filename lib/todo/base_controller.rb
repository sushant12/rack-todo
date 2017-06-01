module Todo
  class BaseController
    def render(view)
      Tilt::ERBTemplate.new("app/views/layouts/application.html.erb").render {
        Tilt::ERBTemplate.new("app/views/#{view}.html.erb").render(self)
      }
    end
  end
end