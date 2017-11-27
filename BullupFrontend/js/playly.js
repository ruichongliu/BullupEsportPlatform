$().ready(function(){
    $('.play_href').on('click', function(e){
       
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_team.html', {}, 'main-view');
		
        });
   

			document.getElementById('headle_music1').addEventListener('click',function(event){
				console.log("click ok");            
				document.getElementById("bullup_background_music").pause();
			});
    });
   

    
  