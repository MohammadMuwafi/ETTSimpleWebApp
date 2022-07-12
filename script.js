/**
 * employees array
 * @type {Array<{name: string, description: string, hiredOrNot: string}>}
 */
var employees = [
    { name: 'Abd', description: 'Junior QA Engineer', hiredOrNot: 'No' },
    { name: 'Ahmad', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Ali', description: 'Junior DevOps Engineer', hiredOrNot: 'No' },
    { name: 'Ameer', description: 'Junior Frontend Engineer', hiredOrNot: 'No' },
    { name: 'Asem', description: 'Junior DevOps Engineer', hiredOrNot: 'No' },
    { name: 'Ayman', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Ayman2', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Aziz', description: 'Junior Backend Engineer', hiredOrNot: 'No' },

    { name: 'Baraa', description: 'Junior QA Engineer', hiredOrNot: 'No' },
    { name: 'Essa', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Fares', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Hasan', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Ibrahim', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Islam', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Jamal', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Jamel', description: 'Junior Backend Engineer', hiredOrNot: 'No' },

    { name: 'Khader', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Khalil', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Lith', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Mahmoud', description: 'Junior Sofware Engineer', hiredOrNot: 'No' },
    { name: 'Marwan', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Mazen', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Mohammad', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Momen', description: 'Junior Frontend Engineer', hiredOrNot: 'No' },

    { name: 'Mona', description: 'Senior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Motasem', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Mustafa', description: 'Junior Sofware Engineer', hiredOrNot: 'No' },
    { name: 'Omar', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Saleem', description: 'Senior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Salem', description: 'Junior QA Engineer', hiredOrNot: 'No' },
    { name: 'Tayseer', description: 'Junior Backend Engineer', hiredOrNot: 'No' },
    { name: 'Wael', description: 'Junior QA Engineer', hiredOrNot: 'No' },

    { name: 'Yazan', description: 'Junior Backend Engineer', hiredOrNot: 'No' }
];


var parity = 0;

/**
 * number of employees in the list of employees.
 * @type {number}
 */
var numberOfEmployees = employees.length;

/**
 * number of pages of employees.
 * @type {number}
 */
var numberOfPages = Math.floor((numberOfEmployees + 7) / 8);



/**
 * check if it was a reload page or refresh page.
 */
function checkRefresh() {
    //check for Navigation Timing API support
    if (window.performance) {
        console.log("INFO   [This app works properly on this browser]");
    } else {
        console.log("INFO   [This app cannot work properly on this browser due to window.performance]");
    }

    if (performance.navigation.type == 0) {
        // This is a fresh page load

        console.log("INFO   [This is relaod page]");
        window.localStorage.setItem("p", "1");


        // load employees to LocalStorage.
        window.localStorage.setItem("employees", JSON.stringify(employees));

        // add page number.
        window.localStorage.setItem("pageNumber", "1");

        // fill the 8 employees alphabetically.
        loadEmployeesOnPage(true, 1);

    } else {
        // This is a page refresh

        console.log("INFO   [This is refreash page]");

        getStatusOfEmployeesFromLocalStorage();

        // update pageNumber in the title of the page.
        pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
        var heading = document.querySelector(".heading");
        heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";

        loadEmployeesOnPage(false, pageNumber);
    }
}


/**
 * update the status hiring for each employee in the employees 
 * list by get the employees list that stored in LocalStorage. 
 */
function getStatusOfEmployeesFromLocalStorage() {
    employeesString = localStorage.getItem("employees").replaceAll("{", "").slice(1, -1).split("},");
    for (var i = 0; i < employeesString.length; i++) {
        hiringStatus = employeesString[i].split(",")[2];
        if (hiringStatus.toLowerCase().includes("yes")) {
            employees[i]['hiredOrNot'] = "Yes";
        }
    }
    console.log("INFO   [the status of hiring for each employees is updated]");
}


/**
 * sort an employees list alphabetically based on name of employee.
 * @param {Array<{name: string, description: string, hiredOrNot: string}>} list 
 */
function sortList(list) {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length; j++) {
            if (list[j]['name'] > list[i]['name']) {
                var temp = list[j];
                list[j] = list[i];
                list[i] = temp;
            }
        }
    }
    console.log("INFO   [The employees are sorted]");
}


/**
 * get a list of the employees of the current page (<= 8 employees)
 * @param {number} pageNumber - the number of current page (1-biasad form) 
 * @returns {Array<{name: string, description: string, hiredOrNot: string}>} - the employees that exist in the current page.
 */
function getEmployeesOfPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > numberOfPages) {
        console.log("INFO   [out of range page number]");
        return [];
    }

    var from = 0;
    var to = 0;

    if (pageNumber == 1) {
        to = 8;
    } else if (pageNumber == numberOfPages) {
        from = (numberOfPages - 1) * 8;
        to = numberOfEmployees;
    } else {
        from = (pageNumber - 1) * 8;
        to = pageNumber * 8;
    }

    listOfEmployee = [];
    for (var i = from; i < to; i++) {
        listOfEmployee.push(employees[i]);
    }

    console.log("INFO   [the employees of the current page were got]");

    return listOfEmployee;
}


/**
 * load employees in listOfEmployee in the current page based on their order in list.
 * @param {Array<{name: string, description: string, hiredOrNot: string}>} listOfEmployee 
 */
function loadEmployeesOnPage(loadSortedListOrNote, pageNumber) {

    listOfEmployee = getEmployeesOfPage(pageNumber);

    // shuffle the employees of the current page and fill them.
    if (loadSortedListOrNote == false) {
        listOfEmployee = listOfEmployee
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    } else {
        sortList(listOfEmployee);
    }

    // end store the max number of employees to be shown in single 
    // page but the last page may contain less than 8 employees.
    var end = 8;
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
    if (pageNumber == numberOfPages) {
        end = numberOfEmployees - (pageNumber - 1) * 8;
    }


    // if the ith employee in the page was exist ==> show it and 
    // fill its info., O.W hide the box of the ith employee.

    console.log(":::::::::::::", listOfEmployee);
    // this loop to show the ith employee (if exist)
    for (var index = 0; index < end; index++) {
        var i = index + 1;
        var employeeBox = document.querySelector("#b" + i.toString());
        if (employeeBox.style.display === 'none') {
            employeeBox.style.display = 'block';
        }
        var employeeName = document.querySelector(".name" + i.toString());
        var employeeDescription = document.querySelector(
            ".description" + i.toString()
        );

        employeeName.innerHTML = String(
            "<h3>" + listOfEmployee[index]['name'] + "</h3>"
        );
        employeeDescription.innerHTML = String(
            "<p>" + listOfEmployee[index]['description'] + "</p>"
        );
    }

    // this loop to hide the ith employee (if not exist)
    for (var index = end; index < 8; index++) {
        var i = index + 1;
        var employeeBox = document.querySelector("#b" + i.toString());
        employeeBox.style.display = "none";
    }

    console.log("INFO   [The employees are filled in the page]")
}



/**
 * search in the current page about the employee's name that matches 
 * parially the searchTerm and recoloer the box of the that employee 
 * @param {string} searchTerm 
 */
function searchAnEmployee(searchTerm) {

    // loop through employees in the page and see if there a matching.
    for (var index = 0; index < 8; index++) {
        var i = index + 1;
        var employeeName = document.querySelector(".name" + i.toString());
        var employeeBox = document.querySelector("#b" + i.toString());
        if (
            searchTerm.length &&
            employeeName.innerText.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            employeeBox.style.backgroundColor = rgb(197, 107, 107);
        } else {
            employeeBox.style.backgroundColor = "#7689DE";
        }
    }
    console.log("INFO   [The search process is finished]");
}



/**
 * update the content of the page as well as the page's number.
 * @param {number} incOrDec - +1 if goto the next page, -1 if goto the previous page. 
 * @returns - returns nothing, but it used to stop the function in case it was an edge page.
 */
function updatePage(incOrDec) {

    var heading = document.querySelector(".heading");
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);

    if (incOrDec > 0 && pageNumber == numberOfPages) {
        console.log("INFO   [No next page]")
        return;
    } else if (incOrDec < 0 && pageNumber == 1) {
        console.log("INFO   [No previous page]")
        return;
    } else {
        pageNumber = pageNumber + incOrDec;

        localStorage.setItem("pageNumber", pageNumber.toString());

        loadEmployeesOnPage(false, pageNumber);
        heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";
    }

    if (incOrDec > 0) {
        console.log("INFO   [Go to next page]")
    } else {
        console.log("INFO   [Go to previous page]")
    }
}



/**
 * if the button of "sort the employees" was pressed
 * then the employees will be sorted then filled again.
 */
function sortRepresentedEmployees() {
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10) - 1;
    loadEmployeesOnPage(true, pageNumber);

    console.log("INFO   [The employees of this page were sorted]")
}



/**
 * show an alert (as popup msg) to show the info of certain employee that his/her box is clicked.
 * @param {number} num - the number of box that contains the clicked engineer.
 */
function showInfo(num) {
    var employeeName = document.querySelector(".name" + num.toString()).textContent;
    var employeeDescription = document.querySelector(".description" + num.toString()).textContent;
    var employeeStatus = "Hired? ";
    for (var i = 0; i < numberOfEmployees; i++) {

        if (employeeName.toLowerCase() == employees[i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == employees[i].description.toLowerCase()) {

            employeeStatus += employees[i].hiredOrNot;
        }
    }
    alert("Name: " + employeeName + "\n" + "Job Description: " + employeeDescription + "\n" + employeeStatus);
    console.log("INFO   [An popup was shown certain employee]")
}


/**
 * if the button "hireMe" was pressed then the engineer become hired.
 * if the button "FireMe" was pressed then the engineer become fired.
 * @param {number} num - the number of box that contains the clicked engineer.
 * @param {Boolean} status - the status of engineer (hired or still not hired).
 */
function hireMe(num, status) {
    var employeeBox = document.querySelector("#b" + num.toString());
    var employeeName = document.querySelector(".name" + num.toString()).textContent;
    var employeeDescription = document.querySelector(".description" + num.toString()).textContent;
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);

    var yesOrNo = "No";
    if (status == true) {
        yesOrNo = "Yes";
    }

    for (var i = 0; i < numberOfEmployees; i++) {

        if (employeeName.toLowerCase() == employees[i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == employees[i].description.toLowerCase()) {
            employees[i]['hiredOrNot'] = yesOrNo;
        }
    }

    localStorage.setItem("employees", JSON.stringify(employees));
}


/**
 * get the color in rgb format.
 * @param {number} r - red color
 * @param {number} g - green color
 * @param {number} b - blue color
 * @returns {string} - color in rgb format
 */
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

// link updatePage function with back-button.
document.querySelector(".back-button").addEventListener("click", function() {
    updatePage(-1);
});

// link updatePage function with next-button.
document.querySelector(".next-button").addEventListener("click", function() {
    updatePage(+1);
});

// link sortRepresentedEmployees function with list-engineers-button.
document.querySelector(".list-engineers-button").addEventListener("click", sortRepresentedEmployees);

// link searchAnEmployee function with search-bar.
document.querySelector(".search-bar").addEventListener("input", (e) => searchAnEmployee(e.target.value));