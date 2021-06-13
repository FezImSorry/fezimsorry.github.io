$(document).ready(function() {

	var coll;
	var pageSaver;
	var resumeFlag = true;

	var slideNum = $('.pageBody').length,
	wrapperWidth = 100 * slideNum,
	slideWidth = 100 / slideNum;

	var off = -(window.innerWidth / 2) + $('#homeLink').offset().left + ($('#homeLink').width()/2);

	var requestURL = 'https://faizansari.com/data/data.json';
	var request = new XMLHttpRequest();

	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	if(window.innerWidth <= 760)
		$('.title').text('فیض انصاری');
	else
		$('.title').text('محمد فیض الدین انصاری');

	request.onload = function() {

		var data = request.response;
		populateResume(data);
		populateProjects(data);
		populateBlog(data);
		populateBGImages();
	}

	window.onresize = function() {

		if(window.innerWidth <= 760)
			$('.title').text('فیض انصاری');
		else
			$('.title').text('محمد فیض الدین انصاری');

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

	
	document.getElementById('backLink').onclick = function (event) {

		$('#blogLanding').css({'width' : 100 + '%', 'height' : 100 + '%'});
		document.getElementById("blog-title").innerHTML = null;
		document.getElementById("blog-content").innerHTML = null;
		document.getElementById("next-link").innerHTML = null;
		document.getElementById("prev-link").innerHTML = null;
		document.getElementById("blog-date").innerHTML = null;
		document.getElementById("blog-tags").innerHTML =  null;
		event.preventDefault();

	};

/*
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
*/

	$(".resumeExpandOption").click(function () {

		if(checkCollapsed()) {
			expandAll();
		}
		else {

			$(".resumeExpandOption").text('Expand All');

			for (var i = 0; i < coll.length; i++) {

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

	function checkCollapsed(){
		var flag = true;

		for (var j = 0; j < coll.length; j++) {

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

		for (var j = 0; j < coll.length; j++) {

		    var content = coll[j].nextElementSibling;
		    
		    if (!content.style.maxHeight) {

		    	coll[j].classList.toggle("active");         
		    	content.style.maxHeight = content.scrollHeight + "px";
		    	content.style.opacity = 1;
		    	content.style.marginBottom = 40 + "px";
		    }
		}
	}

	function populateBGImages(){
		
		var BG_0B = document.createElement("img");
		var BG_1A = document.createElement("img");
		var BG_1B = document.createElement("img");
		var BG_2A = document.createElement("img");
		var BG_2B = document.createElement("img");
		var BG_3A = document.createElement("img");
		var BG_3B = document.createElement("img");
		var BG_4A = document.createElement("img");

		BG_0B.src = 'images/background/0B.png';
		BG_1A.src = 'images/background/1A.png';
		BG_1B.src = 'images/background/1B.png';
		BG_2A.src = 'images/background/2A.png';
		BG_2B.src = 'images/background/2B.png';
		BG_3A.src = 'images/background/3A.png';
		BG_3B.src = 'images/background/3B.png';
		BG_4A.src = 'images/background/4A.png';

		BG_0B.className = "BG_0B";
		BG_1A.className = "BG_1A";
		BG_1B.className = "BG_1B";
		BG_2A.className = "BG_2A";
		BG_2B.className = "BG_2B";
		BG_3A.className = "BG_3A";
		BG_3B.className = "BG_3B";
		BG_4A.className = "BG_4A";

		BG_0B.oncontextmenu = new Function("return false;");
		BG_1A.oncontextmenu = new Function("return false;");
		BG_1B.oncontextmenu = new Function("return false;");
		BG_2A.oncontextmenu = new Function("return false;");
		BG_2B.oncontextmenu = new Function("return false;");
		BG_3A.oncontextmenu = new Function("return false;");
		BG_3B.oncontextmenu = new Function("return false;");
		BG_4A.oncontextmenu = new Function("return false;");

		document.getElementById("home").prepend(BG_0B);
		document.getElementById("home").prepend(BG_1A);
		document.getElementById("resume").prepend(BG_1B);
		document.getElementById("resume").prepend(BG_2A);
		document.getElementById("projects").prepend(BG_2B);
		document.getElementById("projects").prepend(BG_3A);
		document.getElementById("blog").prepend(BG_3B);
		document.getElementById("blog").prepend(BG_4A);

	}

	function populateResume(jsonObj) {

		var resume = jsonObj['resume'];

		for(var i = 0; i < resume.length; i++){

			var resumeHeader = document.createElement('button');
			var resumeContent = document.createElement('div');
			
			resumeContentArray = resume[i]['content'].slice();

			resumeHeader.textContent = resume[i].header;

			resumeHeader.className = "collapsible";
			resumeContent.className = "content";

			for(var j = 0; j < resumeContentArray.length; j++){

				var resumeContentInner = document.createElement('p');
				var resumeTitle = document.createElement('strong');
				var resumeDate = document.createElement('div');
				var resumeSubtitle = document.createElement('div');
				var resumeList = document.createElement('ul');

				var resumeListItem = resume[i]['content'][j]['list'].slice();

				resumeTitle.innerHTML = resume[i]['content'][j].title;
				resumeDate.textContent = resume[i]['content'][j].date;
				resumeSubtitle.textContent = resume[i]['content'][j].subtitle;

				resumeContentInner.className = "resumeContent";
				resumeTitle.className = "resumeStrong";
				resumeDate.className = "resumeDate";
				resumeList.className = "resumeList";
			
				resumeContentInner.appendChild(resumeTitle);
				resumeContentInner.appendChild(resumeDate);
				resumeContentInner.appendChild(resumeSubtitle);

				for(var k = 0; k < resumeListItem.length; k++){

					resumeListItem[k] = document.createElement('li');
					resumeListItem[k].innerHTML = resume[i]['content'][j]['list'][k];
					resumeListItem[k].className = "resumeListItem";
					resumeList.appendChild(resumeListItem[k]);
				}

				resumeContent.appendChild(resumeContentInner);
				resumeContent.appendChild(resumeList);

			}

			document.getElementById("resumeBody").appendChild(resumeHeader);
			document.getElementById("resumeBody").appendChild(resumeContent);
		}

		coll = document.getElementsByClassName("collapsible");

		for (var i = 0; i < coll.length; i++) {
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
			    content.style.marginBottom = 40 + "px";

			    if(checkCollapsed()){
			      $(".resumeExpandOption").text('Expand All');
			    }
			    else {
			      $(".resumeExpandOption").text('Collapse All');
			    }
			  }
			});
		}

	}

	function populateProjects(jsonObj) {

		var projects = jsonObj['projects'];

		for(var i = 0; i < projects.length; i++) {

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
			//projectType.textContent = projects[i].type + " - " + projects[i].field;
			projectType.textContent = projects[i].field;
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

	function populateBlog(jsonObj) {

		const monthNames = ["January", "February", "March", "April", "May", "June",
						  	"July", "August", "September", "October", "November", "December"];

		var blog = jsonObj['blog'];

		var blogCount = document.createElement('h4');

		blogCount.innerHTML = blog.length + " Posts";
		blogCount.className = "blogCount";
		document.getElementById("blogLanding").appendChild(blogCount);

		for(var i = blog.length-1; i >= 0; i--) {

			var blogContainer = document.createElement('div');
			var blogContainerLink = document.createElement('a');
			var blogName = document.createElement('h3');
			var blogInfo = document.createElement('span');
			var blogExcerpt = document.createElement('p');

			var jDate = new Date(blog[i].date);
			var dateCorrector = jDate.getDate() + 1;
			var jContent = blog[i].content;
			var excerpt = jContent.replace(/<\/?[^>]+>/gi, '');

			blogContainerLink.href = "#blogPostBody";
			blogContainerLink.id = i;
			blogName.textContent = blog[i].title;
			blogInfo.textContent = "— " + dateCorrector + " " + monthNames[jDate.getMonth()] + ", " + jDate.getFullYear();

			if(excerpt.length > 140)
				blogExcerpt.textContent = excerpt.substring(0, 138) + "...";
			else
				blogExcerpt.textContent = excerpt;

			blogContainer.className = "blogContainer";
			blogName.className = "blogName";
			blogInfo.className = "blogInfo";

			blogContainerLink.onclick = function(event) {

				populatePost(this.id);
				$('#blogLanding').css({'width' : 0, 'height' : 0});
				event.preventDefault();
			}

			blogName.appendChild(blogInfo);
			blogContainerLink.appendChild(blogName);
			blogContainerLink.appendChild(blogExcerpt);
			blogContainer.appendChild(blogContainerLink);

			document.getElementById("blogLanding").appendChild(blogContainer);
		}

	}

	function populatePost(blogID) {

		const tmonthNames = ["January", "February", "March", "April", "May", "June",
				  			"July", "August", "September", "October", "November", "December"];
		
		var tblog = request.response['blog'];

		var theID = blogID;
		const mTheID = theID - 1;
		const pTheID = theID++;
		const realpID = theID++;

		console.log(this.id + " " + mTheID + " " + realpID);

		document.getElementById("blog-title").innerHTML = tblog[blogID].title;
		document.getElementById("blog-content").innerHTML = tblog[blogID].content;

		if(typeof tblog[realpID] === 'undefined') {

			if(document.getElementById("next-link"))
				document.getElementById("next-link").remove();
		}
		else{

			if(document.getElementById("next-link")) {
				document.getElementById("next-link").innerHTML = "NEXT.post<div>" + tblog[realpID].title + "</div>";

				document.getElementById("next-link").onclick = function (event) {

					populatePost(realpID);
					event.preventDefault();
				}
			}
			else {

				if(document.getElementById("prev-link"))
					document.getElementById("prev-link").remove();

				var blogNavLink = document.createElement('a');
				var linkName = document.createElement('div');
				
				linkName.textContent = tblog[realpID].title;
				blogNavLink.textContent = 'NEXT.post';

				blogNavLink.id = "next-link";
				blogNavLink.className = "blogNavLink";

				blogNavLink.onclick = function (event) {

					populatePost(realpID);
					event.preventDefault();
				}

				blogNavLink.appendChild(linkName);
				document.getElementById("blogNav").appendChild(blogNavLink);

			}

		}

		if(mTheID === -1) {

			if(document.getElementById("prev-link"))
				document.getElementById("prev-link").remove();
		}
		else{

			if(document.getElementById("prev-link")) {

				document.getElementById("prev-link").innerHTML = "PREV.post<div>" + tblog[mTheID].title + "</div>";

				document.getElementById("prev-link").onclick = function (event) {

					populatePost(mTheID);
					event.preventDefault();
				}
			}
			else {

				var blogNavLink = document.createElement('a');
				var linkName = document.createElement('div');
				
				linkName.textContent = tblog[mTheID].title;
				blogNavLink.textContent = 'PREV.post';

				blogNavLink.id = "prev-link";
				blogNavLink.className = "blogNavLink";

				blogNavLink.onclick = function (event) {

					populatePost(mTheID);
					event.preventDefault();
				}

				blogNavLink.appendChild(linkName);
				document.getElementById("blogNav").appendChild(blogNavLink);
			}

		}

		var tjDate = new Date(tblog[blogID].date);
		var tCorrectDate = tjDate.getDate() + 1;

		document.getElementById("blog-date").innerHTML = tCorrectDate + " " + tmonthNames[tjDate.getMonth()] + ", " + tjDate.getFullYear();

		var ttags = tblog[blogID].tags;

		document.getElementById("blog-tags").innerHTML = ttags.join(', ');					

	}

});