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
                      'Trusted_Connection=yes;', ansi=True)

cursor = cnxn.cursor()


@app.route('/students', methods=["GET"])
def getStudent():

    cursor.execute(
        "SELECT * from Student")
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/students/active', methods=["GET"])
def getActivateStudents():

    cursor.execute(
        '''SELECT * from Student
        where active =  1
        ''')
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
                ''', data['name'], data['school'], data['class'], data['address'], data['phone'], data['active'], data['id'])
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
                ''', 0, x['id'])
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
    cursor.execute("insert into Student(name,school,class,address,phone,active) values (?, ?,?,?,?,?)",
                   data['name'], data['school'], data['class'], data['address'], data['phone'], 1)
    cnxn.commit()
    # print(data)
    return "200"


@app.route('/classes', methods=["GET"])
def getClasses():
    cursor.execute(
        "SELECT * from Class")
    classes = [dict(zip([key[0] for key in cursor.description], row))
               for row in cursor]
    return json.dumps({"classes": classes})


@app.route('/classes/<id>', methods=["GET"])
def getClass(id):
    cursor.execute(
        '''select Student.id,Student.name,Student.school,Student.class,Student.address,Student.phone,student_class.active
from Class,student_class,Student
where Class.id = student_class.class_id
	and Student.id = student_class.student_id
	and Class.id = ?

''', id)
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/deletestudent_class', methods=["POST"])
def del_student_class():
    data = request.json
    for x in data:

        cursor.execute(
            '''
                DELETE FROM student_class 
                where student_id =?
                ''', x['id'])
    cnxn.commit()
    return "200"


@app.route('/classes/<id>/add', methods=["POST"])
def add_student_class(id):
    # id la classid
    data = request.json['sid']
    cursor.execute(
        '''
            INSERT INTO student_class(student_id, class_id,active) values(?,?,?)
                
                ''', data, id, True)
    cnxn.commit()
    return "200"


@app.route('/payment/<month>', methods=['POST'])
def calculate_payment(month):
    cursor.execute(
        "SELECT * from Student where active = 1")
    data = [dict(zip([key[0] for key in cursor.description], row))
            for row in cursor]
    
    test = []
    for student in data:
        student_id = student['id']
        cursor.execute(
            ''' 
        select Schedule.weekday_id  from Class,Schedule,Student,student_class
        where Class.id = Schedule.class_id
        and student_class.class_id = Class.id
        and Student.id = student_class.student_id
        and Student.active = 1
        and Student.id = ?


            ''', student_id)
        test += [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
        
    print(test)
    return "200"
    


if __name__ == "__main__":
    app.run(debug=True)
