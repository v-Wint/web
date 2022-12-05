// problem 1
function changeDoc() {
    const nav = document.querySelector("nav");
    const section = document.querySelector("section");
    [nav.innerHTML, section.innerHTML] = [section.innerHTML, nav.innerHTML];
}
changeDoc();

article = document.querySelector("article");

//problem 2
function calcArea(a, h) {
    article.innerHTML += "Area of triangle: " + 0.5 * a * h;
}
let a = 4, h = 3;
calcArea(a, h);

//problem 3
function createNumForm() {
    numForm = document.createElement("form");
    numForm.name = "num-form";
    numForm.method = "GET";
    numForm.innerHTML += "Enter your numbers: ";
    for (let i = 0; i < 10; i++) {
        let input = document.createElement("input");
        input.type="number";
        input.size="5";
        numForm.appendChild(input);
    }
    let button = document.createElement("input");
    button.type = "button";
    button.value = "Click";
    button.onclick = calcMin;
    numForm.appendChild(button);
}

function calcMin() {
    let elements = numForm.elements;
    let min = elements[0];
    let n = 0;
    for (let i = 0, element; element = elements[i++];) {
        if (!element.value) {
            continue;
        }
        if (element.type == "number" && element.value < min) {
            min = element.value;
            n = 1;
        }
        else if (element.type == "number" && element.value == min) {
            n++;
        }
    }
    document.cookie = "nofmin=" + n + ";";
    alert ("The number of the lowest values is: " + n);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function loadCookies() {
    let n = getCookie("nofmin");
    if (n) {
        setTimeout(function() {
            alert("The number of the lowest values is: " + n + "\nClick OK to clear cookies");
            document.cookie = "nofmin=;";
            alert("Cookies are deleted.\nPress OK to rollback to initial state");
            window.location.reload();
        }, 200);

    } else {
        article.appendChild(numForm);
    }
}

createNumForm();

//problem 4
function saveColor() {
    let value = document.querySelector("#color");
    localStorage.setItem("color", value.value);
    value.value = "";
}

function loadColor() {
    let color = localStorage.getItem("color");
    article.style.color = color;
}


window.onload = function() {
    loadCookies();
    loadColor();
}

//problem 5
function addListListeners() {
    let tags = ["header", "aside", "article", "nav", "section", "footer"];
    tags.forEach(function(tag) {
        const block = document.querySelector(tag);
        block.ondblclick = function() {addListInput(block);}
    })
}

function addListInput(block) {
    form = document.getElementsByName("form-" + block.tagName)[0];
    if (form) {
        const input = document.createElement('input');
        input.type = "text";
        form.appendChild(input);
    } else {
        form = createListForm(block);
        const input = document.createElement('input');
        input.type = "text";
        form.appendChild(input);
    }
}

function createListForm(block) {
    const listForm = document.createElement('form');
    listForm.name = "form-" + block.tagName;
    listForm.method = "GET";
    listForm.style.width="50%";
    listForm.style.margin = "0 auto";
    listForm.style.display="flex";
    listForm.style.flexDirection="column";
    listForm.style.fontSize = "18px";
    listForm.innerHTML += "Enter elements of the list: ";

    const button = document.createElement('input');
    button.type = 'button';
    button.value = "Enter!";
    button.onclick = function () {createList(block, form);}
    listForm.appendChild(button);
    block.appendChild(listForm);
    return listForm
}

function createList(block, form) {
    let elements = form.elements;
    let values = [];
    for (let i = 0, element; element = elements[i++];) {
        if (element.type == "text" && element.value)
            values.push(element.value);
    }
    localStorage.setItem("list " + block.tagName, JSON.stringify(values));

    block.removeChild(form);
    addList(block);
}

function addList(block) {
    const values = JSON.parse(localStorage.getItem("list " + block.tagName));
    const list = document.createElement('ul');
    list.style.textAlign = "left";
    list.style.fontSize = "18px";
    list.innerHTML += "List: ";
    values.forEach(function (value) {
        const element = document.createElement('li');
        element.innerHTML += value;
        list.appendChild(element);
    });
    block.appendChild(list);    
}

function clearListInfo() {
    let tags = ["HEADER", "ASIDE", "ARTICLE", "NAV", "SECTION", "FOOTER"];
    tags.forEach(function(tag) {
        localStorage.removeItem("list " + tag);
    })
}

addListListeners();
clearListInfo();