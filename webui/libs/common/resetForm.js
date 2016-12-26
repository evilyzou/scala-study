
$.fn.extend({
    resetForm: function() {
        this[0].reset();
        this.find('.msg').text('');
    }
});
