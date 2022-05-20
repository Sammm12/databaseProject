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


app.post("/search", function(req, res) {
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
    // DEPARTMENT
    let depNo = req.body.dnum
    let depLoc = req.body.loc
    let depName = req.body.depName
    let depSku = req.body.depSku
    // PRODUCT
    let prodSku = req.body.skuNum
    let prodName = req.body.prodName
    // ORDER
    let orderSku = req.body.pSku
    let accNum = req.body.accNum
    let numCases = req.body.nCase
    let dateOrdered = req.body.dateOrdered
    let deliveryDate = req.body.deliveryDate
    let cost = req.body.cost
    //CUSTOMER
    let customerAccNum = req.body.aNum 
    let customerName = req.body.cName


    res.send(
        // "first name: " + fName +  +
        // "\n last name : " + lName +
        // "\n middle name: " + mName +
        // "\n phone: " + phone +
        // "\n hire date: " + hdate +
        // "\n immigration status: " + imstat +
        // "\n ssn: " + ssn +
        // "\n salary : " + salary +
        // "\n department: " + department +
        // "\n position : " + position 
    )     
    res.status(200)
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
    // // DEPARTMENT
    // let depNo = req.body.dnum
    // let depLoc = req.body.loc
    // let depName = req.body.depName
    // let depSku = req.body.depSku
    // // PRODUCT
    // let prodSku = req.body.skuNum
    // let prodName = req.body.prodName
    // // ORDER
    // let orderSku = req.body.pSku
    // let accNum = req.body.accNum
    // let numCases = req.body.nCase
    // let dateOrdered = req.body.dateOrdered
    // let deliveryDate = req.body.deliveryDate
    // let cost = req.body.cost
    // //CUSTOMER
    // let customerAccNum = req.body.aNum 
    // let customerName = req.body.cName

    let json = {
        "employee": {
            "fName": fName,
            "lName": lName,
            "mName:": mName,
            "phone": phone,
            "hdate": hdate,
            "imstat": imstat,
            "ssn": ssn,
            "salary": salary,
            "department": department,
            "position": position,
            "empId": empId
        }
        // "department": {
        //     "depNo": depNo,
        //     "depLoc": depLoc,
        //     "depName": depName,
        //     "depSku": depSku,
        // },
        // "product": {
        //     "productSku": prodSku,
        //     "prodName": prodName
        // },
        // "order": {
        //     "orderSku": orderSku,
        //     "accNum": accNum,
        //     "numCases": numCases,
        //     "dateOrdered": dateOrdered,
        //     "deliveryDate": deliveryDate,
        //     "cost": cost
        // },
        // "customer": {
        //     "customerAccNum": customerAccNum,
        //     "customerName": customerName
        // }
    }

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

})
app.post("/employee/update", function(req, res) {

})
app.post("/employee/delete", function(req, res) {

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

})
app.post("/department/update", function(req, res) {

})
app.post("/department/delete", function(req, res) {

})

app.post("/product/add", function(req, res) {
   
    let prodSku = req.body.skuNum
    let prodName = req.body.prodName

    var sql = "INSERT INTO Product(" + 
    "Sku#" + "," +
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

})
app.post("/product/update", function(req, res) {

})
app.post("/product/delete", function(req, res) {

})



app.post("/order/add", function(req, res) {

})
app.post("/order/search", function(req, res) {

})
app.post("/order/update", function(req, res) {

})
app.post("/order/delete", function(req, res) {

})


app.post("/customer/add", function(req, res) {

})
app.post("/customer/search", function(req, res) {

})
app.post("/customer/update", function(req, res) {

})
app.post("/customer/delete", function(req, res) {

})


app.get("/", urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/index.html")
})
// app.get("/search", function(req, res) {

//     console.log("i hit the /add endpoint!")

//     res.status(200)
    

// })




// con.connect(function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log("Connected!")
//     // con.query("SELECT * FROM Customer", function (err, result, fields) {
//     //     if (err) throw err;
//     //     console.log(result);
//     // });

//     app.post("/add", function(req, res) {
//             console.log("i hit the /add endpoint!")
//             res.status(200)
//     })

//     app.post("/delete", function(req, res) {

        
//     })

//     app.post("/update", function(req, res) {

        
//     })

//     app.post("/search", function(req, res) {
//         console.log("i hit the /search endpoint!")
//         res.status(200)
        
//     })


app.listen(3000)
