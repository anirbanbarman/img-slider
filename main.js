$(document).ready(function () {
    var size = 10;
    var heigth = 300;
    var width = 200;
    fetch('https://picsum.photos/list')
        .then(response => response.json())
        .then(json => {
            var range = json.length - size;
            var startingPoint = Math.floor((Math.random() * range) + 1);

            var items = json.slice(startingPoint, startingPoint + size);
            items.map(img => {
                img["imgUrl"] = `https://picsum.photos/${width}/${heigth}?image=${img.id}`
            });
            console.log(items, startingPoint);
            var slideCard = "";

            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                if (index == 0) {
                    slideCard += `<div class="slideitem current">
                    <div>${element.author}</div>
                                  <img src=${element.imgUrl}>
                                  </div>`;
                }
                else {
                    slideCard += `<div class="slideitem">
                    <div>${element.author}</div>
                    <img src=${element.imgUrl}>
                  </div>`;

                }

            }

            document.getElementById("slideshow").innerHTML = slideCard;

            var buttons = "<button class=\"slidebtn prev\"><</button><button class=\"slidebtn next\">></button\>";

            var slidesl = $('.slideitem').length
            var d = "<li class=\"dot active-dot\">&bull;</li>";
            for (var i = 1; i < slidesl; i++) {
                d = d + "<li class=\"dot\">&bull;</li>";
            }
            var dots = "<ul class=\"slider-dots\">" + d + "</ul\>";
            $("#slideshow > div:gt(0)").hide();


            $("#slideshow").append(dots).append(buttons);
            var interval = setInterval(slide, 3000);

            function intslide(func) {
                if (func == 'start') {
                    interval = setInterval(slide, 3000);
                } else {
                    clearInterval(interval);
                }
            }

            function slide() {
                sact('next', 0, 1200);
            }

            function sact(a, ix, it) {
                var currentSlide = $('.current');
                var nextSlide = currentSlide.next('.slideitem');
                var prevSlide = currentSlide.prev('.slideitem');
                var reqSlide = $('.slideitem').eq(ix);

                var currentDot = $('.active-dot');
                var nextDot = currentDot.next();
                var prevDot = currentDot.prev();
                var reqDot = $('.dot').eq(ix);

                if (nextSlide.length == 0) {
                    nextDot = $('.dot').first();
                    nextSlide = $('.slideitem').first();
                }

                if (prevSlide.length == 0) {
                    prevDot = $('.dot').last();
                    prevSlide = $('.slideitem').last();
                }

                if (a == 'next') {
                    var Slide = nextSlide;
                    var Dot = nextDot;
                }
                else if (a == 'prev') {
                    var Slide = prevSlide;
                    var Dot = prevDot;
                }
                else {
                    var Slide = reqSlide;
                    var Dot = reqDot;
                }

                currentSlide.fadeOut(it).removeClass('current');
                Slide.fadeIn(it).addClass('current');

                currentDot.removeClass('active-dot');
                Dot.addClass('active-dot');
            }

            $('.next').on('click', function () {
                debugger
                intslide('stop');
                sact('next', 0, 400);
                intslide('start');
            });//next

            $('.prev').on('click', function () {
                debugger
                intslide('stop');
                sact('prev', 0, 400);
                intslide('start');
            });//prev

            $('.dot').on('click', function () {
                debugger
                  intslide('stop');
                var index = $(this).index();
                sact('dot', index, 400);
                intslide('start');
            });//on dot click

        })
        .catch(err => console.log('Request Failed', err));



});



