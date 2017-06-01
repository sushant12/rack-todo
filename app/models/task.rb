 class Task
   DB = SQLite3::Database.new "test.db"
  class << self
     def all()
       DB.execute("select rowid, * from tasks")
     end

     def update(task, finish, id)
       DB.execute("UPDATE tasks set name = '#{task}', finished = '#{finish}' where rowid='#{id}'")
     end

     def save(task_name)
       DB.execute("INSERT INTO tasks (name, finished) VALUES (?, ?)", [task_name,0])
     end

     def delete(id)
       DB.execute("delete from tasks where rowid='#{id}'")
     end

    def where(id)
      DB.execute("select rowid, * from tasks where rowid = #{id}")
    end
  end

 end