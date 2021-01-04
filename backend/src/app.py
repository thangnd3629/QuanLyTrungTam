from flask import Flask, request, jsonify, redirect
import json
from flask_cors import CORS
import pyodbc
from datetime import datetime
import time
import calendar
import collections
# year, month, day, hour, min = map(int, time.strftime("%Y %m %d %H %M").split())



app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
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


@app.route('/students', methods=["PUT"])
def updateUser():
    data = request.json
    cursor.execute('''
                UPDATE Student
                SET name = ?,school = ?,class=?,address=?,phone=?,active=?
                WHERE id =?
                ''', data['name'], data['school'], data['class'], data['address'], data['phone'], data['active'], data['id'])
    cnxn.commit()
    return "200"


@app.route('/students', methods=["DELETE"])
def deleteStudent():
    data = request.json['delID']
    print(data)
    for x in data:

        cursor.execute(
            '''
                UPDATE Student
                SET active=?
                WHERE id =?
                ''', 0, x['id'])
        cursor.execute(
            '''
                DELETE FROM student_class
                WHERE student_id = ?
                ''',x['id'])
        
    cnxn.commit()
    return "200"


@app.route('/students', methods=["POST"])
def createUser():
    data = request.json
    cursor.execute("insert into Student(name,school,class,address,phone,active) values (?, ?,?,?,?,?)",
                   data['name'], data['school'], data['class'], data['address'], data['phone'], 1)
    cnxn.commit()
    
    return "200"

@app.route('/students/active', methods=["GET"])
def getActivateStudents():

    cursor.execute(
        '''SELECT * from Student
        where active =  1
        ''')
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/classes', methods=["GET"])
def getClasses():
    cursor.execute(
        "SELECT * from Class")
    classes = [dict(zip([key[0] for key in cursor.description], row))
               for row in cursor]
    return json.dumps({"classes": classes})

@app.route('/classes',methods=["POST"])
def createClass():
    class_info = request.json
    cursor.execute(
        '''
            INSERT INTO Class(name,price,teacher_id)
            values(?,?,?)
        ''',class_info['name'],class_info['price'],class_info['teacher_id']

    )
    cnxn.commit()
    cursor.execute(
        '''
            SELECT @@IDENTITY
        '''

    )
    id = cursor.fetchone()[0]
    for i in class_info['schedule']:
        cursor.execute(
            '''
            INSERT INTO Schedule(class_id,weekday_id)
            values(?,?)
        ''',int(str(id)),i
    )
    cnxn.commit()
    return "200"
@app.route('/classes/<id>', methods=["GET"])
def getClass(id):
    cursor.execute(
        '''select Student.id,Student.name,Student.school,Student.class,Student.address,Student.phone
from Class,student_class,Student
where Class.id = student_class.class_id
	and Student.id = student_class.student_id
	and Class.id = ?

''', id)
    students = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return json.dumps({"students": students})


@app.route('/enrol/<cid>', methods=["DELETE"])
def del_student_class(cid):
    data = request.json['delID']
    for x in data:

        cursor.execute(
            '''
                DELETE FROM student_class
                where student_id =? and class_id =?
                ''', x['id'],cid)
        
    cnxn.commit()
    return "200"


@app.route('/enrol/<cid>', methods=["POST"])
def add_student_class(cid):

    data = request.json
    cursor.execute(
        '''
            INSERT INTO student_class(student_id, class_id) values(?,?)

                ''',data['id'],cid)
    cnxn.commit()
    return "200"


def calculate_payment(month,year):
       
        
        cursor.execute(
            ''' 
            delete from MonthlyFee
            where month =? and year =?

            ''',month,year)
        cnxn.commit()
        cursor.execute(
            '''
            select * from Schedule

            ''')
        schedule = [dict(zip([key[0] for key in cursor.description], row))
                    for row in cursor]
        processed_schedule = {}
        for i in schedule:
            weekday = i["weekday_id"]
            class_id = i["class_id"]
            # calculate number of (monday) in a month
            
            day_to_count = int(weekday) - 2 
            #monday start at 0

            matrix = calendar.monthcalendar(int(year),int(month))

            num_days = sum(1 for x in matrix if x[day_to_count] != 0)
            if(class_id in processed_schedule):
                processed_schedule[class_id] += num_days
            else:
                processed_schedule[class_id] = num_days
        
        cursor.execute(
            '''
            select * from Class

            ''')
        class_list = [dict(zip([key[0] for key in cursor.description], row))
                    for row in cursor]
        price_list ={}
        for id in processed_schedule:
            for i in class_list:
                if int(id) == int(i['id']):
                    price_list[id] = i["price"] * processed_schedule.get(id)
        
        for i in price_list:
            cursor.execute(
                '''
                INSERT INTO MonthlyFee(class_id, month,year,monthly_fee) values(?,?,?,?)
                ''',i,month,year,price_list.get(i))
        cnxn.commit()
    


#Payment route
@app.route('/monthly-fee', methods=['POST'])
def cal_month_pay():
    month = request.json['month']
    year = request.json['year']
    try:
        calculate_payment(month,year)
        return "200"
    except:
        return "500"

@app.route('/payment',methods =["POST"])
def cal_pay():
    month = request.json['month']
    year = request.json['year']
    cursor.execute(
        '''
        select top 1 *
        from Payment
        where month = ? and year = ?

        ''',month,year)
    res = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    # recalculate
    if len(res) != 0: 
        print("OK")
        return "200"
    calculate_payment(month,year)
    cursor.execute(
        '''
        select sum(monthly_fee) as payment,student_id
        from MonthlyFee,student_class
        where student_class.class_id = MonthlyFee.class_id and month = ? and year = ?
        group by student_id, MonthlyFee.month
        
        ''',month,year)
    fee = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    
    for i in fee:
        cursor.execute(
            '''
                INSERT INTO Payment(student_id,month,year,total_amount,paid) values(?,?,?,?,?)

                    ''', i.get("student_id"),month,year,i.get("payment"),0)
    cnxn.commit()
    return "200"
@app.route('/payment/<month>/<year>',methods=['GET'])
def get_payment(month,year):
    cursor.execute(
        '''
        select Student.id,Student.name,Student.school,Student.class,Payment.total_amount,Payment.paid
        from Student,Payment
        where Student.id = Payment.student_id
        and month = ? and year = ?

        ''',month,year)
    payment_info = [collections.OrderedDict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    for i in payment_info:
        i['inadequate'] = i['total_amount'] - i['paid']
    return {"payment_info":payment_info}
    
@app.route('/payment/<month>/<year>/<sid>',methods = ['GET'])
def get_payment_list(month,year,sid):
    cursor.execute(
        '''
        select Class.name as cname,Teacher.name as tname,monthly_fee
    from MonthlyFee, student_class, Class, Teacher
    where student_class.student_id = ?
    and		MonthlyFee.class_id = student_class.class_id
    and student_class.class_id = Class.id
    and Class.teacher_id = Teacher.id
    and month = ? and year = ?
	
        '''
    ,sid,month,year)
    payment_info = [collections.OrderedDict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    return {"payment_info":payment_info}
@app.route('/payment/<month>/<year>/<sid>',methods = ['PUT'])
def update_payment(month,year,sid):

    cursor.execute(
        '''SELECT * from Payment
        where month = ? and year = ? and student_id=?
        ''',month,year,sid)
    payment_info = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    
    

    paid_amount = int(request.json['paid'])  + int(payment_info[0]['paid'])
    cursor.execute(
        '''
        UPDATE Payment
        SET paid = ?
        where student_id = ? and month = ? and year = ?
        ''',paid_amount,sid,month,year
    )
    cursor.commit()
    return "200"
@app.route('/teachers',methods=["GET"])
def getTeachers():
    cursor.execute(
        '''
            select * 
            from Teacher
        '''
    )
    teachers = [dict(zip([key[0] for key in cursor.description], row))
                for row in cursor]
    
    return json.dumps({"teachers": teachers})

if __name__ == "__main__":
    app.run(debug=True)
