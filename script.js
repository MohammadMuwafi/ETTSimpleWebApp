// dummy list of employees.
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

// I used this function since the build-in function did not work with me.
sortList(employees);

var heading = document.querySelector(".heading");
var pageNumber = parseInt(heading.innerHTML.split(" ").slice(-1), 10);
var numberOfEmployees = employees.length;
var numberOfPages = Math.floor((numberOfEmployees + 7) / 8);
var pages = new Array(numberOfPages);
// handle the search feature.
const searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("input", (e) => searchAnEmployee(e.target.value));


fillListOfEmployees();

// the shuffle version of the employee list.
let shuffledListsOfEmployees = pages;

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

        // load employees to LocalStorage.
        window.localStorage.setItem("employees", JSON.stringify(employees));

        // add page number.
        window.localStorage.setItem("pageNumber", "1");

        // fill the 8 employees alphabetically.
        loadEmployeesOnPage(pages[0]);

    } else {
        // This is a page refresh

        console.log("INFO   [This is refreash page]");

        // update pageNumber in the title of the page.
        pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
        var heading = document.querySelector(".heading");
        heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";


        // shuffle the employees of the current page and fill them.
        shuffledListsOfEmployees[pageNumber - 1] = pages[pageNumber - 1]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        loadEmployeesOnPage(shuffledListsOfEmployees[pageNumber - 1]);

    }
}

// sort an employee list alphabetically based on name of employee.
function sortList(list) {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length; j++) {
            if (list[j].name > list[i].name) {
                var temp = list[j];
                list[j] = list[i];
                list[i] = temp;
            }
        }
    }
    console.log("INFO   [The employees are sorted]");
}

/**
 * load employees in page based on their 
 * order in passad list in the function.
 */
function loadEmployeesOnPage(listOfEmployee) {

    /** end store the max number of employees to be shown in single 
     *  page but the last page may contain less than 8 employees.
     */
    var end = 8;
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
    if (pageNumber == numberOfPages) {
        end = numberOfEmployees - (pageNumber - 1) * 8;
    }

    /**
     * if the ith employee in the page was exist ==> show it and 
     * fill its info., O.W hide the box of the ith employee.
     */

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
            "<h3>" + listOfEmployee[index].name + "</h3>"
        );
        employeeDescription.innerHTML = String(
            "<p>" + listOfEmployee[index].description + "</p>"
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


// recolor the box of the employee if his/her name is
// partially matched the entered name in the search bar.
function searchAnEmployee(searchTerm) {
    // the search feature works in the current page only.

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

// divide the employees to array, each array has only 8 or less of employees. 
function fillListOfEmployees() {
    var employee_cnt = 0;
    for (var i = 0; i < numberOfPages; i++) {
        var end = 8;
        if (i + 1 == numberOfPages && numberOfEmployees % 8 != 0) {
            pages[i] = new Array(numberOfEmployees - (i * 8));
            end = numberOfEmployees - (i * 8);
        } else {
            pages[i] = new Array(8);
        }

        for (var j = 0; j < end; j++, employee_cnt++) {
            pages[i][j] = employees[employee_cnt];
        }
    }
    console.log("INFO   [The employees are filled in their pages]");
}

// update page number and its content.
function updatePage(incOrDec) {
    // go to next page or previous page based on 
    // incOrDec var (+1 to next or -1 to previous) 

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

        loadEmployeesOnPage(pages[pageNumber - 1]);
        heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";
    }

    if (incOrDec > 0) {
        console.log("INFO   [Go to next page]")
    } else {
        console.log("INFO   [Go to previous page]")
    }
}

function sortRepresentedEmployees() {
    // if the button of "sort the employees" was pressed
    // then the employees will be sorted then filled again.

    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10) - 1;
    sortList(shuffledListsOfEmployees[pageNumber]);
    loadEmployeesOnPage(shuffledListsOfEmployees[pageNumber]);

    console.log("INFO   [The employees of this page were sorted]")
}

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

document.querySelector(".list-engineers-button").addEventListener("click", sortRepresentedEmployees);

function showInfo(num) {
    // this will show an alert (as popup msg) to show the info of certain employee.
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

function hireMe(num, status) {
    // if the button "hireMe" was pressed then the engineer become hired.  
    // if the button "fireMe" was pressed then the engineer become fired.

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

            employees[i].hiredOrNot = yesOrNo;
            localStorage.setItem("employees", JSON.stringify(employees));
        }
    }

    var end = 8;
    if (pageNumber == numberOfPages) {
        end = numberOfEmployees - (numberOfPages - 1) * 8;
    }
    for (var i = 0; i < end; i++) {
        if (employeeName.toLowerCase() == pages[pageNumber][i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == pages[pageNumber][i].description.toLowerCase()) {
            pages[pageNumber][i].hiredOrNot = yesOrNo;
        }
        if (employeeName.toLowerCase() == pages[pageNumber][i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == pages[pageNumber][i].description.toLowerCase()) {
            pages[pageNumber][i].hiredOrNot = yesOrNo;
        }
    }
}