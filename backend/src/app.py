from flask import Flask,request,jsonify,Response
from  flask_pymongo import PyMongo,ObjectId
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


app.config["MONGO_URI"] = "mongodb://localhost:27017/flask"
mongo = PyMongo(app)


db= mongo.db.users


@app.route('/users', methods=['POST'])
def create():
   
    ID = db.insert({
        'name':request.json['name'],
        'email':request.json['email'],
        'password':request.json['password'],
    })

    response=jsonify(str(ObjectId(ID)))
    return response

@app.route('/users', methods=['GET'])
def get():
    users= []
    for doc in db.find():
        users.append({
            'id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'email':doc['email'],
            'password':doc['password']
        })

    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getOne(id):
    user=db.find_one({'_id':ObjectId(id)})
    return jsonify({
         'id':str(str(ObjectId(user['_id']))),
         'name':user['name'],
         'email':user['email'],
         'password':user['password']
    })



@app.route('/users/<id>', methods=['PUT'])
def update(id):
    db.update_one({
        '_id': ObjectId(id)},
        {'$set':{'name':request.json['name'],'email':request.json['email'],'password':request.json['password'] }}
    )
    
    respose = jsonify({"message":"user" + id + "actualizado"})
    return respose


@app.route("/users/<id>", methods=['DELETE'])
def delete(id): 
      db.delete_one({'_id': ObjectId(id)})
      respose = jsonify({"message":"user" + id + "borrado"})
      return respose           


if __name__ == '__main__':
    app.run(debug=True)


