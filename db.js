const { appendFile } = require('fs');
var mysql = require('mysql2');
var express = require("express");
var app = express();
var url = require("url")
var bodyparser = require("body-parser");
const res = require('express/lib/response');
const { first } = require('cheerio/lib/api/traversing');

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.set('json spaces', 2)

var urlencodedParser = bodyparser.urlencoded({ extended: false })

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "superblah",
    database: "smaldo1db"
    
});

con.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!")
})


app.post("/employee/add", function (req, res) {
    // EMPLOYEE
    let fName = req.body.fname
    let lName = req.body.lname
    let mName = req.body.mname
    let phone = req.body.phonenum
    let hdate = req.body.hdate

    let imstat = req.body.imstat
    let ssn = req.body.ssn
    let salary = req.body.salary
    let department = req.body.depart
    let position = req.body.position
    let empId = req.body.empId

    var sql = "INSERT INTO Employee(" + 
    "Emp_id" + "," +
    "Fname" + "," +
    "Mname" + "," +
    "Lname" + "," + 
    "Phone"  + "," +
    "Hire_Date"  + "," + 
    "Immigration_Status"  + "," +
    "SSN"  + "," + 
    "Salary"  + "," +
    "Department"  + "," +
    "Position" + ")" + 
    "VALUES(" + 
    "'" + empId + "'" + "," + 
    "'" + fName + "'" + "," +
    "'" + mName + "'" + "," +
    "'" + lName + "'" + "," +
    "'" + phone + "'" + "," +
    "'" + hdate + "'" + "," +
    "'" + imstat + "'" + "," +
    "'" + ssn + "'" + "," +
    "'" + salary + "'" + "," +
    "'" + department + "'" + "," +
    "'" + position + "'" +
    ")"
    
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted")
    })
    console.log(sql)
    res.send(sql)

})
app.post("/employee/search", function(req, res) {
    var query = "SELECT "
    var query2 = " FROM Employee WHERE "

    let fName = req.body.fname
    let lName = req.body.lname
    let mName = req.body.mname
    let phone = req.body.phonenum
    let hdate = req.body.hdate

    let imstat = req.body.imstat
    let ssn = req.body.ssn
    let salary = req.body.salary
    let department = req.body.depart
    let position = req.body.position
    let empId = req.body.empId

    if (fName == "" && lName == "" && mName == "" && phone == "" && hdate == "" && imstat == "" && ssn == "" && salary == "" && department == "" && position == "" && empId == "") {
        query = query + ("*")
        query2 = query2.slice(1,17)
    }


    if (fName != "") {
        // console.log("found fname!!!")
        query = query + ( "," + "Fname")
        query2 = query2 + ("AND" + "Fname = " + "'" + fName + "'")
    }
    if (lName != "") {
        query = query + ("," +"Lname")
        query2 = query2 +("AND" + "Lname = " + "'" + lName + "'")

    }
    if (mName != "") {
        query = query + ("," +"Mname")
        query2 = query2 +("AND" + "Mname = " + "'" + mName + "'")

    }
    if (phone != "") {
        query = query + ("," +"Phone")
        query2 = query2 +("AND" + "Phone = " + "'" + phone + "'")

    }
    if (hdate != "") {
        query = query + ("," +"Hire_Date")
        query2 = query2 + ("AND" + "Hire_Date = " + "'" + hdate + "'")

    }
    if (imstat != "") {
        query = query + ("," +"Immigration_Status")
        query2 = query2 + ("AND" + "Immigration_Status = " + "'"+ imstat + "'")

    }
    if (ssn != "") {
        query = query + ("," +"SSN")
        query2 = query2 +("AND" + "SSN = " + "'" + ssn + "'")

    }
    if (salary != "") {
        query = query + ("," +"Salary")
        query2 = query2 +("AND" + "Salary = " + "'" + salary + "'")

    }
    if (department != "") {
        query = query + ("," +"Department")
        query2 = query2 +("AND" + "Department = " + "'" + department + "'")

    }
    if (position != "") {
        query = query + ("," +"Position")
        query2 = query2 +("AND" + "Position = " + "'" + position + "'")

    }
    if (empId != "") {
        query = query + ("," +"Emp_id")
        query2 = query2 +("AND" + "Emp_Id = " + "'" + empId + "'")
    }

    query = query.replace(',', '');
    query2 = query2.replace(/AND/i, '');

    query = query + query2
    
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("search successful")
        // res.send(query + result)
        // res.send(JSON.stringify(result));
        res.type('json').send(JSON.stringify(result, null, 2) + '\n');

    })

    console.log(query)
    
})
app.post("/employee/update", function(req, res) {

    var query = "UPDATE "
    var query2 = " EMPLOYEE "

    let fName = req.body.fname
    let lName = req.body.lname
    let mName = req.body.mname
    let phone = req.body.phonenum
    let hdate = req.body.hdate

    let imstat = req.body.imstat
    let ssn = req.body.ssn
    let salary = req.body.salary
    let department = req.body.depart
    let position = req.body.position
    let empId = req.body.empId

    if (fName != "") {
        // console.log("found fname!!!")
        query = query + ( "," + "Fname")
        query2 = query2 + ("AND" + "Fname = " + "'" + fName + "'")
    }
    if (lName != "") {
        query = query + ("," +"Lname")
        query2 = query2 +("AND" + "Lname = " + "'" + lName + "'")

    }
    if (mName != "") {
        query = query + ("," +"Mname")
        query2 = query2 +("AND" + "Mname = " + "'" + mName + "'")

    }
    if (phone != "") {
        query = query + ("," +"Phone")
        query2 = query2 +("AND" + "Phone = " + "'" + phone + "'")

    }
    if (hdate != "") {
        query = query + ("," +"Hire_Date")
        query2 = query2 + ("AND" + "Hire_Date = " + "'" + hdate + "'")

    }
    if (imstat != "") {
        query = query + ("," +"Immigration_Status")
        query2 = query2 + ("AND" + "Immigration_Status = " + "'"+ imstat + "'")

    }
    if (ssn != "") {
        query = query + ("," +"SSN")
        query2 = query2 +("AND" + "SSN = " + "'" + ssn + "'")

    }
    if (salary != "") {
        query = query + ("," +"Salary")
        query2 = query2 +("AND" + "Salary = " + "'" + salary + "'")

    }
    if (department != "") {
        query = query + ("," +"Department")
        query2 = query2 +("AND" + "Department = " + "'" + department + "'")

    }
    if (position != "") {
        query = query + ("," +"Position")
        query2 = query2 +("AND" + "Position = " + "'" + position + "'")

    }
    if (empId != "") {
        query = query + ("," +"Emp_id")
        query2 = query2 +("AND" + "Emp_Id = " + "'" + empId + "'")
    }

    query = query.replace(',', '');
    query2 = query2.replace(/AND/i, '');

    query = query + query2
    
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("search successful")
        // res.send(query + result)
        res.send(JSON.stringify(result));
    })

    console.log(query)

})
app.post("/employee/delete", function(req, res) {
    var query2 = "Delete FROM Employee WHERE "

    let fName = req.body.fname
    let lName = req.body.lname
    let mName = req.body.mname
    let phone = req.body.phonenum
    let hdate = req.body.hdate

    let imstat = req.body.imstat
    let ssn = req.body.ssn
    let salary = req.body.salary
    let department = req.body.depart
    let position = req.body.position
    let empId = req.body.empId

    if (fName != "") {
        
        query2 = query2 + ("AND" + "Fname = " + "'" + fName + "'")
    }
    if (lName != "") {
        query2 = query2 +("AND" + "Lname = " + "'" + lName + "'")

    }
    if (mName != "") {
        query2 = query2 +("AND" + "Mname = " + "'" + mName + "'")

    }
    if (phone != "") {
        query2 = query2 +("AND" + "Phone = " + "'" + phone + "'")

    }
    if (hdate != "") {
        query2 = query2 + ("AND" + "Hire_Date = " + "'" + hdate + "'")

    }
    if (imstat != "") {
        query2 = query2 + ("AND" + "Immigration_Status = " + "'"+ imstat + "'")

    }
    if (ssn != "") {
        query2 = query2 +("AND" + "SSN = " + "'" + ssn + "'")

    }
    if (salary != "") {
        query2 = query2 +("AND" + "Salary = " + "'" + salary + "'")

    }
    if (department != "") {
        query2 = query2 +("AND" + "Department = " + "'" + department + "'")

    }
    if (position != "") {
        query2 = query2 +("AND" + "Position = " + "'" + position + "'")

    }
    if (empId != "") {
        query2 = query2 +("AND" + "Emp_Id = " + "'" + empId + "'")
    }

    query2 = query2.replace(/AND/i, '');
    
    con.query(query2, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("delete successful")
        res.send(JSON.stringify(result));
    })

    console.log(query2)
})


app.post("/department/add", function(req, res) {
    let depNo = req.body.dnum
    let depLoc = req.body.loc
    let depName = req.body.depName
    let depSku = req.body.depSku

    var sql = "INSERT INTO Department(" + 
    "Number" + "," +
    "Location" + "," +
    "Name" + "," +
    "depSku" + ")" +
    "VALUES(" + 
    "'" + depNo + "'" + "," + 
    "'" + depLoc + "'" + "," +
    "'" + depName + "'" + "," +
    "'" + depSku + "'" +
    ")"

    console.log(sql)

    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted")
    })
    res.send(sql)
})
app.post("/department/search", function(req, res) {
    var query = "SELECT "
    var query2 = " FROM DEPARTMENT WHERE "

    let depNo = req.body.dnum
    let depLoc = req.body.loc
    let depName = req.body.depName
    let depSku = req.body.depSku

    if (depNo == "" && depLoc == "" && depName == "" && depSku == "") {
        query = query + ("*")
        query2 = query2.slice(1,17)
    }

    if (depNo != "") {
        query = query + ( "," + "Number")
        query2 = query2 + ("AND" + "Number = " + "'" + depNo + "'")
    }
    if (depLoc!= "") {
        query = query + ("," +"Location")
        query2 = query2 +("AND" + "Location = " + "'" + depLoc + "'")

    }
    if (depName != "") {
        query = query + ("," +"Name")
        query2 = query2 +("AND" + "Name = " + "'" + depName + "'")

    }
    if (depSku != "") {
        query = query + ("," +"depSku")
        query2 = query2 +("AND" + "depSku = " + "'" + depSku + "'")

    }

    query = query.replace(',', '');
    query2 = query2.replace(/AND/i, '');

    query = query + query2
    
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("search successful")
        // res.send(query + result)
        // res.send(JSON.stringify(result));
        // res.json(result)
        res.type('json').send(JSON.stringify(result, null, 2) + '\n');

    })

    console.log(query)
})
app.post("/department/update", function(req, res) {

})
app.post("/department/delete", function(req, res) {
var query2 = "Delete FROM Department WHERE "

let depNo = req.body.dnum
let depLoc = req.body.loc
let depName = req.body.depName
let depSku = req.body.depSku

if (depNo != "") {
    
    query2 = query2 + ("AND" + "Number = " + "'" + depNo + "'")
}
if (depLoc != "") {
    query2 = query2 +("AND" + "Location = " + "'" + depLoc + "'")

}
if (depName != "") {
    query2 = query2 +("AND" + "Name = " + "'" + depName + "'")

}
if (depSku != "") {
    query2 = query2 +("AND" + "depSku = " + "'" + depSku + "'")

}

query2 = query2.replace(/AND/i, '');

con.query(query2, function (err, result) {
    if (err) {
        throw err;
    }
    console.log("delete successful")
    // res.send(query + result)
    res.send(JSON.stringify(result));
})

console.log(query2)
})


app.post("/product/add", function(req, res) {
   
    let prodSku = req.body.skuNum
    let prodName = req.body.prodName

    var sql = "INSERT INTO Product(" + 
    "Sku_num" + "," +
    "product_name" + ")" +
    "VALUES(" + 
    "'" + prodSku + "'" + "," + 
    "'" + prodName + "'" + 
    ")"  

    console.log(sql)

    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted")
    })
    res.send(sql)
})
app.post("/product/search", function(req, res) {

    var query = "SELECT "
    var query2 = " FROM Product WHERE "

    let prodSku = req.body.skuNum
    let prodName = req.body.prodName

    if (prodSku == "" && prodName == "") {
        query = query + ("*")
        query2 = query2.slice(1,17)
    }

    if (prodSku != "") {
        query = query + ( "," + "Sku_num")
        query2 = query2 + ("AND" + "Sku_num = " + "'" + prodSku + "'")
    }
    if (prodName!= "") {
        query = query + ("," +"product_name")
        query2 = query2 +("AND" + "product_name = " + "'" + prodName + "'")

    }

    query = query.replace(',', '');
    query2 = query2.replace(/AND/i, '');

    query = query + query2
    
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("search successful")
        // res.send(query + result)
        // res.send(JSON.stringify(result));
        // res.json(result)
        res.type('json').send(JSON.stringify(result, null, 2) + '\n');

    })

    console.log(query)
})
app.post("/product/update", function(req, res) {

})
app.post("/product/delete", function(req, res) {
var query2 = "Delete FROM Product WHERE "

let prodSku = req.body.skuNum
let prodName = req.body.prodName

if (prodSku != "") {
    
    query2 = query2 + ("AND" + "Sku_num = " + "'" + prodSku + "'")
}
if (prodName != "") {
    query2 = query2 +("AND" + "product_name = " + "'" + prodName + "'")

}

query2 = query2.replace(/AND/i, '');


con.query(query2, function (err, result) {
    if (err) {
        throw err;
    }
    console.log("delete successful")
    // res.send(query + result)
    res.send(JSON.stringify(result));
})

console.log(query2)
})


app.post("/order/add", function(req, res) {

    let orderSku = req.body.pSku
    let accNum = req.body.accNum
    let numCases = req.body.nCase
    let dateOrdered = req.body.dateOrdered
    let deliveryDate = req.body.dDate
    let cost = req.body.cost
    let orderNum = req.body.orderNo

    var sql = "INSERT INTO Orders(" + 
    "Order_num" + "," +
    "p_sku" + "," +
    "Account_Number" + "," + 
    "num_ofCases"  + "," +
    "Date_Ordered"  + "," + 
    "Delivery_Date"  + "," + 
    "Cost"  + ")" +
    "VALUES(" + 
    "'" + orderNum + "'" + "," + 
    "'" + orderSku + "'" + "," +
    "'" + accNum + "'" + "," +
    "'" + numCases + "'" + "," +
    "'" + dateOrdered + "'" + "," +
    "'" + deliveryDate + "'" + "," +
    "'" + cost + "'" +
    ")"
    
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted")
    })
    console.log(sql)
    res.send(sql)
})
app.post("/order/search", function(req, res) {
    var query = "SELECT "
    var query2 = " FROM Orders WHERE "

    let orderSku = req.body.pSku
    let accNum = req.body.accNum
    let numCases = req.body.nCase
    let dateOrdered = req.body.dateOrdered
    let deliveryDate = req.body.dDate
    let cost = req.body.cost
    let orderNum = req.body.orderNo

    if (orderSku == "" && accNum == "" && numCases == "" && dateOrdered == "" && deliveryDate == "" && cost == "" && orderNum == "") {
        query = query + ("*")
        query2 = query2.slice(1,17)
    }


    if (orderSku != "") {
        query = query + ( "," + "p_sku")
        query2 = query2 + ("AND" + "p_sku = " + "'" + orderSku + "'")
    }
    if (accNum != "") {
        query = query + ("," +"Account_Number")
        query2 = query2 +("AND" + "Account_Number = " + "'" + accNum + "'")

    }
    if (numCases != "") {
        query = query + ("," +"num_ofCases")
        query2 = query2 +("AND" + "num_ofCases = " + "'" + numCases + "'")

    }
    if (dateOrdered != "") {
        query = query + ("," +"Date_Ordered")
        query2 = query2 +("AND" + "Date_Ordered = " + "'" + dateOrdered + "'")

    }
    if (deliveryDate != "") {
        query = query + ("," +"Delivery_Date")
        query2 = query2 + ("AND" + "Delivery_Date = " + "'" + deliveryDate + "'")

    }
    if (cost != "") {
        query = query + ("," +"Cost")
        query2 = query2 + ("AND" + "Cost = " + "'"+ cost + "'")

    }
    if (orderNum != "") {
        query = query + ("," +"Order_num")
        query2 = query2 +("AND" + "Order_num = " + "'" + orderNum + "'")

    }
    

    query = query.replace(',', '');
    query2 = query2.replace(/AND/i, '');

    query = query + query2
    
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("search successful")
        // res.send(query + result)
        // res.send(JSON.stringify(result));
        res.type('json').send(JSON.stringify(result, null, 2) + '\n');

    })

    console.log(query)
})
app.post("/order/update", function(req, res) {

})
app.post("/order/delete", function(req, res) {
var query2 = "Delete FROM Orders WHERE "

let orderSku = req.body.pSku
let accNum = req.body.accNum
let numCases = req.body.nCase
let dateOrdered = req.body.dateOrdered
let deliveryDate = req.body.dDate
let cost = req.body.cost
let orderNum = req.body.orderNo

if (orderSku != "") {
    
    query2 = query2 + ("AND" + "p_sku = " + "'" + orderSku + "'")
}
if (accNum != "") {
    query2 = query2 +("AND" + "Account_Number = " + "'" + accNum + "'")

}
if (numCases != "") {
    query2 = query2 +("AND" + "num_ofCases = " + "'" + numCases + "'")

}
if (dateOrdered != "") {
    query2 = query2 +("AND" + "Date_Ordered = " + "'" + dateOrdered + "'")

}
if (deliveryDate != "") {
    query2 = query2 + ("AND" + "Delivery_Date = " + "'" + deliveryDate + "'")

}
if (cost != "") {
    query2 = query2 + ("AND" + "Cost = " + "'"+ cost + "'")

}
if (orderNum != "") {
    query2 = query2 +("AND" + "Order_num = " + "'" + orderNum + "'")

}

query2 = query2.replace(/AND/i, '');


con.query(query2, function (err, result) {
    if (err) {
        throw err;
    }
    console.log("delete successful")
    // res.send(query + result)
    res.send(JSON.stringify(result));
})

console.log(query2)
})


app.post("/customer/add", function(req, res) {
    
    let customerAccNum = req.body.aNum 
    let customerName = req.body.cName
    let customerAdd = req.body.cAdd 

    var sql = "INSERT INTO Customer(" + 
    "Account_no" + "," +
    "Customer_name" + "," +
    "Customer_address" + ")" +
    "VALUES(" + 
    "'" + customerAccNum + "'" + "," + 
    "'" + customerName + "'" + "," +
    "'" + customerAdd + "'" +
    ")"
    
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted")
    })
    console.log(sql)
    res.send(sql)
})
app.post("/customer/search", function(req, res) {
    
        var query = "SELECT "
        var query2 = " FROM Customer WHERE "
    
        let customerAccNum = req.body.aNum 
        let customerName = req.body.cName
        let customerAdd = req.body.cAdd 
    
        if (customerAccNum  == "" && customerName == "" && customerAdd == "") {
            query = query + ("*")
            query2 = query2.slice(1,17)
        }
    
    
        if (customerAccNum != "") {
            query = query + ( "," + "Account_no")
            query2 = query2 + ("AND" + "Account_no = " + "'" + customerAccNum + "'")
        }
        if (customerName != "") {
            query = query + ("," +"Customer_name")
            query2 = query2 +("AND" + "Customer_name = " + "'" + customerName + "'")
    
        }
        if (customerAdd != "") {
            query = query + ("," +"Customer_address")
            query2 = query2 +("AND" + "Customer_address = " + "'" + customerAdd + "'")
    
        }
    
        query = query.replace(',', '');
        query2 = query2.replace(/AND/i, '');
    
        query = query + query2
        
        con.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("search successful")
            // res.send(query + result)
            // res.send(JSON.stringify(result));
            res.type('json').send(JSON.stringify(result, null, 2) + '\n');
    
        })
    
        console.log(query)
})
app.post("/customer/update", function(req, res) {

})
app.post("/customer/delete", function(req, res) {
var query2 = "Delete FROM Customer WHERE "

let customerAccNum = req.body.aNum 
let customerName = req.body.cName
let customerAdd = req.body.cAdd 

if (customerAccNum != "") {
   
    query2 = query2 + ("AND" + "Account_no = " + "'" + customerAccNum + "'")
}
if (customerName != "") {
    query2 = query2 +("AND" + "Customer_name = " + "'" + customerName + "'")

}
if (customerAdd != "") {
    query2 = query2 +("AND" + "Customer_address = " + "'" + customerAdd + "'")

}

query2 = query2.replace(/AND/i, '');

con.query(query2, function (err, result) {
    if (err) {
        throw err;
    }
    console.log("delete successful")
    // res.send(query + result)
    res.send(JSON.stringify(result));
})

console.log(query2)
})


app.get("/", urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000)
