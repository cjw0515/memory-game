var memoryGame = (function(){
    var instance;

    /**
     * 초기화 데이터
     * 
     * 이미지 배열(숫자 유동적)
     * 커버 이미지
     * 
     */
    function initiate(imgArr, ulElement, cb){//게임 초기화
        
        var ul = ulElement;        
        var liArr = "";
        var itemImgArr= imgArr;
        var itemCoverImg= "";
        var elementNumber= itemImgArr.length;
        var target= "";
        var eventTarget="";
        var eventTargetIndex="";
        var coverStatus= false;
        var flipStatus= false;
        var gameStatus= false;
        var targetType = 2;

        return {
            startGame: function(){
                console.log("startGame");                
                if(imgArr.length < 1){
                    console.error('이미지 배열을 매개변수로 넣어주세요.');
                    return;
                }      
                gameStatus = true;                
                this.initiateItem();                
            },
            getRandomNumber: function(n){
                var rannum = Math.floor(Math.random() * n)
                return rannum;
            },
            initiateItem: function(){
                console.log("initiateItem");
                this.shuffleItem().renderItemList().coverAll().setTarget();                
            },
            renderItemList: function(){
                for(var i = 0 ; i < elementNumber ; i++){                    
                    var li = document.createElement("li");  
                    li.addEventListener("click", this.setEventTarget);           
                    li.addEventListener("click", this.flipItem.bind(this));                               
                    var img = document.createElement("img");
                    img.setAttribute("src", itemImgArr[i]);
                    li.appendChild(img);
                    ul.appendChild(li);                             
                }
                liArr = ul.getElementsByTagName('li');
                return this;
            },
            flipItem: function(){              
                console.log("flipItem");                
                if(flipStatus===false)return;
                if(gameStatus===false)return;           
                // if(this.isTarget(eventTarget))return;

                this.toFront(eventTarget);
                setTimeout(function(){
                    this.toBack(eventTarget);
                    if(this.isPickTarget()){
                        gameStatus=false;
                        this.cbFunction();
                    }                    
                }.bind(this), 2000);               
                
            },
            setTarget: function(){

                if(targetType === 1){
                    console.log("setTarget");
                    target = this.getRandomNumber(elementNumber);
                    this.toFront(liArr[target]); 
                    flipStatus=true;
                }else if(targetType === 2){
                    target = this.getRandomNumber(elementNumber);
                    var img = document.createElement("img");
                    img.setAttribute("src", imgArr[target]);
                    document.getElementById("target").appendChild(img);
                }
                return this;
            },
            shuffleItem: function(){
                console.log("shuffleItem");
                var tmp;
                var ranNum 

                for(var idx = 0 ; idx < elementNumber ; idx++){
                    ranNum = this.getRandomNumber(elementNumber);
                    tmp = itemImgArr[idx];
                    itemImgArr[idx] = itemImgArr[ranNum];
                    itemImgArr[ranNum] = tmp;                    
                }   
                console.log(itemImgArr);             
                return this;
            },
            toBack: function(et){
                console.log("toback");                                                
                flipStatus = true;   
                et.className="cover"
                et.children[0].style.display = "none";                
                return this;
            },
            toFront: function(et){                
                console.log("tofront");
                flipStatus = false;
                et.className=""
                et.children[0].style.display = "inline";                                    
                return this;                
            },
            setEventTarget: function(e){
                if( flipStatus === false ) return;              
                eventTarget = e.target;                
                eventTargetIndex = Array.prototype.indexOf.call(eventTarget.parentNode.childNodes, eventTarget) - 1;
            },
            coverAll: function(){
                for(var i = 0 ; i < liArr.length ; i++ ){
                    this.toBack(liArr[i]);   
                }             
                return this;
            },
            isBack: function(){
                return eventTarget.className === "cover" ? true : false;
            },
            isTarget: function(){                
                return eventTargetIndex === target ? true : false;
            },
            isPickTarget: function(){
                console.log(`pick: ${eventTargetIndex}, target: ${target}`);
                var result;

                if(targetType === 1){

                }else if(targetType === 2){ 
                    result = eventTargetIndex === target ? true : false;
                }

                return result;
            },
            cbFunction: cb            
            
        }
    }

    return {
        getInstance: function(imgArr, ulElement, cb){
            if(!instance){
                instance = initiate(imgArr, ulElement, cb);
            }
            return instance;
        }
    }
})();