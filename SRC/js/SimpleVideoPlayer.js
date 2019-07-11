var SimpleVideoPlayer = EventDispatcher.extend({
    
    
    init:function(videoObject,files,autoLoad){
       this._super();
        if (autoLoad == undefined){autoLoad = true;}
        this.videoObject = videoObject;
        this.files = files;
        this.videoObject.addListener("onError",this.handleError,this);
        this.videoObject.addListener("onComplete",this.handleComplete,this);
        if (autoLoad){console.log("autoload video 0"); this.load();}
    },
    clear:function(){
        this.files = new Array();
        
    },
    add:function(src,failSafe)
    {
        if (!window.chrome && this.getVideoType(src).toLowerCase() == "webm"){return;}
        this.files.push({src:src,fail:failSafe});
        
    },
    load:function(index,isFail){
        if (index == undefined){index = 0;}
        if (isFail == undefined){isFail = false;}
        
        console.log("Attempting to load " + (isFail?"failsafe ":"") + this.files[index][(isFail?"fail":"src")]);
        this.videoObject.load(this.files[index][(isFail?"fail":"src")]);
    },
    findVideoIndex:function(vidPath){
        var i;
        for (i=0;i<this.files.length;i++)
        {
            if (this.files[i].src == vidPath)
            {
                return {index:i, isFail: false};
            }else if (this.files[i].fail == vidPath)
            {
                return {index:i, isFail: true};
            } 
        }// end for
        return {index:-1,isFail:false};
        
    },
    getVideoType:function(filename){
        
        return filename.split('.').pop();
        
    },
    getBaseFileName:function(filePath)
    {
        
        return filePath.split("/").pop().replace("." + this.getVideoType(filePath),"");
        
    },
    handleComplete:function(e){
        
        p = new Object();
        p.filePath = e.sender.lastFile;
        p.fileName = e.context.getBaseFileName(e.sender.lastFile);
        p.fileExt = e.context.getVideoType(e.sender.lastFile);
        e.context.dispatch("onComplete",p);
        
    },
    handleError:function(e){
        if (e.src == ""){return;}
       
         var vidData =e.context.findVideoIndex(e.src);
        
                 
        if (vidData.isFail)
        {
            if (e.context.files.length>vidData.index)
            {
                e.context.load(vidData.index + 1);
            }
            
        }else{
            e.context.load(vidData.index,true);
            
        }

    }
    
    
    
    
    
    
});
