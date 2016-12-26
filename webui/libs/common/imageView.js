
$.fn.extend({

    imageView: function(callback) {
        if (typeof FileReader == 'undefined') return;
        
        var file = this[0].files[0];
        if (typeof file == 'undefined') return;
        if (!/image\/\w+/.test(file.type)) return;
        
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            if (callback) callback(this.result);
        }
        
    }
});
