/*!
 *  Description:       Pruoduct Publish
 *  Created Date:      2015-10-12
 *  Author:            zihan
 */


'use strict';

var XLJ = window.XLJ || {};

XLJ.ProductPublish = function() {
    this.debug = true;

    this.productId        = 0
    this.productData      = ''

    this.categoryTreeData = ''
    this.tagLabelRowIdex  = 0
    this.rowIndexId       = 0
    this.pickboxIndex     = 0

    this.publishBox       = $('#publishBox')
    this.productSave      = $('.product-save')
    this.categorySelector = $('.category-selector')
    this.productEditor    = $('.product-editor')
    this.propertyContent  = $('#propertyContent')
    this.propertysRow     = $('#propertysRow')
    this.skuRow           = $('#skuRow')
    this.normalSkuRow     = $('#normalSkuRow')
    this.pictureListRow   = $('#pictureListRow')
    this.modfiyCategory   = $('.modfiyCategory')
};

XLJ.ProductPublish.prototype = {
    init: function() {

        var ACTION = this.action()

        ACTION.normal()
        ACTION.checkCurrentProduct()
        ACTION.categorySelection()
        ACTION.brandSelection()
        ACTION.skuSetting()
        ACTION.skuSelection()
        ACTION.skuInput()
        ACTION.pictureSelection()

        ACTION.publish()
        ACTION.editor()

    },

    model: {
        category: {
            list: function(options, callback) {
                helper.dataMod('/category/tree', options, callback, null)
            },
            pvList: function(options, callback) {
                helper.dataMod('/category/property/value/list', options, callback, null)
            }
        },
        brand: {
            list: function(options, callback) {
                helper.dataMod('/brand/pureList', options, callback, null)
            }
        },
        property: {
            add: function(options, callback) {
                helper.dataMod('/category/createProperty', options, callback, null)
            },
            addValue: function(options, callback) {
                helper.dataMod('/category/createValue', options, callback, null)
            }
        },
        picture: {
            upload: function(options, target) {
                var options = options || {}
                options.url = '/picManager/uploadPicture'
                options.type = 'POST'
                target.ajaxSubmit(options)
            },
            delete: function(options, callback) {
                helper.dataMod('/picManager/deletePicture', options, callback, null)
            }
        },
        product: {
            get: function(options, callback) {
                helper.dataMod('/product/findByProductId', options, callback, null)
            },
            publish: function(options, callback) {
                helper.dataMod('/product/publish', options, callback)
            }
        }
    },

    view: function() {
        var root = this;

        return {
            category: {
                list: function(options, callback) {
                    var tpl = '',
                        canCreate = false,
                        options   = options || {},
                        parentId  = (options && options.parentId) ? options.parentId : 0;

                    if (!root.categoryTreeData) {
                        root.model.category.list({}, function(response) {
                            if (root.debug) console.log(response);
                            if (!response.success) return helper.tip(response.msg, 'warning');

                            // save the category tree data
                            root.categoryTreeData = buildTreeData(response.data.result);

                            canCreate = true;
                            createItem(root.categoryTreeData);
                        });
                    } else {
                        canCreate = true;
                        createItem(root.categoryTreeData);
                    }

                    if (root.debug) console.log('parentId: ' + parentId);
                    function createItem(data) {
                        var data = data[parseInt(parentId)];
                        if (!data || !canCreate) return;

                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            tpl += '<li class="item" data-categoryId="' + d.id + '">' + d.label+ '</li>';
                        }

                        if (callback) callback(tpl);
                    }
                },

                pvList: function(options, callback) {
                    root.model.category.pvList(options, function(response) {
                        if (root.debug) console.log(response)

                        var tpl = $('#tpl_propertysBox').html()

                        var data = response.data.sell
                        var boxs = ''
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i]

                            var $tpl = $(tpl)
                            $tpl.find('.panel').attr({
                                'data-propertyId': d.propertyId,
                                'data-boxIndex': d.propertyId
                            })
                            $tpl.find('.title').text(d.name)
                            $tpl.find('.property-name').attr({
                                'value': d.name,
                                'data-propertyId': d.propertyId,
                                'data-id': d.propertyId
                            })
                            $tpl.find('.propertys').attr('data-propertyId', d.propertyId)

                            boxs += $tpl.html()
                        }

                        if (callback) callback(boxs)
                    })
                }
            },

            brand: {
                list: function(options, callback) {
                    root.model.brand.list({}, function(response) {
                        if (root.debug) console.log(response)
                        if (!response.success) return helper.tip(response.msg, 'warning')

                        var tpl = ''
                        var data = response.data
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i]
                            tpl += '<li class="item" data-brandId="' + d.id + '">' + d.name+ '</li>'
                        }
                        if (callback) callback(tpl)
                    })
                }
            },

            property: {
                add: function(options, callback) {
                    root.model.property.add(options, function(response) {
                        if (root.debug) console.log(response)
                        if (!response.success) return helper.tip(response.msg, 'warning')

                        if (callback) callback(response.data.property)
                    })
                },
                addValue: function(options, callback) {
                    root.model.property.addValue(options, function(response) {
                        if (root.debug) console.log(response);
                        if (!response.success) return helper.tip(response.msg, 'warning');
                        if (!callback) return;

                        var data = response.data.value;

                        var labelid = 'tagindex' + root.tagLabelRowIdex + 'pv' + data.id;
                        var tpl = $('<div><div class="item canremove col-lg-2 col-md-3 col-sm-4 col-xs-6"><input class="checkbox" type="checkbox" name="propertyValue"><label for=""></label></div></div>');

                        tpl.find('input').attr({
                            'id':         labelid,
                            'data-id':    data.id,
                            'data-vid':   data.valueId,
                            'data-vname': data.name
                        });
                        tpl.find('label').text(data.name).attr({
                            'for':        labelid,
                            'data-id':    data.id
                        });

                        tpl = tpl.html();
                        callback(tpl);
                    });
                }
            },

            picture: {
                upload: function(target, callback) {
                    var opt = {
                        beforeSend: function() {
                            target.find('.progress-box').show()
                        },
                        uploadProgress: function(event, position, total, percentComplete) {
                            var percent = percentComplete + '%'
                            if (percentComplete < 20) percent = '20%'
                            target.find('.progress-bar').css('width', percent)
                        },
                        success: function(response, status, xhr) {
                            target.find('.progress-bar').css('width', '100%').addClass('progress-bar-success')
                            setTimeout(function() {
                                target.find('.progress-box').fadeOut()
                            }, 800)
                            if (callback) callback(response)
                        }
                    }
                    root.model.picture.upload(opt, target)
                }
            }
        }
    },

    action: function() {
        var root = this
        var model = root.model,
            view  = root.view()

        // init templates
        var tpl_categoryListBox = $('#tpl_categoryListBox').html()
        var tpl_skuDataRow      = $('#tpl_skuDataRow').html()
        var $tpl_skuDataRow     = $(tpl_skuDataRow)

        // setting standard
        var $propertysBox        = $('.propertys-box'),
            $propertysAddrow     = $('.propertys-addrow'),
            $propertysDraft      = $('.propertys-draft'),
            $showPropertyDraft   = $('.showPropertysDraft')


        var fn = {
            checkSelectCategor: function() {
                var canGo = true
                var selectBox = root.categorySelector.find('.mod_selectitem')

                if (selectBox.length > 0) {
                    selectBox.each(function() {
                        if ($(this).find('.selected').length == 0) canGo = false
                    })
                } else {
                    canGo = false
                }

                if (!canGo) {
                    $('.gonext').addClass('disabled')
                } else {
                    $('.gonext').removeClass('disabled')
                }

                return canGo
            },

            checkContentPosition: function(target) {
                var _winH = $(window).height(),
                    _winT = window.scrollY,
                    _targetTop = target.offset().top,
                    _targetH = target.outerHeight();

                var _sDistance = (_targetTop + _targetH / 2) - _winH/2;
                if (_sDistance > 0) {
                    $('body').animate({ scrollTop: _sDistance }, 800);
                }
            }
        }

        return {

            normal: function() {
                $(document.body).on('click', '.mod_selectitem .item', function() {
                    $(this).addClass('selected').siblings().removeClass('selected');
                });
            },


            /* Check current product
             * ------------------- */
            checkCurrentProduct: function() {
                var URLSearch = window.location.href,
                    regEx     = /(^|\?|#|&)product(|id|Id|ID)=(\d*)(&|#|$)/,
                    result    = URLSearch.match(regEx)

                if (!result) return false
                var productId = result[3] || 0
                root.productId = productId
                root.publishBox.find('[name="productId"]').val(productId)

                model.product.get({productId: productId}, function(response) {
                    if (root.debug) console.log(response)

                })

                // For edit product
                function buildCurrentProductContent(data) {
                    root.categorySelector.hide()
                    root.productEditor.show()
                }
            },


            /* Category
             * ------------------- */
            categorySelection: function() {

                // Load the parent category first
                view.category.list({parentId: 0}, function(tpl) {
                    var $tpl = $(tpl_categoryListBox);
                    $tpl.find('.main').html(tpl);
                    root.categorySelector.find('.main').html($tpl);

                    // Default select on first load category
                    root.categorySelector.find('.mod_selectitem:first-child .item:first-child').trigger('click');
                });

                // Selected category and go to next
                root.categorySelector.on('click', '.gonext', function() {

                    var canGo = true;
                    root.categorySelector.find('.mod_selectitem').each(function() {
                        var _this = $(this);
                        if (_this.find('.selected').length == 0) canGo = false;
                    });

                    if (!canGo) return;

                    var _this = $(this),
                        $selected      = root.categorySelector.find('.current'),
                        _categoryId    = $selected.attr('data-categoryId') || 0,
                        _oldCategoryId = _this.attr('data-categoryId')     || null

                    if (_categoryId !== _oldCategoryId) {
                        // Set selected category
                        root.productEditor.find('.category-name .name')
                            .text($selected.text())
                            .attr('data-categoryId', _categoryId)

                        // Create category property list
                        createCategoryPVs(_categoryId, root.productId)
                        $(this).attr({
                            'data-build': 'true',
                            'data-categoryId': _categoryId
                        })
                    }

                    root.categorySelector.slideUp();
                    root.productEditor.slideDown();
                });


                // category item click action
                root.categorySelector.on('click', '.item', function() {
                    var _this = $(this),
                        _parent = _this.parentsUntil('.mod_selectitem').last().parent(),
                        _categoryId = _this.attr('data-categoryId');

                    if (!_categoryId) return;

                    // muset clear next all dom before inner HTML
                    _parent.nextAll().remove();

                    view.category.list({parentId: _categoryId}, function(tpl) {
                        var $tpl = $(tpl_categoryListBox);
                        $tpl.find('.main').html(tpl);
                        _parent.after($tpl);
                    });

                    _this.addClass('selected').siblings().removeClass('selected');

                    // set form data (name="navigationCategoryIds")
                    var $categoryIdData = root.publishBox.find('[name="navigationCategoryIds"]');
                    if (fn.checkSelectCategor()) {
                        $categoryIdData.val(_categoryId);
                    } else {
                        $categoryIdData.val('');
                    }

                    root.categorySelector.find('.head strong').text(_this.text());
                    root.categorySelector.find('.current').removeClass('current');
                    _this.addClass('current');

                });

                // modfiy category
                root.modfiyCategory.on('click', function() {
                    root.categorySelector.slideDown();
                    root.productEditor.slideUp();
                });

                fn.checkSelectCategor();

                function createCategoryPVs(categoryId, productId) {
                    var options = {
                        categoryId: categoryId,
                        productId:  productId
                    }

                    view.category.pvList(options, function(boxs) {
                        root.propertysRow.html(boxs)
                    })
                }
            },


            /* brand
             * ------------------- */
            brandSelection: function() {
                var $brandSelector  = $('#brandSelector')
                var $brandSelectBox = $('#brandSelectBox')

                view.brand.list({}, function(tpl) {
                    $brandSelectBox.find('.mod_selectitem > .main').html(tpl)
                })

                // confirm selected brand
                $brandSelectBox.on('click', '.confirm', function() {
                    var _this = $(this),
                        _parent     = _this.parentsUntil('.popbox').last().parent(),
                        _selected   = _parent.find('.selected'),
                        _brandId    = _selected.attr('data-brandId'),
                        _brandName  = _selected.text()

                    // set form data (name="brandId")
                    root.publishBox.find('[name="brandId"]').val(_brandId)

                    var brandSelect = $brandSelector.find('.input')
                    brandSelect.parent().removeClass('error-row')
                    // clear error tip

                    brandSelect.text(_brandName).attr({
                        'data-brandId': _brandId,
                        'data-value': _brandId          // for checkrequired
                    }).removeClass('error-item')
                    _parent.popbox('close')
                })
            },


            /* Standard for sku setting
             * ------------------- */
            skuSetting: function() {

                // product standard setting controllor
                root.propertyContent.on('change', 'input[name="standard"]', function(e) {
                    var _this = $(this),
                        _val  = $('input[name="standard"]:checked').val();

                    if (_val == '1') {                   // setting sku
                        $('.propertys-box').slideDown(); // must select dom every time
                        $propertysAddrow.slideDown();
                        root.skuRow.slideDown();
                        root.normalSkuRow.slideUp();
                        fn.checkContentPosition(root.propertyContent);
                    } else {                             // nomarl setting
                        $('.propertys-box').slideUp();
                        $propertysAddrow.slideUp();
                        $propertysDraft.slideUp();
                        root.skuRow.slideUp();
                        root.normalSkuRow.slideDown();
                    }
                });

                $showPropertyDraft.on('click', function() {
                    $propertysDraft.slideDown();
                    $(this).parent().slideUp();
                });

                root.propertyContent.on('click', '.propertys-draft .cannel', function() {
                    var _parent = $(this).parentsUntil('.propertys-draft').last().parent();
                    _parent.slideUp();
                    $propertysAddrow.slideDown();
                });

                root.propertyContent.on('click', '.editing .cannel', function() {
                    var _parent = $(this).parentsUntil('.propertys-box').last().parent();
                    _parent.removeClass('editing');
                    _parent.find('.propertys').removeClass('tag-labels').addClass('tag-pickbox');
                    $propertysAddrow.slideDown();
                });

                // property box confirm
                root.propertyContent.on('click', '.editing .confirm', function() {
                    var _this        = $(this),
                        _parent      = _this.parentsUntil('.propertys-box').last().parent(),
                        _currentName = _parent.find('.row-name input').val(),
                        _oldPid      = _parent.attr('data-propertyId'),
                        _oldName     = _parent.find('.title').text();

                    if (_currentName == _oldName) {
                        _parent.removeClass('editing');
                        _parent.find('.propertys').removeClass('tag-labels').addClass('tag-pickbox');
                        $propertysAddrow.slideDown();
                    } else {
                        propertyEditing(_parent, function(data) {
                            _parent.attr('data-boxIndex', data.propertyId);
                            _parent.attr('data-propertyId', data.propertyId);
                            _parent.find('.propertys').attr('data-propertyId', data.propertyId);
                            _parent.find('.title').text(_currentName);
                            _parent.find('.propertys').removeClass('tag-labels').addClass('tag-pickbox');
                            _parent.removeClass('editing');
                            replaceSkuRowPid(_oldPid, data.propertyId, _currentName);
                            $propertysAddrow.slideDown();
                        });
                    }

                    if (_parent.find('.row-add input').val()) _parent.find('.addPvTag').trigger('click')
                });


                // property draft confirm
                $propertysDraft.on('click', '.confirm', function() {
                    var _this = $(this),
                        _parent = _this.parentsUntil('.propertys-draft').last().parent();

                    propertyEditing(_parent, function(data) {
                        var options = data || {};

                        // clone propertys box
                        var cloneBox = _parent.clone();
                        cloneBox.addClass('propertys-box').removeClass('propertys-draft').attr('data-propertyId', options.propertyId);   // change box draft to using box
                        cloneBox.find('.propertys').addClass('tag-pickbox').removeClass('tag-labels').attr('data-propertyId', options.propertyId);
                        cloneBox.find('.row-name input').attr({
                            'data-id':         options.id,
                            'data-propertyId': options.propertyId
                        });

                        cloneBox.find('.title').text(cloneBox.find('.row-name input').val());
                        cloneBox.find('.delete').show();

                        var boxIndex = 0;
                        // check property box index for sort these property box
                        var $ppBox = root.propertyContent.find('.propertys-box');
                        $ppBox.each(function(index) {
                            var _thisPropertyId = $(this).attr('data-propertyId');
                            if (Number(options.propertyId) >= Number(_thisPropertyId)) {
                                boxIndex = index + 1;
                            }
                        });
                        cloneBox.attr('data-boxIndex', options.propertyId);
                        cloneBox.find('.propertys .item').each(function() {
                            var _this = $(this),
                                _input = _this.find('input'),
                                _label = _this.find('label'),
                                _itemId = _input.attr('data-id'),
                                _thisIndex = options.propertyId;

                            _input.attr('id', 'pid' + _thisIndex + 'vid' + _itemId);
                            _label.attr('for', 'pid' + _thisIndex + 'vid' + _itemId);
                        });

                        cloneBox.hide(); // hide first before inset to document

                        // inset clone data
                        if (boxIndex == 0) {
                            root.propertysRow.prepend(cloneBox);
//                            _parent.before(cloneBox);
                        } else {
                            $ppBox.eq(boxIndex - 1).after(cloneBox);
                        }

                        root.propertysRow.find('.propertys-box[data-boxIndex="' + options.propertyId + '"]').slideDown();

                        // reset draft input
                        _parent.find('.row-name input').val('');
                        _parent.find('.propertys').empty();
                        _parent.find('.cannel').trigger('click');
                    });
                });

                function propertyEditing(formEl, callback) {
                    if (!formEl) return;

                    // check name and tag label
                    var checkArea = formEl.find('.row-name');
                    if (formEl.find('.propertys .item').length == 0) checkArea = formEl;
                    if (!checkArea.checkRequired()) return;

                    // check property
                    var hadProperty = false;
                    var $nameInput = formEl.find('.row-name input');
                    root.propertyContent.find('.propertys-box .title').each(function() {
                        if ($nameInput.val().trim() == $(this).text().trim()) return hadProperty = true;
                    });
                    if (hadProperty) return helper.tip('宸插瓨鍦ㄥ悓鍚嶅睘鎬�', 'warning');

                    // add property
                    var propertyName = $nameInput.val().trim();
                    view.property.add({propertyName: propertyName}, function(data) {
                        if (callback) callback(data, formEl);
                    });
                }

                function replaceSkuRowPid(oldpid, newpid, newname) {
                    root.skuRow.find('.dataTable thead [data-propertyId="' + oldpid + '"]').text(newname).attr('data-propertyId', newpid);
                    root.skuRow.find('.datalist tr').each(function() {
                        var _that = $(this),
                            _sourcekey = _that.attr('data-key');
                        _that.attr('id', 'key' + replacePidKeyArray(_sourcekey, oldpid, newpid));
                        _that.attr('data-key', replacePidKeyArray(_sourcekey, oldpid, newpid));
                        _that.find('td[data-propertyId="' + oldpid + '"]').attr('data-propertyId', newpid);
                    });
                }

                root.propertyContent.on('click', '.propertys-box .delete', function() {
                    var _parent = $(this).parentsUntil('.propertys-box').last().parent();
                    if (_parent.find('input:checked').length > 0) return helper.tip('璇峰厛鍙栨秷浣跨敤鐨勫睘鎬у€�', 'warning');
                    _parent.remove();
                });

                root.propertyContent.on('click', '.modfiy', function() {
                    var _parent = $(this).parentsUntil('.propertys-box').last().parent();
                    _parent.find('.propertys').removeClass('tag-pickbox').addClass('tag-labels');
                    _parent.addClass('editing');
                    $propertysAddrow.slideUp();
                });

                // tag label remove
                root.propertyContent.on('click', '.tag-labels .canremove', function(e) {
                    var _this = $(this);

                    if (_this.find('.checkbox').prop('checked')) return helper.tip('宸茶缃甋KU淇℃伅锛岀‘璁よ鍒犻櫎锛�');
                    _this.remove();
                });

                // disable the tag box click action
                root.propertyContent.on('click', '.tag-labels input', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });

                // add pv tag action
                root.propertyContent.on('click', '.addPvTag', function(e) {
                    var _this = $(this),
                        _parent = _this.parentsUntil('.panel').last().parent(),
                        _input = _this.parent().prev(),
                        _boxindex = _parent.attr('data-boxIndex');

                    if (!_this.parent().parent().checkRequired()) return;

                    // reset taglabel index
                    if (_boxindex) {
                        root.tagLabelRowIdex = _boxindex;
                    } else {
                        root.tagLabelRowIdex = root.propertyContent.find('.propertys-box').length + 1;
                    }

                    var options = {};
                    options.valueName = _input.val().trim();
                    view.property.addValue(options, function(tpl) {
                        var $pps = _parent.find('.propertys')
                        emptyContent($pps, '.item')
                        $pps.append(tpl);
                    });

                    _input.val(''); // clear input
                });

                function emptyContent(target, contentName) {
                    var isEmpty = false
                    var $content = target.find(contentName)

                    if ($content.length == 0) {
                        target.empty()
                        isEmpty = true
                    }
                    return isEmpty
                }

            },


            /* SKU
             * ------------------- */
            skuSelection: function() {

                // setting standard

                function createCol(target, propertyId, dom) {
                    var index = 0;
                    var $tpl_skuDataRow_type = target.find('.row-type');
                    if ($tpl_skuDataRow_type.length > 0) {
                        $tpl_skuDataRow_type.each(function(i) {
                            if (propertyId > $(this).attr('data-propertyId')) index = i;
                        });
                        $tpl_skuDataRow_type.eq(index).after(dom);
                    } else {
                        target.find('.row-default-sku').after(dom);
                    }
                }

                function resetSkuTpl(propertyId, propertyName) {
                    // reset sku box and sku row
                    var tpl_tbodyTr = '<td class="row-type" data-propertyId="' + propertyId + '"></td>',
                        tpl_theadTr = '<th class="row-type" data-propertyId="' + propertyId + '">' + propertyName + '</th>',
                        $defaultRowHead = root.skuRow.find('.dataTable thead tr'),
                        $defaultRowBody = root.skuRow.find('.dataTable tbody tr');

                    createCol($tpl_skuDataRow, propertyId, tpl_tbodyTr);    // reset template dom
                    createCol($defaultRowHead, propertyId, tpl_theadTr);    // reset current table thead row
                    $defaultRowBody.each(function() {
                        createCol($(this), propertyId, tpl_tbodyTr);        // reset current table tbody row
                    });
                }

                root.propertyContent.on('change', '.propertys-box .tag-pickbox input', function(e) {
                    var _this = $(this),
                        _parent    = _this.parentsUntil('.propertys-box').last().parent(),
                        _pname     = _parent.find('.title').text(),
                        _propertys = _this.parentsUntil('.propertys').last().parent(),
                        _vname     = _this.attr('data-vname'),
                        _pid       = _propertys.attr('data-propertyId') || 0,
                        _vid       = _this.attr('data-vid')             || 0,
                        _pv        = _pid + ':' + _vid;

                    var data = {
                        'data-pv':  _pv,
                        'data-pid': _pid,
                        'data-vid': _vid
                    };
                    if (root.debug) console.log('pv: ' + _pv + ' ----- pid: ' + _pid + ' --- vid: ' + _vid);

                    var $datalist = root.skuRow.find('.datalist');

                    // set the checkbox style on tab-pickbox state
                    if (_this.prop('checked')) {
                        _this.parent().addClass('item-primary');

                        // first item
                        if (checkCheckedItem(root.propertysRow) == 1) {
                            $datalist.html(createSKURow(_pv, _pid, _vname))
                            resetSkuTpl(_pid, _pname)
                            $datalist.find('td[data-propertyId="' + _pid + '"]').text(_vname)  // the first item must set name once
                            $datalist.find('.default-sku').prop('checked', true)               // set default sku becaues only one item
                            return;
                        }

                        // only one item in a row ( just inset data to old table col )
                        if (checkCheckedItem(_propertys) == 1) {
                            resetSkuTpl(_pid, _pname);

                            $datalist.find('tr').each(function() {
                                var _that = $(this),
                                    _sourcekey = _that.attr('data-key');

                                _that.attr('id', 'key' + createKeyArray(_sourcekey, _pv));
                                _that.attr('data-key', createKeyArray(_sourcekey, _pv));
                                _that.find('td[data-propertyId="' + _pid + '"]').html(_vname);
                            });
                            return;
                        } else {
                            // more than tow item in a row ( must create new data row )
                            var $siblingsBox = _parent.siblings('.propertys-box');
                            var selectOption = {
                                pv: _pv,
                                pid: _pid,
                                vid: _vid,
                                vname: _vname
                            }
                            var skuArr = createSKUKeyGrounp(selectOption, $siblingsBox);
                            var allSku = skuResult(skuArr),
                                allSkuTpl = '';
                            for (var i = 0; i < allSku.length; i++) {
                                allSkuTpl += createSKURow(allSku[i].pv, allSku[i].params);
                            }
                            // inset data tpl
                            $datalist.append(allSkuTpl);
                        }
                    } else {
                        _this.parent().removeClass('item-primary');

                        // first item
                        if (checkCheckedItem(root.propertysRow) == 0) {
                            $datalist.html('<tr><td class="loading" colspan="20">璇峰厛璁剧疆SKU</td></tr>');  // clear tbody
                            root.skuRow.find('.dataTable thead .row-type').remove();                      // clear thead
                            $tpl_skuDataRow.find('.row-type').remove();                                   // clear tpl col
                            return;
                        }

                        // only one item in a row ( just remove old table col )
                        if (checkCheckedItem(_propertys) == 0) {
                            root.skuRow.find('.dataTable tr').each(function() {
                                var _that = $(this),
                                    _sourcekey = _that.attr('data-key') || '';

                                if (_sourcekey) {
                                    _that.attr('id', 'key' + removeKeyArray(_sourcekey, _pv));
                                    _that.attr('data-key', removeKeyArray(_sourcekey, _pv));
                                }
                                _that.find('[data-propertyId="' + _pid + '"]').remove();
                            });
                            $tpl_skuDataRow.find('[data-propertyId="' + _pid + '"]').remove();
                            return;
                        } else {
                            // more than tow item in a row ( remove data row )
                            var $siblingsBox = _parent.siblings('.propertys-box');
                            var selectOption = {
                                pv: _pv,
                                pid: _pid,
                                vid: _vid,
                                vname: _vname
                            }
                            var skuArr = createSKUKeyGrounp(selectOption, $siblingsBox);
                            var allSku = skuResult(skuArr);
                            for (var i = 0; i < allSku.length; i++) {
                                var _thisRow = $datalist.find('tr[data-key="' + allSku[i].pv + '"]')
                                if (_thisRow.find('.default-sku').prop('checked')) {
                                    _thisRow.remove()
                                    $datalist.find('tr').eq(0).find('.default-sku').prop('checked', true) // remove the default sku, must set anthor to default
                                }else{
                                	_thisRow.remove();
                                }
                            }
                        }
                    }
                })

                var checkboxId = 0; // label for sku checkbox id
                function createSKURow(key, pid, name) {
                    var $tpl = $tpl_skuDataRow;

                    if (typeof key === 'object') {
                        var arr = key.sort(),
                            newKey = '';
                        for (var i = 0; i < arr.length; i++) {
                            newKey += arr[i];
                            if (i < arr.length -1) newKey += ',';
                        }
                        key = newKey;
                    }
                    $tpl.find('tr').attr('data-key', key);

                    if (pid && typeof pid === 'object') {
                        for (var i = 0; i < pid.length; i++) {
                            $tpl.find('td[data-propertyId="' + pid[i].pid + '"]').text(pid[i].vname);
                        }
                    } else if(pid && name) {
                        $tpl.find('td[data-propertyId="' + pid + '"]').text(name);
                    }

                    $tpl.find('input.default-sku').attr('data-pv', key);
                    $tpl.find('.row-default-sku input').attr('id', 'skubox' + checkboxId);
                    $tpl.find('.row-default-sku label').attr('for', 'skubox' + checkboxId);
                    checkboxId +=1;

                    return $tpl.html();
                }

                function setVName() {

                }

                function checkCheckedItem(parent) {
                    var _checkedItem = parent.find('input:checked');
                    return _checkedItem.length;
                }

                function createSKUKeyGrounp(main, otherEl) {
                    var arr = [];
                    otherEl.each(function() {
                        var _that = $(this);
                        var _checkedItem = _that.find('input:checked');
                        if (_checkedItem.length == 0) return;
                        var _pid = _that.find('.propertys').attr('data-propertyId');

                        var rowArr = [];
                        _checkedItem.each(function() {
                            var _vid = $(this).attr('data-vid'),
                                _vname = $(this).attr('data-vname');

                            rowArr.push({
                                pv:  _pid + ':' + _vid,
                                pid: _pid,
                                vid: _vid,
                                vname: _vname
                            });
                        });
                        rowArr.sort();
                        arr.push(rowArr);
                    });
                    var pvArr = new Array({
                        pv:    main.pv,
                        pid:   main.pid,
                        vid:   main.vid,
                        vname: main.vname
                    });
                    arr.push(pvArr);
                    arr.sort();
                    if (root.debug) console.log(arr);
                    return arr;
                }
            },

            skuInput: function() {
                root.skuRow.on('enter', 'input[type="text"]', function() {
                    inputAction($(this))
                })

                root.skuRow.on('blur', 'input[type="text"]', function() {
                    inputAction($(this))
                })

                function inputAction(taget) {
                    var _this   = taget,
                        _text   = _this.val()

                    if (!_text) return

                    var _parent = _this.parent(),
                        _index  = _parent.index()

                    if (_this.hasClass('price')) {
                        _this.val(function(n, c) {
                            return _text = Number(c).toFixed(2)
                        })
                    }

                    _parent.parent().siblings().each(function() {
                        var _that = $(this),
                            _input = _that.find('td').eq(_index).find('input[type="text"]')

                        if (!_input.val()) _input.val(_text)
                    })
                }
            },


            /* Product picture picker area
             * ------------------- */
            pictureSelection: function() {

                root.pictureListRow.find('.datalist').on('change', '.picinput', function() {
                    if (root.debug) console.log('file change')

                    var _this = $(this),
                        _file = this.files[0],
                        _parent = _this.parent(),
                        _img    = _parent.find('.img'),
                        _name   = _parent.find('.name'),
                        _boxIndex = Number(_parent.attr('data-boxIndex')) || 0

                    var URL  = window.URL || webkitURL,
                        blob = URL.createObjectURL(_file)

                    // if not have image return
                    if (!_file) return

                    _img.css('background-image', 'url(' + blob + ')')
                    _name.text(_file.name).attr('title', _file.name)

                    // build picture box
                    if (_parent.hasClass('space')) {
                        _parent.removeClass('space').addClass('picture')
                        root.pictureListRow.find('.datalist').append(createPickbox(_boxIndex + 1))
                    }

                    // upload picture
                    view.picture.upload(_parent, function(response) {
                        if (root.debug) console.log(response)
                        if (!response.success) helper.tip(response.msg, 'warning')
                        _parent.attr('data-picId', response.data.picId)
                        _parent.attr('data-picUrl', response.data.picUrl)
                        _parent.attr('data-picName', _file.name)
                        _parent.find('.picinput').attr('data-picId', response.data.picId)

                        var currentPicBox = _parent.parent().find('.mainpic')
                        if (currentPicBox.length == 0) {
                            setMainPic(_parent)
                        }
                    })
                })

                root.pictureListRow.find('.datalist').on('click', '.remove', function() {
                    var _this = $(this),
                        _parent = _this.parent().parent(),
                        _picId  = _parent.attr('data-picId')

                    removePickbox(_parent)
                })

                root.pictureListRow.find('.datalist').on('click', '.setmainpic', function() {
                    var _this = $(this),
                        _parent = _this.parent().parent()
                    setMainPic(_parent)
                })

                function createPickbox(boxIndex) {
                    var $tpl = $($('#tpl_photopick').html()),
                        _boxId = 'photopick' + boxIndex
                    $tpl.attr('data-boxIndex', boxIndex)
                    $tpl.find('.picinput').attr('id', _boxId)
                    $tpl.find('label').attr('for', _boxId)

                    return $tpl
                }

                function removePickbox(target) {
                    if (target.hasClass('mainpic')) return helper.msgBox('鍟嗗搧涓诲浘涓嶈兘鍒犻櫎锛岃鍏堣缃叾瀹冨浘涓轰富鍥�')

                    var _picId = target.attr('data-picId')
                    if (_picId) model.picture.delete({picId: _picId})

                    // settimeout for css animate
                    target.addClass('delete')
                    setTimeout(function() {
                        target.css('width', 0)

                        setTimeout(function() {
                            target.remove()
                        }, 300)
                    }, 300)
                }

                function setMainPic(target) {
                    target.attr('data-mainPic', 'true').addClass('mainpic')
                    target.siblings().removeAttr('data-mainPic').removeClass('mainpic')
                }
            },


            /* Product picture picker area
             * ------------------- */
            publish: function() {

                var list = []

                root.productSave.on('click', function() {
                    var _this = $(this)
                    var canSave = true

                    checkRequireBox()   // check required input box
                    checkSkuAndPicRow() // check sku and picture

                    if (canSave) {
                        console.log("productType" + root.publishBox.find('[name="productType"]:checked').val());
                        saveProduct(function() {

                        })
                    } else {

                        // inorder to scroll to error row
                        var errorRow = root.productEditor.find('.error-row').eq(0)
                        if (errorRow.length == 0) return

                        var _top = errorRow.offset().top,
                            _editBoxH = $('.navbar-fixed-top').outerHeight(),
                            _winH     = $(window).height()

                        var sTop = _top - (_winH / 2)
                        $('body').animate({ scrollTop: sTop }, 500)
                    }

                    function checkRequireBox() {
                        if (!$('#productNameRow, #brandRow').checkRequired()) canSave = false
                        if (root.propertyContent.find('[name="standard"]:checked').val() == 0) {
                            if (!root.normalSkuRow.checkRequired()) canSave = false
                        } else {
                            if (!root.skuRow.checkRequired()) canSave = false
                        }
                    }

                    function checkSkuAndPicRow() {
                        if ($('.error-row').length != 0) return
                        if ((root.skuRow.find('.datalist .default-sku').length == 0)) {
                            helper.tip('杩樻病鏈夎缃鏍�', 'warning')
                            fn.checkContentPosition(root.propertyContent);
                            return canSave = false
                        }

                        if (root.pictureListRow.find('.picture').length == 0) {
                            helper.tip('杩樻病涓婁紶鍟嗗搧鍥剧墖', 'warning')
                            fn.checkContentPosition(root.pictureListRow);
                            return canSave = false
                        }
                        return canSave = true
                    }
                })

                function saveProduct(callback) {
                    var data = {
                        productId             : root.publishBox.find('[name="productId"]').val()   || 0,
                        name                  : root.publishBox.find('[name="name"]').val()        || '',
                        description           : root.publishBox.find('[name="description"]').val() || '',
                        mainCategoryId        : root.publishBox.find('[name="navigationCategoryIds"]').val() || 0,
                        locale                : root.publishBox.find('[name="locale"]').val()      || 'zh_cn',
                        brandId               : root.publishBox.find('[name="brandId"]').val()     || 0,
                        brandCollectionId     : 0,
                        categoryIds           : 0,
                        navigationCategoryIds : 0,
                        storeStrategy         : 0,
                        mainPropertyId        : 0,                      // main property for product picture
                        ppvdInfo              : createPropertysData(),
                        pvPrices              : createPvPricesData(),
                        pictureList           : createPictureListData(),
                        detailContent         : createDetailContent(),
                        detailPicIds          : '',
                        productType           : root.publishBox.find('[name="productType"]:checked').val()
                    }

                    if (root.debug) console.log(data)

                    model.product.publish(data, function(response) {
                        if (root.debug) console.log(response)
                        if (!response.success) return helper.tip(response.msg, 'warning')
                        if (response.success) {
                            //if (callback) callback()
                            console.log("isVerify:" + response.data.isVerify);
                            if(response.data.isVerify){
                                console.log("isVerify true");
                                window.location.href = "/admin/product/verifyList";
                            }else{
                                console.log("isVerify false");
                                window.location.href = "/admin/product/manage";
                            }
                        }
                    })
                }

                function createPropertysData() {
                    var ppvdInfo        = {},
                        properties      = [],
                        aliasProperties = []

                    root.propertysRow.find('.propertys-box').each(function() {
                        var _this = $(this),
                            _checkedItem = _this.find('input:checked')
                        if (_checkedItem.length == 0) return

                        var _propertyId = _this.attr('data-propertyId')
                        var values = []

                        _checkedItem.each(function() {
                            var _vid = $(this).attr('data-vid')
                            if (_vid) values = values.concat(_vid)

                            aliasProperties.push({
                                propertyId:         _propertyId,
                                isMultiple:         true,
                                isSell:             true,
                                isExtPropertyValue: true,
                                bigPictureId:       0,
                                color:              '',
                                valueId:            _vid,
//                                pictureId:          0,
                                aliasName:          ''
                            })
                        })

                        properties.push({
                            propertyId: _propertyId,
                            isMultiple: true,
                            isSell:     true,
                            values:     values,
                        })
                    })

                    ppvdInfo = { properties: properties, aliasProperties: aliasProperties }
                    return JSON.stringify(ppvdInfo)
                }

                function createPvPricesData() {
                    var pvPrices = {},
                        list     = [],
                        pNames   = []

                    root.skuRow.find('.dataTable thead .row-type').each(function() {
                        pNames = pNames.concat($(this).text().trim())
                    })

                    root.skuRow.find('.datalist tr').each(function() {
                        var _this        = $(this),
                            _defaultItem = (_this.find('input.default-sku:checked').length == 0) ? false : true,
                            _vnameCol    = _this.find('.row-type') || '',
                            _key         = _this.attr('data-key')   || '',
                            _skuId       = _this.attr('data-skuId') || null,

                            _marketPrice = _this.find('.market-price').val() || '',
                            _sellPrice   = _this.find('.sell-price').val()   || '',
                            _stocks      = Number(_this.find('.stocks').val())       || 0,
                            _barcode     = _this.find('.barcode').val()      || ''

                        var vNames  = [],
                            vDetail = {}

                        _vnameCol.each(function() {
                            vNames = vNames.concat($(this).text().trim())
                        })

                        vDetail = {
//                            skuId:          _skuId,
                            storageNums:    _stocks,
                            tradeMaxNums:   0,
                            marketPrice:    _marketPrice,
                            price:          _sellPrice,
                            promotionPrice: null,
                            sellNums:       0,
                            barCode:        _barcode,
                            skuCode:        '',
                            pNames:         pNames,
                            vNames:         vNames,
                            barCodeMap:     [],
                            dboNums:        0,
                            defaultSku:     _defaultItem,
                            shopPrice:      null,
                            currency:       null,
                            costPrice:      null
                        }

                        list.push({
                            key:          _key,
                            pNames:       pNames,
                            vNames:       vNames,
                            value:        vDetail,
                            list:         null,
                            currencyMaps: null
                        })
                    })

                    if (root.debug) console.log(list)
                    pvPrices = { list: list }
                    return JSON.stringify(pvPrices)
                }

                function createPictureListData() {
                    var pictureList = {},
                        list        = [],
                        imageDomain = 'http://img01.sephome.com'

                    root.pictureListRow.find('.datalist .picture').each(function(i) {
                        var _this        = $(this),
                            _id          = _this.attr('data-id')      || 0,
                            _picId       = _this.attr('data-picId')   || 0,
                            _picUrl      = _this.attr('data-picUrl')  || '',
                            _picName     = _this.attr('data-picName') || '',
                            _mainPic     = Boolean(_this.attr('data-mainPic')) || false,
                            _priority    = (i == 0) ? 9999 : i + 1

//                        if (_picUrl) _picUrl = imageDomain + '/' + _picUrl

                        list.push({
//                            id:       _id,
                            picId:    _picId,
                            mainPic:  _mainPic,
                            picUrl:   _picUrl,
                            videoUrl: '',
                            picName:  _picName,
                            priority: _priority,
                            list:     null
                        })
                    })

                    pictureList = { list: list }
                    return JSON.stringify(pictureList)
                }

                function createDetailContent() {
                    var $simditorBody = $('.simditor-body')
                    if ($simditorBody.length > 0 && $simditorBody.attr('contenteditable')) {
                        return $simditorBody.html()
                    } else {
                        return $('#productDetailContent').html()
                    }
                }
            },

            editor: function() {
                /*toolbar = [ 'title', 'bold', 'italic', 'underline', 'strikethrough',
                 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|',
                 'link', 'image', 'hr', '|', 'indent', 'outdent' ];*/

                var editor = new Simditor( {
                    textarea:     $('#productDetailContent'),
                    placeholder:  '杩欓噷杈撳叆鍐呭...',
//                    toolbar:      toolbar,  //宸ュ叿鏍�
//                    defaultImage: 'simditor/2.3.3/images/image.png', //缂栬緫鍣ㄦ彃鍏ュ浘鐗囨椂浣跨敤鐨勯粯璁ゅ浘鐗�
                    upload: {
                        url :            '/picManager/uploadPicture', //鏂囦欢涓婁紶鐨勬帴鍙ｅ湴鍧€
                        params:          null,   //閿€煎,鎸囧畾鏂囦欢涓婁紶鎺ュ彛鐨勯澶栧弬鏁�,涓婁紶鐨勬椂鍊欓殢鏂囦欢涓€璧锋彁浜�
                        fileKey:         'file', //鏈嶅姟鍣ㄧ鑾峰彇鏂囦欢鏁版嵁鐨勫弬鏁板悕
                        connectionCount: 3,
                        leaveConfirm:    '姝ｅ湪涓婁紶鏂囦欢'
                    }
                });
            }
        }
    }
}



/* --------------
 plus
 ------------ */

function buildTreeData(data) {
    if (!data) return;
    var obj = {};
    var parentId = '0';

    (function build(data, parentId) {
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var key = String(parentId || '0');
            if (!obj[key]) obj[key] = [];

            obj[key].push({
                id:       d.id,
                parentId: parseInt(key),
                label:    d.label,
                expanded: d.expanded,
                hot:      d.hot
            });

            if (d.items) {
                build(d.items, d.id);
            }
        }
    })(data);

    return obj;
}

function createKeyArray(source, item) {
    if (!source) return;
    var arr = source.split(',');
    arr.push(item);
    arr.sort();
    return arr;
}

function removeKeyArray(source, item) {
    if (!source) return;
    var arr = source.split(',');
    var narr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != item) narr.push(arr[i]);
    }
    narr.sort();
    return narr;
}

function replacePidKeyArray(source, oldItem, newItem) {
    if (!source) return;
    var arr = source.split(',');
    var narr = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split(':');
        if (item[0] == oldItem) item[0] = newItem;
        narr.push(item[0] + ':' + item[1]);
    }
    narr.sort();
    return narr;
}

function skuResult(res) {
    if (!res) return;
    var all =[];
    var l = res.length;
    (function sku(t, s, arr, num) {
        if (num < 1) {
            var o = {};
            t.sort();
            o.pv = t;
            o.params = s;
            all.push(o);
            return
        }
        for (var i = 0; i < arr[num-1].length; i++) {
            sku(t.concat(arr[num-1][i].pv),
                s.concat({pid: arr[num-1][i].pid, vname: arr[num-1][i].vname}),
                arr, num-1);
        }
        num --;
    })([],[],res,l);

    console.log('---------- skuResult test-------');
    console.log(all);
    return all;
}



/*var demoArr = [['10010:110', '10010:111'], ['30012:301', '30012:302', '30012:333'], ['10012:201', '10012:202']];
 var demoObj = [
 [{
 pv: '10010:110',
 pid: 10010,
 vid: 110,
 vname: '鐧借壊'
 },{
 pv: '10010:111',
 pid: 10010,
 vid: 111,
 vname: '榛戣壊'
 }],
 [{
 pv: '30012:301',
 pid: 30012,
 vid: 301,
 vname: '100ml'
 },{
 pv: '30012:302',
 pid: 30012,
 vid: 302,
 vname: '200ml'
 },{
 pv: '30012:303',
 pid: 30012,
 vid: 303,
 vname: '300ml'
 }],
 [{
 pv: '20000:201',
 pid: 20000,
 vid: 201,
 vname: '澶у彿'
 },{
 pv: '20000:202',
 pid: 20000,
 vid: 202,
 vname: '灏忓彿'
 }]
 ];*/
//demoArr.sort();
//skuResult(demoObj);
