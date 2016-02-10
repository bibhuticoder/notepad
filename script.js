$(window).load(function(){
     
    var currentIndex = 0;
    
    var files = [
        {name:"TestFile", text:"This file is generated for testing purpose..."},
        
    ];
       
    $(".btnPlus").click(function(){
                
       showDialog(100);
                
    });
    
    $("#btnSelectAll").click(function(){
       
        $("#txtArea").selectionStart = 0;
        $("#txtArea").selectionEnd = 10;
        
        
        
    });
    
    function createFile(filename){
        
        if(filename === "") filename = "untitled";
        
        if(filename != null){           
             
            files.push({name:filename, text:""}); 
            
        }
                
        setEventHandlers();
        
        loadFiles();
        
        changefile(files.length-1); // change view to new file
        
    }
    
    function loadFiles(){
        
        if(files.length === 0 ){
            
            createFile("untitled");  
            
        }
        
        $("#files").html("");
        
        for(var f in files){
            
            $("#files").append('<div class="fileName" data-index="'+f+'" title="'+files[f].name+'"><div class="btnRemove" title="Delete">x</div> ' + files[f].name + '</div>');
            
        }
        
        setEventHandlers();
        
        changefile(files.length-1);
       
    }
    
    function changefile(index){
        
        if(index === -1){
            
            $("#txtArea").val("");
            
        }
        else{
            
            currentIndex = index;
            $(".fileName").removeClass("fileSelected");
            $("div[data-index='"+currentIndex+"']").addClass("fileSelected");

            //load respective text
            $("#txtArea").val(files[currentIndex].text);           
            
        }
        
        
    }
        
    loadFiles();
    
    setEventHandlers();
    
    function setEventHandlers(){
        
        $(".fileName").click(function(){
        
            changefile($(this).attr("data-index"))
        
        });
        
        $(".fileName").hover(function(){
        
            $($(this).children()[0]).css("visibility","visible");
       
        },
        
        function(){
        
            $($(this).children()[0]).css("visibility","hidden");
            
        });
        
        $(".btnRemove").click(function(){
        
            var indexToDelete = parseInt($(this).parent().attr("data-index"));
            
            removeFile(indexToDelete);
            
            
        
    });
        
        $("#txtArea").keyup(function(e){
            
             files[currentIndex].text = $("#txtArea").val();
             console.log($("#txtArea").val().split('\n').length);   
            
             var textLines = $("#txtArea").val().substr(0, $("#txtArea").val().selectionStart).split("\n");
             var currentLineNumber = textLines.length;
             var currentColumnIndex = textLines[textLines.length-1].length;
             
            $("#bottomBar").text("Line " + currentLineNumber + ", Col " + currentColumnIndex);
            
        });
        
    }
    
    $("#btnSave").click(function(){        
        saveTextAsFile();        
    });
    
    function removeFile(indexToDelete){
        
        $("div[data-index='"+indexToDelete+"']").slideUp(250, function(){  
                
                $("div[data-index='" + indexToDelete + "']").remove();
                files.splice(indexToDelete,1);
                loadFiles();
                
                //change file view
                if(indexToDelete === 0 && files.length>0){ //if it is first file
                    changefile(0);
                }

                else if(indexToDelete === files.length){ // if it is last file

                    changefile(files.length-1); // index is 1 less than length
                }
                
                else if(indexToDelete > 0 && indexToDelete < files.length){ //middle files
                    
                    changefile(indexToDelete-1);
                }
                else{
                    
                    changefile(-1);
                    
                }
                                
                console.log(files);  
                
            });
        
    }
    
    function saveTextAsFile() {
    
        var fileToSave = {name:files[currentIndex].name, text:files[currentIndex].text};      
        var text = $("#textarea").val();        
        var blob = new Blob([fileToSave.text], {type: "application/xhtml+xml; charset=utf-8"});        
        saveAs(blob, fileToSave.name + ".txt");
        
    }
    
    function showDialog(speed){
        
        $(".pageCover").slideDown(speed);
        $(".dialogWindow").fadeIn(speed*3);
        
    }
    
    function hideDialog(speed){
        
        $(".dialogWindow").fadeOut(speed*3);    
        $(".pageCover").slideUp(speed);    
        
    }
    
    $("#dialogExit").click(function(){
       
        hideDialog(100);
        
    });
    
    $("#btnCreateFile").click(function(){
        
        createFile($("#newFileName").val());
        $("#newFileName").val("");
        hideDialog(100);
        
    });
    
    $("#newFileName").keydown(function(e){
       
        if(e.keyCode === 13){
            
            createFile($("#newFileName").val());
            $("#newFileName").val("");
            hideDialog(100);
            
        }
        
    });
        
    function setPosition(){
        
        //position the dialog windows at middle of the screen
        $(".dialogWindow").css("left",$(window).width()/2 - $(".dialogWindow").width()/2);
        $(".dialogWindow").css("top",$(window).height()/2 - $(".dialogWindow").height());
        
        $(".pageCover").width($(window).width());
        $(".pageCover").height($(window).height());
        
    }
    
    $(window).resize(function(){
       
        setPosition();
        
    });
    
    setPosition();
    
    hideDialog(1);
          
});
	
