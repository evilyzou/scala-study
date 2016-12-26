/*!
 * Create by zihan on 2015-12-22
 * Data Mod
 */

$.fn.extend({
    distselect: function(options) {
        var _root = this;
        var $country  = this.find('[data-dist="country"]'),
            $province = this.find('[data-dist="province"]'),
            $city     = this.find('[data-dist="city"]'),
            $district = this.find('[data-dist="district"]')

        //if ($country.length <= 0) _root.append('<select class="form-control" data-dist="country"><option>- 国 -</option></select>')
        if ($province.length <= 0) _root.append('<select class="form-control" data-dist="province"><option>- 市 -</option></select>')
        if ($city.length <= 0)     _root.append('<select class="form-control" data-dist="city"><option>- 省 -</option></select>')
        if ($district.length <= 0) _root.append('<select class="form-control" data-dist="district"><option>- 区 -</option></select>')

        var $country  = this.find('[data-dist="country"]'),
            $province = this.find('[data-dist="province"]'),
            $city     = this.find('[data-dist="city"]'),
            $district = this.find('[data-dist="district"]')

        var options = options || {}
        var countrySrc  = options.countryData  || '/Address/listProvinceByCountry',
            provinceSrc = options.provinceData || '/Address/listProvinceByCountry',
            citySrc     = options.cityData     || '/Address/listCityByProvince',
            districtSrc = options.districtData || '/Address/listDistrictByCity'

        if (options.countryId) {
            buildData($province, {countryId: options.countryId}, countrySrc)
        }

        function ajaxData(url, data, callback) {
            var a = $.ajax({
                url: url,
                data: data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('System-Type', XLJ.systemType)
                    xhr.setRequestHeader('Content-Type', XLJ.contentType)
                },
                success: function(response) {
                    if (callback) callback(response)
                }
            })
            return a
        }

        function view(data) {
            var tpl = ''
            for (var i = 0; i < data.length; i++) {
                var d = data[i]
                tpl += '<option class="item" value="' + d.id + '" data-code="' + d.postalCode + '">' + d.name + '</option>'
            }
            return tpl
        }

        function buildData(target, option, url) {
            ajaxData(url, option, function(response) {
//                console.log(response)
                var data = response.result.list
                target.find('option').eq(0).nextAll().remove()
                target.append(view(data))
                target.nextAll().each(function() {
                    $(this).find('option').eq(0).nextAll().remove()
                })
            })
        }

        this.find('select').on('change', function() {
            var _this  = $(this),
                _id    = _this.val() || '',
                _type  = _this.attr('data-dist') || '',
                option = ''

            if (!_id || !_type) return

            if (_type == 'country') {
                option = eval('({countryId:'  + _id + '})')
                buildData($province, option, provinceSrc)
            }

            if (_type == 'province') {
                option = eval('({provinceId:'  + _id + '})')
                buildData($city, option, citySrc)
            }

            if (_type == 'city') {
                option = eval('({cityId:'  + _id + '})')
                buildData($district, option, districtSrc)
            }
        })
    }
});
