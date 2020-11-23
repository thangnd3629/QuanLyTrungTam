from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import pyodbc
from datetime import datetime
app = Flask(__name__)
CORS(app)
cnxn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-DQFGLTC;'
                      'Database=QuanLyTrungTam;'
                      'Trusted_Connection=yes;',ansi=True)

cursor = cnxn.cursor()


@app.route('/students', methods=["GET"])
def getStudent():
    data = []
    cursor.execute(
        "SELECT * from Student")
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/updatestudent', methods=["POST"])
def updateUser():
    data = request.json
    cursor.execute('''
                UPDATE Student
                SET name = ?,school = ?,class=?,address=?,phone=?,active=?
                WHERE id =?
                ''', data['name'], data['school'], data['class'], data['address'], data['phone'], data['active'],data['id'])
    cnxn.commit()
    cursor.execute(
        "SELECT * from Student")
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/deletestudent', methods=["POST"])
def deleteStudent():
    data = request.json
    for x in data:
        
        cursor.execute(
            '''
                UPDATE Student
                SET active=?
                WHERE id =?
                ''', 0 ,x['id'])
    cnxn.commit()
    print(data)
    cursor.execute(
        "SELECT * from Student")
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/students', methods=["POST"])
def createUser():
    data = request.json
    cursor.execute("insert into Student(name,school,class,address,phone,active) values (?, ?,?,?,?,?)", data['name'],data['school'],data['class'],data['address'],data['phone'],1)
    cnxn.commit()
    #print(data)
    return "200"


@app.route('/users/<id>', methods=["POST"])
def deleteUser():
    return "Hello"


@app.route('/users/<name>', methods=["GET"])
def getUser(name):
    print(name)
    return "Hello"


if __name__ == "__main__":
    app.run(debug=True)
