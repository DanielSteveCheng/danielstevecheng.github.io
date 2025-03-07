window.addEventListener("load", setup)

class Experience {
    constructor(name, image, description) {
        this.name = name;
        this.image = image;
        this.description = description;
    }
}

async function setup() {
    let fileContents = await readExperiences();

    all_exp = createExpObjects(fileContents);
    all_length = all_exp.length;

    retrieve_DOM_references();
    addEventListeners();
    populateExp();
}

async function readExperiences() {
    return await fetch("static/resources/experiences.txt")
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
            } else if (keyAndValue[0] == "image") {
                image = keyAndValue[1];
            }
        } else {
            let exp = new Experience(expName, image, description);
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
    // pnc_ref = document.getElementById("PNC");
    // expItems = document.querySelectorAll(".exp");
    leftItem = document.getElementById("left");
    middleItem = document.getElementById("middle");
    rightItem = document.getElementById("right");
}

function addEventListeners() {
    // pnc_ref.addEventListener("mouseover", () => addExp(pnc_ref));
    // pnc_ref.addEventListener("mouseout", () => removeExp(pnc_ref));
    // expItems.forEach((exp) => {
    //     exp.addEventListener("mouseover", () => addExp(exp));
    //     exp.addEventListener("mouseout", () => removeExp(exp));
    // });

    leftListener = leftItem.addEventListener("click", () => rotateToLeft());
    rightListener = rightItem.addEventListener("click", () => rotateToRight());


}

function populateExp() {
    console.log(all_exp);
    let leftTitle = document.createElement("h1");
    let middleTitle = document.createElement("h1");
    let rightTitle = document.createElement("h1");

    let leftImg = document.createElement("img");
    let middleImg = document.createElement("img");
    let rightImg = document.createElement("img");

    let middleP = document.createElement("p");

    leftTitle.id = "left_h1";
    middleTitle.id = "middle_h1";
    rightTitle.id = "right_h1";

    leftImg.id = "left_img";
    middleImg.id = "middle_img";
    rightImg.id = "right_img";

    middleP.id = "middle_p";

    // leftItem.appendChild(leftImg);
    // middleItem.appendChild(middleImg);
    // rightItem.appendChild(rightImg);


    leftItem.appendChild(leftTitle);
    middleItem.appendChild(middleTitle);
    rightItem.appendChild(rightTitle);

    middleItem.appendChild(middleP);

    populateLeft(all_exp[0]);
    populateMiddle(all_exp[1]);
    populateRight(all_exp[2]);
    

}

function populateLeft(experience) {
    let leftTitle = document.getElementById("left_h1");
    leftTitle.innerHTML = experience.name + "<br>" + `<img src='./static/imgs/left.png' alt=''>`;
}

function populateRight(experience) {
    let rightTitle = document.getElementById("right_h1");
    rightTitle.innerHTML = experience.name + "<br>" + `<img src='./static/imgs/right.png' alt=''>`;
}

function populateMiddle(experience) {
    let middleTitle = document.getElementById("middle_h1");
    if (experience.image != "") {
        middleTitle.innerHTML = experience.name + `<img src='${experience.image}' alt=''>`;
    } else {
        middleTitle.innerHTML = experience.name;
    }

    // let middleImg = document.getElementById("middle_img");
    // middleImg.src = experience.image;

    let middleP = document.getElementById("middle_p")
    middleP.innerHTML = experience.description;
    // console.log(middleP.innerText);
}

counter = 0

function rotateToRight(){
    console.log("All_length: " + all_length);
    counter = (counter + 1) % (all_length);
    console.log(counter);

    populateLeft(all_exp[counter]);
    populateMiddle(all_exp[(counter+1)%(all_length)]);
    populateRight(all_exp[(counter+2)%(all_length)]);

}

function rotateToLeft(){
    counter -= 1;
    if (counter < 0) {
        counter = all_length - 1;
    }
    console.log(counter);

    populateLeft(all_exp[counter]);
    populateMiddle(all_exp[(counter+1)%(all_length)]);
    populateRight(all_exp[(counter+2)%(all_length)]);
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

// const buttonRight = document.getElementById('slideRight');
// const buttonLeft = document.getElementById('slideLeft');

// buttonRight.onclick = function () {
//     rotateToRight();
// };
// buttonLeft.onclick = function () {
//     rotateToLeft();
// };


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