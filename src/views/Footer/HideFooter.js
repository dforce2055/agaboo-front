export const hideFooter = () => {
    //Evento para scroll
    var lastScrollTop = 0;
    document.addEventListener("scroll", function () {
        var st = document.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            console.log("SCROLL DOWN");
            document.getElementsByClassName('footer')[0].classList.remove('fadeOut');
            document.getElementsByClassName('footer')[0].classList.add('fadeInd');
        } else {
            console.log("SCROLL UP");

        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);



    //Evento para inputs
    const inputs = document.getElementsByTagName('input')

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function () {
            console.log("Apreto un input");
            document.getElementsByClassName('footer')[0].classList.remove('fadeIn');
            document.getElementsByClassName('footer')[0].classList.add('fadeOut');
        });
    }

}