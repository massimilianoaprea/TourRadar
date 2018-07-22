'use strict';

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "https://api.myjson.com/bins/6iv3y",
        dataType: "JSON",
        success: (function (data, textStatus, jqXHR) {

            var origin = JSON.parse(JSON.stringify(data));
            var boxes = '';

            var heart = '<svg viewBox="0 0 13.229167 11.643288" height="100%" width="100%">' +
                        '  <g transform="translate(-68.610277,-162.06365)">' +
                        '    <g  transform="matrix(0.2246567,0,0,0.2246567,48.920085,135.28061)" >' +
                        '      <path d="m 113.95582,169.86398 c -9.78701,-4.98054 -20.033904,-15.74655 -23.705075,-24.90598 -1.971718,-4.91936 -2.673819,-10.39487 -1.774571,-13.83944 1.538081,-5.8916 6.152255,-10.27863 12.102306,-11.50654 2.51623,-0.51927 4.03701,-0.52467 6.4273,-0.0228 2.86524,0.60157 5.44883,2.01324 7.80581,4.26509 1.12342,1.0733 2.13518,1.95146 2.24836,1.95146 0.11318,0 1.15136,-0.90341 2.30708,-2.00757 6.54447,-6.25255 16.20406,-6.04219 22.49851,0.48996 4.37615,4.54141 5.28824,10.90181 2.69049,18.76189 -2.59514,7.85219 -10.06033,17.12936 -18.85061,23.42607 -2.84834,2.04035 -7.66393,4.57505 -8.67956,4.56851 -0.41782,-0.003 -1.79933,-0.53396 -3.07004,-1.18062 z M 87.645726,134.93386 c -0.0012,-1.01864 0.04569,-1.46778 0.104138,-0.99808 0.05845,0.46969 0.05941,1.30313 0.0021,1.85208 -0.05728,0.54895 -0.105099,0.16465 -0.106273,-0.854 z m 58.735364,0.1323 c 0,-0.94589 0.048,-1.33284 0.10672,-0.8599 0.0587,0.47294 0.0587,1.24685 0,1.71979 -0.0587,0.47295 -0.10672,0.086 -0.10672,-0.85989 z" style="fill:rgba(128,128,128,0.7);stroke:white;stroke-width:2"/>' +
                        '    </g>' +
                        '  </g>' +
                        '</svg>';

            origin.forEach( function (element, index) {
                if(element.dates.length>0 && element.images.length>0){
                    var box = '<div class="box">'+
                        '	<div style="background-image: url(' + (element.images.length > 0 ? element.images[0].url : '') + ')" class="tour-image">' +
                        '   <div class="heart">'+heart+'</div>' +
                        '   </div>'+
                        '	<div class="box-container">'+
                        '		<div class="triangle">'+
                        '			<span>'+getMinimumPrice(element.dates).minDiscount+'</span>'+
                        '		</div>'+
                        '		<section id="main">'+
                        '			<div class="content">'+
                        '				<h3>' + element.name + '</h3>'+
                        '				<div class="rating">'+
                        '					' + getRating(element.rating) + ''+
                        '					<span>' + element.reviews + ' reviews</span>'+
                        '				</div>'+
                        '				<p class="description">"' + element.description.substr(0, 85) + '..."</p>'+
                        '				<section class="details">'+
                        '					<div class="detail-row">'+
                        '						<span class="detail-label">destinations</span>'+
                        '						<span class="detail-description">' + element.cities.length + '</span>'+
                        '					</div>'+
                        '					<div class="detail-row">'+
                        '						<div class="detail-label"><span>starts/ends in</span></div>'+
                        '						<div class="detail-description"><span>'+getFirstLastCity(element.cities).first+' / '+getFirstLastCity(element.cities).last+'</span></div>'+
                        '					</div>'+
                        '					<div class="detail-row">'+
                        '						<div class="detail-label"><span>operator</span></div>'+
                        '						<div class="detail-description"><span>' + element.operator_name + '</span></div>'+
                        '					</div>'+
                        '				</section>'+
                        '			</div>'+
                        '		</section>'+
                        '		<section id="availabilities">'+
                        '			<div class="content">'+
                        '				<dl class="offers">'+
                        '					<dt class="mobile text-left">Day</dt>'+
                        '					<dt class="regular text-right">From</dt>'+
                        '					<dd class="mobile text-left">' + element.length + '</dd>'+
                        '					<dd class="regular text-right">€ ' + getMinimumPrice(element.dates).minPrice.toLocaleString('en') + '</dd>'+
                        '				</dl>'+
                        '				<dl class="offers">'+
                        '					<dd class="text-right">' + element.length + '</dd>'+
                        '					<dt class="text-left">&nbsp;days</dt>'+
                        '				</dl>'+
                        '				<div class="day-availability">'+
                        '					<div class="day">' + (element.dates[0] ? moment(element.dates[0].start).format('ll') : 'no date available') + '</div>'+
                        '					<div class="availability">' + (element.dates[0] ? element.dates[0].availability + ' spaces left' : 'no availability') + '</div>'+
                        '				</div>'+
                        '				<div class="day-availability">'+
                        '					<div class="day">' + (element.dates[0] ? moment(element.dates[1].start).format('ll') : 'no date available') + '</div>'+
                        '					<div class="availability">' + (element.dates[1] ? element.dates[1].availability + ' spaces left' : 'no availability') + '</div>'+
                        '				</div>'+
                        '				<div id="confirm">'+
                        '					<button class="btn btn-more">View more</button>'+
                        '				</div>'+
                        '			</div>'+
                        '		</section>'+
                        '	</div>'+
                        '</div>';

                    boxes+=box;
                }

            });

            $('.main-container').append(boxes);
        }),
        error: function (e) {
            alert('An error occurred');
        }
    });

    function getFirstLastCity(list) {
        var size = list.length;
        var toReturn = {};

        toReturn.first = list[0].name;
        toReturn.last = list[size-1].name;

        return toReturn;
    }

    function getMinimumPrice (list) {
        if(list.length===0){
            return {};
        }
        var minPrice = list[0].eur ? list[0].eur : 100000000000;
        var minDiscount = list[0].discount ? parseInt(list[0].discount.replace('%', '')) : 0;
        var toReturn = {};

        for(var i=1; i<list.length; i++){
            if(list[i].eur <= minPrice){
                minPrice = list[i].eur;
                if(list[i].discount && parseInt(list[i].discount.replace('%', ''))>minDiscount){
                    minDiscount=list[i].discount;
                }
            }
        }

        toReturn.minPrice = minPrice;
        toReturn.minDiscount = minDiscount>0 ? '-'+minDiscount+'%' : '';

        return toReturn;
    };

    function getRating (rating) {
        var full = Math.floor(rating);
        var partial = rating-full;
        var empty = Math.floor(5-rating);
        var toReturn = '';

        for(var i=0; i<full; i++){
            toReturn += '<div class="rating-star">'+
                '	  <svg'+
                '		xmlns:svg="http://www.w3.org/2000/svg"'+
                '		xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 26.458331 25.266975" height="100%" width="100%">'+
                '		<defs id="defs2"/>'+
                '		<metadata/>'+
                '		<g transform="translate(-11.631861,-158.89823)" >'+
                '		  <g transform="matrix(0.06584011,0,0,0.06584011,11.694087,158.36315)" fill="none">'+
                '			<g  fill="none">'+
                '			  <path stroke="#F3B562" stroke-width="2" d="m191.173 9.905c-9.847 3.401-10.606 4.601-37.618 59.473l-24.743 50.263-54.156 7.832c-67.302 9.734-65.48 9.191-71.863 21.409-7.893 15.108-4.913 21.13 24.869 50.258 13.111 12.823 31.348 30.75 40.526 39.837L84.876 255.5 75.454 310c-5.182 29.975-9.429 55.431-9.438 56.568-0.077 9.951 8.498 21.072 18.484 23.975 10.754 3.126 10.978 3.039 65.45-25.588C177.114 350.68 199.637 339 200 339c0.363 0 22.886 11.68 50.05 25.955 54.472 28.627 54.696 28.714 65.45 25.588 9.986-2.903 18.561-14.024 18.484-23.975-0.009-1.137-4.256-26.593-9.438-56.568l-9.422-54.5 16.688-16.523c9.178-9.087 27.415-27.014 40.526-39.837 29.636-28.985 32.587-34.864 25.072-49.945-6.07-12.181-6.074-12.182-72.066-21.724l-54.156-7.83-24.804-50.387C218.958 13.542 218.405 12.682 207.913 9.567 201.16 7.561 197.76 7.63 191.173 9.905" fill="#F3B562"/>'+
                '			</g>'+
                '		  </g>'+
                '		</g>'+
                '	  </svg>'+
                '</div>';
        }

        for(var i=0; i<partial; i++){
            toReturn += '<div class="rating-star">'+
                        '    <svg'+
                        '        xmlns:svg="http://www.w3.org/2000/svg"'+
                        '        xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 26.458331 25.266975" height="100%" width="100%">'+
                        '        <linearGradient id="halfGradient">'+
                        '          <stop stop-opacity="1" offset="'+(partial*100)+'%" stop-color="#F3B562"></stop>'+
                        '          <stop stop-opacity="0" offset="0"></stop>'+
                        '        </linearGradient>'+
                        '        <g transform="translate(-11.631861,-158.89823)" >'+
                        '           <g transform="matrix(0.06584011,0,0,0.06584011,11.694087,158.36315)" fill="none">'+
                        '                <g  fill="url(#halfGradient)"  >'+
                        '                    <path stroke="#F3B562" stroke-width="10"'+
                        '                                d="m191.173 9.905c-9.847 3.401-10.606 4.601-37.618 59.473l-24.743 50.263-54.156 7.832c-67.302 9.734-65.48 9.191-71.863 21.409-7.893 15.108-4.913 21.13 24.869 50.258 13.111 12.823 31.348 30.75 40.526 39.837L84.876 255.5 75.454 310c-5.182 29.975-9.429 55.431-9.438 56.568-0.077 9.951 8.498 21.072 18.484 23.975 10.754 3.126 10.978 3.039 65.45-25.588C177.114 350.68 199.637 339 200 339c0.363 0 22.886 11.68 50.05 25.955 54.472 28.627 54.696 28.714 65.45 25.588 9.986-2.903 18.561-14.024 18.484-23.975-0.009-1.137-4.256-26.593-9.438-56.568l-9.422-54.5 16.688-16.523c9.178-9.087 27.415-27.014 40.526-39.837 29.636-28.985 32.587-34.864 25.072-49.945-6.07-12.181-6.074-12.182-72.066-21.724l-54.156-7.83-24.804-50.387C218.958 13.542 218.405 12.682 207.913 9.567 201.16 7.561 197.76 7.63 191.173 9.905" />'+
                        '                </g>'+
                        '            </g>'+
                        '        </g>'+
                        '    </svg>'+
                        '</div>';
        }

        for(var i=0; i<empty; i++){
            toReturn += '<div class="rating-star">'+
                        '    <svg'+
                        '        xmlns:svg="http://www.w3.org/2000/svg"'+
                        '        xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 26.458331 25.266975" height="100%" width="100%">'+
                        '        <g transform="translate(-11.631861,-158.89823)" >'+
                        '            <g transform="matrix(0.06584011,0,0,0.06584011,11.694087,158.36315)" fill="none">'+
                        '                <g >'+
                        '                   <path stroke="#F3B562" stroke-width="10"'+
                        '                                d="m191.173 9.905c-9.847 3.401-10.606 4.601-37.618 59.473l-24.743 50.263-54.156 7.832c-67.302 9.734-65.48 9.191-71.863 21.409-7.893 15.108-4.913 21.13 24.869 50.258 13.111 12.823 31.348 30.75 40.526 39.837L84.876 255.5 75.454 310c-5.182 29.975-9.429 55.431-9.438 56.568-0.077 9.951 8.498 21.072 18.484 23.975 10.754 3.126 10.978 3.039 65.45-25.588C177.114 350.68 199.637 339 200 339c0.363 0 22.886 11.68 50.05 25.955 54.472 28.627 54.696 28.714 65.45 25.588 9.986-2.903 18.561-14.024 18.484-23.975-0.009-1.137-4.256-26.593-9.438-56.568l-9.422-54.5 16.688-16.523c9.178-9.087 27.415-27.014 40.526-39.837 29.636-28.985 32.587-34.864 25.072-49.945-6.07-12.181-6.074-12.182-72.066-21.724l-54.156-7.83-24.804-50.387C218.958 13.542 218.405 12.682 207.913 9.567 201.16 7.561 197.76 7.63 191.173 9.905" />'+
                        '                </g>'+
                        '            </g>'+
                        '        </g>'+
                        '    </svg>'+
                        ' </div>';
        }

        return toReturn;
    };

});