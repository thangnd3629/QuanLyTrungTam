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
        "SELECT id,name,work_place,address,phone_1,phone_2 from Student")
    # print(cursor.description[1][0])
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/updatestudent', methods=["POST"])
def updateUser():
    data = request.json
    cursor.execute('''
                UPDATE Student
                SET work_place = ?,address = ?,name=?,phone_1=?,phone_2=?
                WHERE id =?
                ''', data['work_place'], data['address'], data['name'], data['phone_1'], data['phone_2'], data['id'])
    cnxn.commit()
    cursor.execute(
        "SELECT id,name,work_place,address,phone_1,phone_2 from Student")
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/deletestudent', methods=["POST"])
def deleteStudent():
    data = request.json
    print(data)
    return "200"


@app.route('/students', methods=["POST"])
def createUser():
    data = request.json
    cursor.execute("insert into Student(work_place, address,name,phone_1,phone_2) values (?, ?,?,?,?)", data['work_place'],data['address'],data['name'],data['phone_1'],data['phone_2'])
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
