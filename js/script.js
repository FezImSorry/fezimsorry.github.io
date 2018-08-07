$(document).ready(function() {

	var coll = document.getElementsByClassName("collapsible");
	var i;
	var pageSaver;
	var resumeFlag = true;

	var slideNum = $('.pageBody').length,
	wrapperWidth = 100 * slideNum,
	slideWidth = 100 / slideNum;

	var off = -(window.innerWidth / 2) + $('#homeLink').offset().left + ($('#homeLink').width()/2);

	var requestURL = 'https://fezimsorry.github.io/data/data.json';
	var request = new XMLHttpRequest();

	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	request.onload = function() {

		var data = request.response;
		populateProjects(data);

	}

	$('.highlight').css({'width' : $('#homeLink').width() + 'px'});
	$('.highlight').css({'left' : off + "px"});

	$('#homeLink').css({'border-bottom' : 'medium solid'});
	$('#homeLink').css({'border-bottom-color' : 'black'});
	//document.getElementById("homeLink").style.borderBottom = "solid";

	$('.horizontalScrollable').width(wrapperWidth + '%');
	$('.pageBody').width(slideWidth + '%'); 

	$('nav > a').click(function() {

	pageSaver = $(this);

	$('nav > a').removeClass('selected');
	$(this).addClass('selected');

	var slideNumber = $($(this).attr('href')).index('.pageBody'),
		margin = slideNumber * -100 + '%';

	if(document.getElementById("homeLink").style.borderBottom == "medium solid black" || document.getElementById("homeLink").style.borderBottom == "solid black") {
		$('.highlight').css({'width' : $('#homeLink').width() + 'px'});
		$('.highlight').css({'left' : -(window.innerWidth / 2) + $('#homeLink').offset().left + ($('#homeLink').width()/2) + "px"});
	}
	else if(document.getElementById("resumeLink").style.borderBottom == "medium solid black" || document.getElementById("resumeLink").style.borderBottom == "solid black") {
		$('.highlight').css({'width' : $('#resumeLink').width() + 'px'});
		$('.highlight').css({'left' : -(window.innerWidth / 2) + $('#resumeLink').offset().left + ($('#resumeLink').width()/2) + "px"});
	}
	else if (document.getElementById("projectsLink").style.borderBottom == "medium solid black" || document.getElementById("projectsLink").style.borderBottom == "solid black") {
		$('.highlight').css({'width' : $('#projectsLink').width() + 'px'});
		$('.highlight').css({'left' : -(window.innerWidth / 2) + $('#projectsLink').offset().left + ($('#projectsLink').width()/2) + "px"});
	}
	else if (document.getElementById("blogLink").style.borderBottom == "medium solid black" || document.getElementById("blogLink").style.borderBottom == "solid black") {
	  $('.highlight').css({'width' : $('#blogLink').width() + 'px'});
	  $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#blogLink').offset().left + ($('#blogLink').width()/2) + "px"});
	}

	$(".pageBody").css({'overflow-y': 'hidden'});
	$('#homeLink').css({'border-bottom' : 'none'});
	$('#resumeLink').css({'border-bottom' : 'none'});
	$('#projectsLink').css({'border-bottom' : 'none'});
	$('#blogLink').css({'border-bottom' : 'none'});
	//document.getElementById("homeLink").style.borderBottom = "none";
	//document.getElementById("resumeLink").style.borderBottom = "none";
	//document.getElementById("projectsLink").style.borderBottom = "none";
	//document.getElementById("blogLink").style.borderBottom = "none";

	$('.highlight').css({'opacity' : 1});

	$('.horizontalScrollable').animate({
		marginLeft: margin
	}, 1000, function() {
		$(".pageBody").css({'overflow-y': 'auto'});
	});

	$('.highlight').animate({
		left: -(window.innerWidth / 2) + $(this).offset().left + ($(this).width()/2),
		width: $(this).width(),
	}, 1000, function () {
		pageSaver.css({'border-bottom' : 'medium solid'});
		pageSaver.css({'border-bottom-color' : 'black'});
	  $('.highlight').css({'opacity' : 0});
	});

	if(resumeFlag)
		if($(this).attr('href') == "#resume") {
			resumeFlag = false;
	    	expandAll();
	  	}

	return false;

	});

	$(".name").click(function () {
		$(".name").fadeOut(function () {
	    	if ($(".name").text() == 'Faiz Ansari') {

		        if(window.innerWidth < 786){
		        	$(".name").text('فیض انصاری').fadeIn();
		        }
		        else {
		        	$(".name").text('محمد فیض الدین انصاری').fadeIn();
		        }

		        document.getElementById("fname").style.letterSpacing = "normal";
		        document.getElementById("fname").style.fontFamily = "Avenir Next";
	      	}
	      	else {

		        $(".name").text('Faiz Ansari').fadeIn();
		        document.getElementById("fname").style.letterSpacing = null;
		        document.getElementById("fname").style.fontFamily = null;
	      	}
		})
	})

	$(".resumeExpandOption").click(function () {

		if(checkCollapsed()) {
			expandAll();
		}
		else {

			$(".resumeExpandOption").text('Expand All');

			for (i = 0; i < coll.length; i++) {

		    	var content = coll[i].nextElementSibling;

		    	if (content.style.maxHeight) {
		    		coll[i].classList.toggle("active");
		        	content.style.maxHeight = null;
		        	content.style.opacity = null;
		        	content.style.marginBottom = null;
		    	}
		  	}
		}
	})

	for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	  
	  this.classList.toggle("active");
	  
	  var content = this.nextElementSibling;

	  if (content.style.maxHeight){
	    content.style.maxHeight = null;
	    content.style.opacity = null;
	    content.style.marginBottom = null;

	    if(checkCollapsed()){
	      $(".resumeExpandOption").text('Expand All');
	    }
	    else {
	      $(".resumeExpandOption").text('Collapse All');
	    }
	  } 
	  else {
	    content.style.maxHeight = content.scrollHeight + "px";
	    content.style.opacity = 1;
	    content.style.marginBottom = 45 + "px";

	    if(checkCollapsed()){
	      $(".resumeExpandOption").text('Expand All');
	    }
	    else {
	      $(".resumeExpandOption").text('Collapse All');
	    }
	  }
	});
	}

	function checkCollapsed(){
		var flag = true;
		var j;

		for (j = 0; j < coll.length; j++) {

			var content = coll[j].nextElementSibling;
		  
			if (content.style.maxHeight){
		    	flag = false;
		  	} else { 
		    	flag = true;
		    	break;
		  	}
		}

		return flag;
	}

	function expandAll() {

		$(".resumeExpandOption").text('Collapse All');

		var j;

		for (j = 0; j < coll.length; j++) {

		    var content = coll[j].nextElementSibling;
		    
		    if (!content.style.maxHeight) {

		    	coll[j].classList.toggle("active");         
		    	content.style.maxHeight = content.scrollHeight + "px";
		    	content.style.opacity = 1;
		    	content.style.marginBottom = 45 + "px";
		    }
		}
	}

	function populateProjects(jsonObj) {

		var projects = jsonObj['projects'];

		for(var i = 0; i <= projects.length; i++) {

			var projectContainer = document.createElement('div');
			var projectImageContainer = document.createElement('div');
			var projectInfoContainer = document.createElement('div');
			var projectPattern = document.createElement('img');
			var projectImage = document.createElement('img');
			var projectName = document.createElement('h2');
			var projectType = document.createElement('div');
			var projectDescription = document.createElement('p');
			var projectTags = document.createElement('div');
			var projectLinks = document.createElement('div');
			var projectSource = document.createElement('a');

			var projectTag = projects[i]['tags'].slice();

			if(i % 2 != 0) 
				projectPattern.src = "images/projright.png";
			else if (i % 2 == 0)
				projectPattern.src = "images/projleft.png";

			projectImage.src = projects[i].image;
			projectName.textContent = projects[i].name;
			projectType.textContent = projects[i].type + " - " + projects[i].field;
			projectDescription.innerHTML = projects[i].description;

			if(projects[i].source == null) {

			}
			else if(projects[i].source == "#"){
				projectSource.textContent = "To Be Uploaded";
				projectSource.className = "projectSource";	
			}			
			else {
				projectSource.textContent = " View Source";
				projectSource.href = projects[i].source;
				projectSource.target = "_blank";
				projectSource.className = "projectSource";
			}

			if(projects[i].result == null){

			}
			else if(projects[i].result == "#"){
				projectSource.textContent = "Coming Soon!";
				projectSource.className = "projectDemo";
			}
			else {
				projectSource.textContent = " View Results";
				projectSource.href = projects[i].result;
				projectSource.target = "_blank";
				projectSource.className = "projectDemo";
			}

			projectContainer.className = "projectContainer";
			projectImageContainer.className = "projecImageContainer";
			projectInfoContainer.className = "projectInfoContainer";
			projectPattern.className = "projectPattern";
			projectImage.className = "projectImage";
			projectName.className = "projectName";
			projectType.className = "projectType";
			projectDescription.className = "projectDescription";
			projectTags.className = "projectTags";
			projectLinks.className = "projectLinks";

			projectContainer.appendChild(projectImageContainer);
			projectContainer.appendChild(projectInfoContainer);
			projectImageContainer.appendChild(projectPattern);
			projectImageContainer.appendChild(projectImage);
			projectInfoContainer.appendChild(projectName);
			projectInfoContainer.appendChild(projectDescription);
			projectInfoContainer.appendChild(projectTags);
			projectInfoContainer.appendChild(projectLinks);
			projectName.appendChild(projectType);
			projectLinks.appendChild(projectSource);

			for(var j = 0; j < projectTag.length; j++) {

				projectTag[j] = document.createElement('div');
				projectTag[j].textContent = projects[i]['tags'][j];
				projectTag[j].className = "projectTag";
				projectTags.appendChild(projectTag[j]);
			}

			document.getElementById("projectsBody").appendChild(projectContainer);

		}
	}

  /*function updateWindow(){
      document.getElementById("innerBod").style.paddingLeft = (window.innerWidth - document.getElementById("resume").width());
      document.body.onclick=function(){
        document.getElementById("innerBod").style.paddingLeft = (window.innerWidth - document.getElementById("resume").width());
      }
    $('.highlight').css({'width' : 40 + 'px'});
    $('.highlight').css({'left' : pageSaver.offset().left - 20 + "px"});

  }
  //window.onload=updateWindow();
  //window.addEventListener("resize", updateWindow());
  //updateWindow();

    $(window).resize(function() {

    $('.resumeExpandOption').css({'color' : 'yellow'});
    $('.highlight').css({'left' : pageSaver.offset().left - 20 + "px"});

  }, 200);*/

/*
  var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
  })();

  var timerFlag = true;

  $(window).resize(function () {
      waitForFinalEvent(function(){

        if (pageSaver.attr('href') == "#resume") {
          $('.highlight').css({'width' : $('#resumeLink').width() + 40 + 'px'});
          $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#resumeLink').offset().left + ($('#resumeLink').width()/2) + "px"});
        }
        else if (pageSaver.attr('href') == "#projects") {
          $('.highlight').css({'width' : $('#projectsLink').width() + 40 + 'px'});
          $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#projectsLink').offset().left + ($('#projectsLink').width()/2) + "px"});
        }
        else if (pageSaver.attr('href') == "#blog") {
          $('.highlight').css({'width' : $('#blogLink').width() + 40 + 'px'});
          $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#blogLink').offset().left + ($('#blogLink').width()/2) + "px"});
        }
        else {
          $('.highlight').css({'width' : $('#homeLink').width() + 40 + 'px'});
          $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#homeLink').offset().left + ($('#homeLink').width()/2) + "px"});
        }

      }, 100, "some unique string");
  });  


  $(window).resize(function () {
      
    if(timerFlag) {

      timerFlag = false;
      setTimeout(function(){ timerFlag = true }, 5000);

      console.log(pageSaver);
      console.log(pageSaver.attr('href'));

      if (pageSaver === undefined || pageSaver.attr('href') == "#home") {
        $('.highlight').css({'width' : $('#homeLink').width() + 40 + 'px'});
        $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#homeLink').offset().left + ($('#homeLink').width()/2) + "px"});
      }
      else if (pageSaver.attr('href') == "#resume") {
        $('.highlight').css({'width' : $('#resumeLink').width() + 40 + 'px'});
        $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#resumeLink').offset().left + ($('#resumeLink').width()/2) + "px"});
      }
      else if (pageSaver.attr('href') == "#projects") {
        $('.highlight').css({'width' : $('#projectsLink').width() + 40 + 'px'});
        $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#projectsLink').offset().left + ($('#projectsLink').width()/2) + "px"});
      }
      else if (pageSaver.attr('href') == "#blog") {
        $('.highlight').css({'width' : $('#blogLink').width() + 40 + 'px'});
        $('.highlight').css({'left' : -(window.innerWidth / 2) + $('#blogLink').offset().left + ($('#blogLink').width()/2) + "px"});
      }
    }
*/

});