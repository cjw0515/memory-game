var singleTonObj = (function(){
    var instance;
    var testValue = "test value";

    function initiate(){
        return {
            testValue: testValue
        }
    }

    return {
        getInstance: function(){
            if(!instance){
                instance = initiate();
            }else{
                console.log("이미 객체가 만들어져 있습니다.");
            }
            return instance;
        }
    }
})();