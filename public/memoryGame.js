var memoryGame = (function(){
    var instance;

    /**
     * 초기화 데이터
     * 
     * 이미지 배열(숫자 유동적)
     * 커버 이미지
     * 
     */
    function initiate(imgArr, ulElement){//게임 초기화

        if(imgArr.length < 1) console.error('이미지 배열을 매개변수로 넣어주세요.');
        
        var ul = ulElement;
        var itemImgArr= imgArr
        var itemCoverImg= ""
        var elementNumber= itemImgArr.length
        var target= ""
        var coverStatus= false
        var flipStatus= false
        var gameStatus= false 

        return {
            startGame: function(){
                console.log("startGame");
                gameStatus = true;
                this.initiateItem();                
            },
            getRandomNumber: function(n){
                var rannum = Math.floor(Math.random() * n)
                return rannum;
            },
            initiateItem: function(){
                console.log("initiateItem");
                //아이템 섞기, 찾고자 하는 타겟 설정
                this.shuffleItem().setTarget().renderItemList();                
            },
            renderItemList: function(){
                for(var i = 0 ; i < elementNumber ; i++){                    
                    var li = document.createElement("li");  
                    li.addEventListener("click", this.flipItem);           
                    var img = document.createElement("img");
                    img.setAttribute("src", itemImgArr[i]);
                    li.appendChild(img);
                    ul.appendChild(li);                             
                }
                return this;
            },
            flipItem: function(e){              
                console.log("flipItem");

                if(flipStatus===true)return;
                if(gameStatus===false)return;
                
                e.target.className="cover"
                console.log(e.target.children);

                flipStatus = true;   
                //맞추기 function추가

                setTimeout(function(){
                    //뒤집기 css 추가
                    e.target.className=""
                    flipStatus = false;
                },2000)
            },
            setTarget: function(){
                console.log("setTarget");
                target = this.getRandomNumber(elementNumber);                
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
            returnToCover: function(obj){
                return this;
            },
            coverItems: function(){

            },
            getItemIndex: function(){

            }
        }
    }

    return {
        getInstance: function(imgArr, ulElement){//instance객체가 있는 경우에는 initiate를 거치지 않고 바로 반환
            if(!instance){
                instance = initiate(imgArr, ulElement);
            }
            return instance;
        }
    }
})();