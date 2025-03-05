
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

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
    document.getElementById('experiences').scrollLeft += 20;
};
buttonLeft.onclick = function () {
    document.getElementById('gallery').scrollLeft -= 20;
};


