window.addEventListener("load", setup)

class Experience {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

async function setup() {
    let fileContents = await readExperiences();

    all_exp = createExpObjects(fileContents);

    retrieve_DOM_references();
    addEventListeners();
}

async function readExperiences() {
    return await fetch(".static/resources/experiences.txt")
        .then(response => {
            return response.text();
        })
        .then(data => {
            return data.replaceAll("\t", "");
        })
}

function createExpObjects(fileContents) {
    let expList = [];
    let rawData = fileContents.split("\r\n");
    for (line of rawData) {
        if (line.trim()) {
            let keyAndValue = line.split(":");
            if (keyAndValue[0] == "name") {
                expName = keyAndValue[1];
                console.log(expName);
            } else if (keyAndValue[0] == "description") {
                description = keyAndValue[1];
            }
        } else {
            let exp = new Experience(expName, description);
            expList.push(exp);
        }
    }
    console.log(expList);
    console.log(expList[0].name)
    console.log(expList[1].name)
    console.log(expList[2].name)

    return expList;
}

function retrieve_DOM_references() {
    pnc_ref = document.getElementById("PNC");
    expItems = document.querySelectorAll(".exp")

}

function addEventListeners() {
    // pnc_ref.addEventListener("mouseover", () => addExp(pnc_ref));
    // pnc_ref.addEventListener("mouseout", () => removeExp(pnc_ref));
    expItems.forEach((exp) => {
        exp.addEventListener("mouseover", () => addExp(exp));
        exp.addEventListener("mouseout", () => removeExp(exp));
    });


}

function addExp(experience) {
    console.log(experience);
    experience.style.backgroundColor = "rgb(85, 151, 50)";
    console.log(all_exp);
    let element = document.getElementById("p"+experience.id);
    let title;
    for (let i = 0; i < all_exp.length; i++) {
        if (all_exp[i].name == experience.id) {
            console.log("Found!");
            title = document.createElement("h1")
            // desc = document.createElement("p");
            element.innerHTML = all_exp[i].description;
            // desc.innerHTML = all_exp[i].description;
            break;
        } else {
            console.log("Not it!");
        }
    }
    
    // desc.id = "p" + experience.id;
    
    
    
}

function removeExp(experience) {
    experience.style.backgroundColor = "rgb(9, 26, 0)";
    // let desc = document.getElementById("p" + experience.id);
    // desc.innerHTML = "";
}

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
    var container = document.getElementById('scrollmenu');
                scrollAmount = 0;
                var slideTimer = setInterval(function(){
                    container.scrollLeft += 30;
                    scrollAmount += 10;
                    if(scrollAmount >= 100){
                        window.clearInterval(slideTimer);
                    }
                }, 25);
};
buttonLeft.onclick = function () {

    var container = document.getElementById('scrollmenu');
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        container.scrollLeft -= 30;
        scrollAmount += 10;
        if(scrollAmount >= 100){
            window.clearInterval(slideTimer);
        }
    }, 25);
            
};


// For nav dots

const dots = document.querySelectorAll(".scroll_indicator a");

const removeActiveClass = () => {
    dots.forEach(dot => {
        dot.classList.remove("active");
    })
};

const addActiveClass = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log(entry.target.id);
            let currentDot = document.querySelector(
                `.scroll_indicator a[href="#${entry.target.id}"]`);
            removeActiveClass();
            currentDot.classList.add("active");
        }
    })
};

const options = {
    threshold: 0.8, 
};

const observer = new IntersectionObserver(addActiveClass, options);

const sections = document.querySelectorAll("section");

sections.forEach(section => {
    observer.observe(section);
});