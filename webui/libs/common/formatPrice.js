/*!
 * Create by zihan on 2016
 * v1.1.3
 */

// format the price number
XLJ.formatPrice = window.XLJ.formatPrice || function(price, decimal, precentCount, isMaxDecimal) {
    if (typeof price == 'String') price = price.trim()
    price = parseFloat(price) || 0
    var decimal = (decimal == 0) ? 0 : decimal || 2, precentCount = precentCount || 100
    price = price / precentCount
    if (isMaxDecimal) {
        var _price = price + '',
            _price_length = _price.length,
            _price_last = _price.indexOf('.')
        if (_price_last != -1) {
            var _de_price = _price_length - (_price_last + 1)
            decimal = (_de_price < decimal) ? _de_price : decimal
        } else {
            // is integer
            decimal = null
            price += ''     // change to string
        }
    }
    return (decimal !== null) ? price.toFixed(decimal) : price
}
