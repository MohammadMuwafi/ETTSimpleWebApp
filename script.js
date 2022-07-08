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

fillListOfEmployees();

// the shuffle version of the employee list.
let shuffledListsOfEmployees = pages;

function checkRefresh() {
    // var pTag = document.querySelector("#test");
    // console.log(pTag.innerHTML, pTag.textContent);
    // if (pTag.innerHTML.length == '<p type="hidden" id="test"></p>'.length) {
    //     console.log(pTag);
    //     pTag.innerHTML = String(
    //         '<p type="hidden" id="test"> visited </p>'
    //     );
    // This is a fresh page load
    window.localStorage.setItem("employees", JSON.stringify(employees));

    // add page number.
    window.localStorage.setItem("pageNumber", "1");

    // fill the 8 employees alphabetically.
    // loadEmployeesOnPage(pages[0]);

    // } else {

    // This is a page refresh
    pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
    var heading = document.querySelector(".heading");
    heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";

    pageNumber -= 1;

    shuffledListsOfEmployees[pageNumber] = pages[pageNumber]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // fill the shuffled 8 employees.
    loadEmployeesOnPage(shuffledListsOfEmployees[pageNumber]);

    // }
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
}

// load employees in page based on their order in passad list in the function.
function loadEmployeesOnPage(listOfEmployee) {
    var end = 8;
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);
    if (pageNumber == numberOfPages) {
        end = numberOfEmployees - (pageNumber - 1) * 8;
    }

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

    for (var index = end; index < 8; index++) {
        var i = index + 1;
        var employeeBox = document.querySelector("#b" + i.toString());
        employeeBox.style.display = "none";
    }
}

// handle the search feature.
const searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("input", (e) => searchAnEmployee(e.target.value));

// recolor the box of the employee if his/her name is
// partially matched the entered name in the search bar.
function searchAnEmployee(searchTerm) {
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
}

// update page number and its content.
function updatePage(incOrDec) {
    var heading = document.querySelector(".heading");
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10);

    if (incOrDec > 0 && pageNumber == numberOfPages) {
        return;
    } else if (incOrDec < 0 && pageNumber == 1) {
        return;
    } else {
        pageNumber = pageNumber + incOrDec;
        console.log(pageNumber, numberOfPages, "??");

        localStorage.setItem("pageNumber", pageNumber.toString());

        loadEmployeesOnPage(pages[pageNumber - 1]);
        heading.innerHTML = '<h1 class="heading" id="heading">Engineers Page ' + pageNumber + "</h1>";
    }
}

function sortRepresentedEmployees() {
    var pageNumber = parseInt(localStorage.getItem("pageNumber"), 10) - 1;
    console.log(" B ==> ", shuffledListsOfEmployees[pageNumber]);
    sortList(shuffledListsOfEmployees[pageNumber]);
    console.log(" A ==> ", shuffledListsOfEmployees[pageNumber]);
    loadEmployeesOnPage(shuffledListsOfEmployees[pageNumber]);
}

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

document.querySelector(".back-button").addEventListener("click", function() {
    updatePage(-1);
});

document.querySelector(".next-button").addEventListener("click", function() {
    updatePage(+1);
});

document.querySelector(".list-engineers-button").addEventListener("click", sortRepresentedEmployees);

function showInfo(num) {
    var employeeName = document.querySelector(".name" + num.toString()).textContent;
    var employeeDescription = document.querySelector(".description" + num.toString()).textContent;
    var employeeStatus = "Hired? ";
    for (var i = 0; i < numberOfEmployees; i++) {
        console.log(employeeName.toLowerCase(), employees[i].name);

        if (employeeName.toLowerCase() == employees[i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == employees[i].description.toLowerCase()) {

            employeeStatus += employees[i].hiredOrNot;
        }
    }
    alert("Name: " + employeeName + "\n" + "Job Description: " + employeeDescription + "\n" + employeeStatus);
}

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
        console.log(employeeName.toLowerCase(), employees[i].name);

        if (employeeName.toLowerCase() == employees[i].name.toLowerCase() &&
            employeeDescription.toLowerCase() == employees[i].description.toLowerCase()) {

            employees[i].hiredOrNot = yesOrNo;
            localStorage.setItem("employees", JSON.stringify(employees));
            console.log(":", yesOrNo);
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