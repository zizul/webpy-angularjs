import web
import xml.etree.ElementTree as ET
import json

tree = ET.parse('../data/user_data.xml')
root = tree.getroot()

urls = (
    '/', 'index',
    '/todos', 'list_todos',
    '/newtodo', 'add_todo',
    '/users/(.*)', 'get_user'
)

app = web.application(urls, globals())

class index:
    def GET(self):
        print web.ctx.path

        #web.header('Content-type', 'text/html')
        #static_file = open('view/todo.html')
        #web.ctx.output = static_file

        #f = open(media+'/'+file, 'r')
        #f = open('view/todo.html')

        #return f.read()
        raise web.seeother('../view/todo.html')

class list_todos:

    def GET(self):
        print web.ctx.path
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')


        #pyDict = {'one':1,'two':2}
        web.header('Content-Type', 'application/json')
        #return json.dumps(pyDict)

        #output = 'todos:['
        d = []
        for child in root:
                d.append({'id': child.attrib['id'], 'name' : child.attrib['name']})
                print child.tag, child.attrib['name']
                #output += str(child.attrib['name']) + ','
        #output += ']'
        return json.dumps(d)

class add_todo:
    def POST(self):
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        web.header('Access-Control-Allow-Methods', 'OPTIONS, TRACE, GET, HEAD, POST, PUT')
        user_data = web.input();
        #user_data = web.data()
        print user_data;
        print user_data['name'];
        return


class get_user:
    def GET(self, user):
	for child in root:
		if child.attrib['id'] == user:
		    return str(child.attrib)

if __name__ == "__main__":
    app.run()