const Component = (function(){
    const Constructror = function(options){
        this.el = options.el;
        this.data = options.data;
        this.template = options.template;
    }

    Constructror.prototype.setState = function(obj){
        for(let key in obj){
            if(this.data.hasOwnProperty(key)){
                this.data[key] = obj[key];
            }
        }
        this.render();
    };

    Constructror.prototype.getState = function(){
       return JSON.parse(JSON.stringify(this.data));
    };

    Constructror.prototype.render = function(){
        const $list = document.querySelector(this.el)
        if(!$list) return;
        $list.innerHTML = this.template(this.data);
    };
    return Constructror;
})();