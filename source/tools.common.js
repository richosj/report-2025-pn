/*!
 * 공통 Javascript 함수
 */

/*
 * Email 정규식 체크
 * */
function chkRegEmail(str){
      var Seiki1=/[!#-9A-~]+@+[a-z0-9]+.+[^.]$/i;
      var Seiki2=/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2}){1}(\.\w{2}){1}$/;

    if(str!=""){
        if(str.match(Seiki1) || str.match(Seiki2)){
        	return true;
        }else{
            return false;
        }
    } else {
    	return false;
    }
}


String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
/*
* ClassName : stringUtil
* Description : 문자열 관련 Class
*/
var stringUtil = {
    /* 문자열확인 후 문자열 또는 기본값 리턴
    str:체크 문자열 def:기본값 */
    getString: function(str, def){
        if (str != undefined && str && str != "" && str != "null"){
            return $.trim(str);
        } else {
            return $.trim(def);
        }
    },
    /* 정수형 확인 후 정수형 또는 기본값 리턴
    num:체크 정수형 / def:기본값 */
    getInt: function(num, def){
        var val = parseInt(num, 10);

        if (isNaN(val)){
            return def;
        } else {
            return val;
        }
    },
    getFloat: function(num, def){
        var val = parseFloat(num);

        if (isNaN(val)){
            return def;
        } else {
            return val;
        }
    },
    /* 공백제거
    str: 공백 제거 할 문자열*/
    trim: function(str){
        return $.trim(str);
    },
    /* Date
    */
    getDateView: function(regdt){

        var yyyy = regdt.substring(0, 4);
        var MM = regdt.substring(4, 6)-1;
        var dd = regdt.substring(6, 8);
        var hh = regdt.substring(8, 10);
        var mm = regdt.substring(10, 12);
        var ss = regdt.substring(12, 14);

        var nowDate = new Date();
        var regDate = new Date(yyyy, MM, dd, hh, mm, ss);

        var ss = Math.floor(nowDate.getTime() - regDate.getTime() ) / 1000;
        var mm = Math.floor(ss / 60);
        var hh = Math.floor(mm / 60);
        var day = Math.floor(hh / 24);

        var diff_hour = Math.floor(hh % 24);
        var diff_minute = Math.floor(mm % 60);
        var diff_second = Math.floor(ss % 60);

        //console.log( regdt + ' 계산 시간   : ' + day +  '일 ' + diff_hour  + ' 시간 ' + diff_minute + ' 분 ' + diff_second  + ' 초 ');
        var returnDate = "";
        if (day > 1 || diff_hour > 1){
            returnDate = regDate.format("yyyy.MM.dd HH:mm");
        } else {
            returnDate = diff_minute + "분 전";
        }

        return returnDate;
    },
    /* Format Date
    */
    formatDate: function(regdt, f){
    	if (stringUtil.getString(regdt, "") == ""){
    		return "-";
    	} else {
	        var yyyy = regdt.substring(0, 4);
	        var yy = regdt.substring(2, 4);
	        var MM = regdt.substring(4, 6);
	        var dd = regdt.substring(6, 8);
	        var hh = regdt.substring(8, 10);
	        var mm = regdt.substring(10, 12);
	        var ss = regdt.substring(12, 14);

	        return f.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
	            switch ($1) {
	                case "yyyy": return yyyy;
	                case "yy": return yy.zf(2);
	                case "MM": return MM.zf(2);
	                case "dd": return dd.zf(2);
	                case "hh": return hh.zf(2);
	                case "mm": return mm.zf(2);
	                case "ss": return ss.zf(2);
	                default: return $1;
	            }
	        });
    	}
    },
    /* set Comma */
    setComma: function(num){
        var pattern = /(^[+-]?\d+)(\d{3})/;
        num += '';
        while (pattern.test(num)){
            num = num.replace(pattern, '$1' + ',' + '$2');
        }
        return num;
    },
    /* remove Comma */
    removeComma: function(num){
        return num.replace(/,/gi,"");
    },
    /* replaceAll */
    replaceAll : function(str, searchStr, replaceStr) {
        if ($.trim(str) == ""){
            return str;
        } else {
            return str.split(searchStr).join(replaceStr);
        }
    }
    ,
    /* Number 체크 */
    isNumber : function(nVal) {
    	var regex = /^[0-9]+$/;
        return regex.test(nVal);
    },
    setPer: function(n1, n2){
    	if (n1 == 0)
    	{
    		return 0;
    	} else {
    		try {
    			return Math.round((n2/n1)*10000)/100;
    		} catch (e) {
    			return 0;
    		}
    	}
    },
    setPer2: function(n1, n2){
    	if (n1 == 0)
    	{
    		return 0;
    	} else {
    		try {
    			return Math.round((n2/n1)*100)/100*100;
    		} catch (e) {
    			return 0;
    		}
    	}
    },
    setPer3: function(n1){
        if (n1 == 0)
        {
            return 0;
        } else {
            try {
                return Math.round((n1)*1000)/1000;
            } catch (e) {
                return 0;
            }
        }
    },
    setPer4: function(n1){
        if (n1 == 0)
        {
            return 0;
        } else {
            try {
                return Math.round((n1)*10000)/10000;
            } catch (e) {
                return 0;
            }
        }
    },
    setPer5: function(n1, n2){
        if (n1 == 0)
        {
            return 0;
        } else {
            try {
                return Math.round((n2/n1)*1000)/10;
            } catch (e) {
                return 0;
            }
        }
    },
    getIdxDataLikeSplit: function(textData, rowNum, colNum, splitText1, splitText2){
    	var resultText = "";
    	var arrData1 = textData.split(splitText1);

    	if (splitText2 == ""){
    		resultText = arrData1[colNum];
    	} else {
    		var arrData2 = arrData1[rowNum].split(splitText2);
    		resultText = arrData2[colNum];
    	}
    	return resultText;
    }
};


// 스크롤바 존재유무
$.fn.hasScrollBar = function() {
    return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
};


// Modal Close시 작동
$('#divHiddenModalArea').on('hidden.bs.modal', function (e) {
    $(".topbar").removeAttr("style");
    e.preventDefault();
});



var ajaxUtil = {
    // 탭 로드시 사용
    load: function(obj){
       $(obj.target).load(obj.goUrl, obj.params, function(){
	   });
    },
    // 팝업 창 사용
    modal: function(obj){
        $("#divHiddenModalArea").load(obj.goUrl, obj.params, function(response, status, xhr){
            //$(".topbar").attr("style", "padding-right: 17px;")

            if ($(".topbar").hasScrollBar() == true){
                $(".topbar").attr("style", "padding-right: 17px;")
            }
            $("#divHiddenModalArea").modal({show:true});

        });
    },
    // 데이터 호출시 사용
    send: function(obj){
    	var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
        	type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            async: false,
            beforeSend : function(xhr){
            	xhr.setRequestHeader("goUrl", obj.goUrl);
                if (loadingYn == "Y"){
                    $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
                }
        	},
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
        	fnCommonReturnFunction(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
            $('body').waitMe('hide');
        }).always(function () {

        });
    },
    // 데이터 호출시 사용
    sendAsync: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            async: true,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                if (loadingYn == "Y"){
                    $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunction(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
            $('body').waitMe('hide');
        }).always(function () {

        });
    },

    // 모니토 데이터 호출시 사용
    sendMonito: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            async: false,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                if (loadingYn == "Y"){
                    $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunctionMonito(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
            $('body').waitMe('hide');
        }).always(function () {

        });
    },

    // 데이터 호출시 사용
    sendWeb: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendWebData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                 if (loadingYn == "Y"){
                    $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunctionWeb(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status != 0){
              //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
              $('body').waitMe('hide');
            }
        }).always(function () {

        });
    },

    sendWebSaveTempForInit: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendWebData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                //  if (loadingYn == "Y"){
                //     $('body').waitMe({
                //         effect : 'bounce',
                //         text : '',
                //         bg : 'rgba(255,255,255,0.7)',
                //         color : '#000',
                //         maxSize : '',
                //         waitTime : -1,
                //         textPos : 'vertical',
                //         fontSize : '',
                //         source : '',
                //         onClose : function() {}
                //     });
                // }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunctionWeb(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status != 0){
              //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
              $('body').waitMe('hide');
            }
        }).always(function () {

        });
    },


    // 데이터 호출시 사용
    sendWeb_multiligual: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendWebData_multiligual.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                 if (loadingYn == "Y"){
                    $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunctionWeb(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status != 0){
              alert("The error occurred while processing the data. (sendWeb_multiligual)" + errorThrown);
              $('body').waitMe('hide');
            }
        }).always(function () {

        });
    },    

    // 데이터 호출시 사용 우아한형제들 용도
    sendWebMobile_m: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendWebData.asp");
        var loadingYn = stringUtil.getString(obj.loadingYn, "Y");
        var ErrorMessageWoo = "데이터 처리중 에러가 발생하였습니다.\n답변이 저장되지 않았습니다.\n";
            ErrorMessageWoo += "네트워크를 상태를 확인하신 후 처음부터 다시 시도해 주세요.\n\n"
        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
                console.log("loadingYn : " + loadingYn)
                 if (loadingYn == "Y"){

                    $('body').waitMe({
                        effect : 'img__',
                        text : '.',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '550px',
                        source : '/wise_etest/asset/images/anibox.gif',
                        onClose : function() {}
                    });

                    $('.waitMe_content').removeAttr("style")
                    $('.waitMe_content').attr("style","margin-top: -333px; text-align: center; ")
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("데이터 처리중 에러가 발생하였습니다. \n답변이 저장되지 않습니다. \n네트워크 상태를 확인해주세요.\n\n" + "[sendWebMobile_m] - error\n" + textStatus + "\n" + errorThrown);
                // 다음문항 버튼 비활성화
                $("[id^='btnNext']").attr("disabled", true);
                // $("[id^='btnNext']").hide();

                $('body').waitMe('hide');
            }
        }).done(function (data) {
            fnCommonReturnFunctionWeb(data, obj.callFunction);

            if(data.statusCode !="00"){ //에러
                alert(ErrorMessageWoo + "[sendWebMobile_m] - done\n" + data.statusCode );
                // 다음문항 버튼 비활성화
                $("[id^='btnNext']").attr("disabled", true);
                // $("[id^='btnNext']").hide();

                $('body').waitMe('hide');

            }else{ //정상
                setTimeout(function() {
                    $('body').waitMe('hide');
                }, 100);
                
                // 다음문항 버튼 활성화
                $("[id^='btnNext']").html("");
                $("[id^='btnNext']").html("다음 문항");
                $("[id^='btnNext']").attr("disabled", false);
                // $("[id^='btnNext']").show();
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR)
            // console.log(textStatus)
            // console.log(errorThrown)
            // if(jqXHR.status != 0){
              alert("네트워크 상태를 확인하신 후 검사를 다시 시도해주세요.\n\n" + "[sendWebMobile_m] - fail\n" + textStatus + "\n" + errorThrown);
              // 다음문항 버튼 비활성화
              $("[id^='btnNext']").attr("disabled", true);
              // $("[id^='btnNext']").hide();

                $('body').waitMe('hide');
            // }
        }).always(function () {

        });
    },


    // 데이터 호출시 사용
    sendSubmit: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendData.asp");

        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "json",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnCommonReturnFunction(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
        }).always(function () {

        });
    },
    // data type html
    sendHtml: function(obj){
        var ajaxUrl = stringUtil.getString(obj.ajaxUrl, "/common/data/sendData.asp");

        $.ajax({
            type: "post",
            url: ajaxUrl,
            dataType: "html",
            data: obj.params,
            beforeSend : function(xhr){
                xhr.setRequestHeader("goUrl", obj.goUrl);
            },
            error: function(XHR, textStatus, errorThrown) {
                //alert("error: " + errorThrown);
            }
        }).done(function (data) {
            fnHtmlReturnFunction(data, obj.callFunction);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("데이터 처리중 에러가 발생하였습니다." + errorThrown);
        }).always(function () {

        });
    }

};

// 모니토
function fnCommonReturnFunctionMonito(obj, callFunction){
    $("body").removeClass("hidden");
        try {
            eval(callFunction).apply(this, arguments);
        }  catch (e){
            $('body').waitMe('hide');
            console.log("e : " + e);
        }
}


function fnCommonReturnFunction(obj, callFunction){
    $("body").removeClass("hidden");
	if (obj.statusCode == "00"){
		try {
	    	eval(callFunction).apply(this, arguments);
		}  catch (e){
            $('body').waitMe('hide');
			console.log("e : " + e);
		}
    } else if (obj.statusCode == "99"){
        swal({
          title: "로그인 후 이용이 가능합니다.",
          text: obj.msg,
          timer: 1000,
          showCancelButton: false
        });
        setTimeout(function(){
            location.href="/tools/secure/login.asp";
        }, 1200)
    } else if (obj.statusCode == "98"){
            $('body').waitMe('hide');
            swal({
                title: "권한이 없습니다.",
                text: "",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "확인",
                closeOnConfirm: false
            }, function () {
                location.href="/common/error/access.asp";
            });

    } else if (obj.statusCode == "97"){
            $('body').waitMe('hide');
            swal({
                title: "중복 로그인 또는 세션시간이 종료되었습니다.",
                text: "",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "확인",
                closeOnConfirm: false
            }, function () {
                location.href="/tools/secure/logout.asp";
            });

	} else {
		//alert(obj.msg);
        swal({
          title: "",
          text: obj.msg,
          timer: 2000,
          showCancelButton: false
        });
        //eval(callFunction).apply(this, arguments);
        $('body').waitMe('hide');
	}

}
function fnHtmlReturnFunction(obj, callFunction){

    try {
        eval(callFunction).apply(this, arguments);
    }  catch (e){
        $('body').waitMe('hide');
        console.log("e : " + e);
    }

}


function fnCommonReturnFunctionWeb(obj, callFunction){

    if (obj.statusCode == "00"){
        try {
            if(callFunction !="") eval(callFunction).apply(this, arguments);
        }  catch (e){
            $('body').waitMe('hide');
            console.log("e : " + e);
        }
      } else if (obj.statusCode == "97"){
          alert(obj.msg);
          location.href="/wise_etest/login/logout.asp";
      } else {
        alert(obj.msg);
        eval(callFunction).apply(this, arguments);
        $('body').waitMe('hide');
      }
}
/*
* function Name : getArrayGroupBy
* Description : 배열 중복제거
* 예 : getArrayGroupBy({a,b,c,a,b})
*/
function getArrayGroupBy(arrRel){
	var arrResult = [];
	$.each(arrRel, function(index, element) {
	//console.log("$.inArray(element, arrResult) : " + $.inArray(element, arrResult))
		if ($.inArray(element, arrResult) == -1) {
			arrResult.push(element);
		}
	});
	return arrResult;
}



/*
* function Name : $.fn.rowspan
* Description : table rowspan 자동합치기
* 예 : $('#아이디').rowspan(1);
*/
$.fn.rowspan = function(colIdx, isStats) {
	return this.each(function(){
		var that;
		$("tr", this).each(function(row) {
			$("td:eq("+colIdx+")", this).each(function(col) {

				if ($.trim($(this).html()) == $.trim($(that).html())
					&& (!isStats
							|| isStats && $.trim($(this).prev().html()) == $.trim($(that).prev().html())
							)
					) {
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;

					$(that).attr("rowspan",rowspan);

					$(this).empty().hide();
					//$(this).hide();
				} else {
					that = this;
				}

				that = (that == null) ? this : that;
			});
		});
	});
};

$.fn.rowspanNotEmpty = function(colIdx, isStats) {
	return this.each(function(){
		var that;
		$("tr", this).each(function(row) {
			$("td:eq("+colIdx+")", this).each(function(col) {

				if ($.trim($(this).html()) == $.trim($(that).html())
					&& (!isStats
							|| isStats && $.trim($(this).prev().html()) == $.trim($(that).prev().html())
							)
					) {
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;

					$(that).attr("rowspan",rowspan);

					$(this).hide();
					//$(this).hide();
				} else {
					that = this;
				}

				that = (that == null) ? this : that;
			});
		});
	});
};
/*
* function Name : $.fn.rowspanTh
* Description : table rowspan 자동합치기
* 예 : $('#아이디').rowspanTh(1);
*/
$.fn.rowspanTh = function(colIdx, isStats) {
	return this.each(function(){
		var that;
		$("tr", this).each(function(row) {
            if($(this).hasClass("hidden") == false){
			$("th:eq("+colIdx+")", this).each(function(col) {
                console.log($.trim($(this).html() + "_" + $.trim($(that).html())))


				if ($.trim($(this).html()) == $.trim($(that).html())
					&& (!isStats
							|| isStats && $.trim($(this).prev().html()) == $.trim($(that).prev().html())
							)
					) {
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;

					$(that).attr("rowspan",rowspan);

					$(this).empty().hide();
					//$(this).hide();
				} else {
					that = this;
				}

				that = (that == null) ? this : that;
			});
            }
		});
	});
};
/*
* function Name : Map
* Description : java Map
* 예 : var map = new Map();
*  map.put("user_id", "test");
*  map.get("user_id");
*/
Map = function(){
	 this.map = new Object();
	};
	Map.prototype = {
	    put : function(key, value){
	        this.map[key] = value;
	    },
	    get : function(key){
	        return this.map[key];
	    },
      getAll : function(){
        return this.map;
      },
	    containsKey : function(key){
	     return key in this.map;
	    },
	    containsValue : function(value){
	     for(var prop in this.map){
	      if(this.map[prop] == value) return true;
	     }
	     return false;
	    },
	    isEmpty : function(key){
	     return (this.size() == 0);
	    },
	    clear : function(){
	     for(var prop in this.map){
	      delete this.map[prop];
	     }
	    },
	    remove : function(key){
	     delete this.map[key];
	    },
	    keys : function(){
	        var keys = new Array();
	        for(var prop in this.map){
	            keys.push(prop);
	        }
	        return keys;
	    },
	    values : function(){
	     var values = new Array();
	        for(var prop in this.map){
	         values.push(this.map[prop]);
	        }
	        return values;
	    },      
	    size : function(){
	      var count = 0;
	      for (var prop in this.map) {
	        count++;
	      }
	      return count;
	    }
	};


var win= null;
function openBW(theURL,winName,w,h,x,y,scroll,resize){

    if (x == "" || x <= 0){
        var winl = (screen.width-w)/2;
    } else {
        var winl = x;
    }

    if (y == "" || x <= 0){
        var wint = (screen.height-h)/2;
    } else {
        var wint =y;
    }


  var setting  ='height='+h+',';
      setting +='width='+w+',';
      setting +='top='+wint+',';
      setting +='left='+winl+',';
      setting +='scrollbars='+scroll+',';
      setting +='resizable='+resize+'';
  win=window.open(theURL,winName,setting);
  if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
}

function getByteLength(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b;
}

/**우편번호 찾기 daum*/
function execDaumPostcode(zip, add1, add2) {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;

            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }


            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            $('#'+zip).val(data.zonecode); //5자리 새우편번호 사용
            $('#'+add1).val(fullAddr)

            // 커서를 상세주소 필드로 이동한다.
            $('#'+add2).focus();
        }
    }).open();
}


function fNumber(exct){
	var e = window.event;
	if( ( e.keyCode >=  48 && e.keyCode <=  57 ) ||
		( e.keyCode >=  96 && e.keyCode <= 105 ) ||
		e.keyCode ==   8 ||
		e.keyCode ==  46 ||
		e.keyCode ==  37 ||
		e.keyCode ==  39 ||
		e.keyCode ==  35 ||
		e.keyCode ==  36 ||
		e.keyCode ==   9
	) {
		return;
	}
	if(typeof(exct) != "undefined" && e.keyCode == exct){
		return;
	}
	else{
		e.returnValue=false;
	}
};
function fNumberComma(exct){
	var e = window.event;
	if( (( e.keyCode >=  48 && e.keyCode <=  57 ) ||
		( e.keyCode >=  96 && e.keyCode <= 105 ) ||
		e.keyCode ==   8 ||
		e.keyCode ==  46 ||
		e.keyCode ==  37 ||
		e.keyCode ==  39 ||
		e.keyCode ==  35 ||
		e.keyCode ==  36 ||
		e.keyCode ==  190 ||
		e.keyCode ==   9 ) &&
		e.keyCode != 229
	) {
		return;
	}
	if(typeof(exct) != "undefined" && e.keyCode == exct){
		return;
	}
	else{
		e.returnValue=false;
	}
};


function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (var i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
}



function ValidUrl(str) {
	if(str == ""){
		return true;
	} else {
	  var pattern = new RegExp('^(https?:\\/\\/)?'+ // 프로토콜

	  '((([a-z\d](([a-z\d-]*[a-z\d])|([ㄱ-힣]))*)\.)+[a-z]{2,}|'+ // 도메인명

	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // 아이피

	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // 포트번호

	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // 쿼리스트링

	  '(\\#[-a-z\\d_]*)?$','i'); // 해쉬테그들

	  if(!pattern.test(str)) {

	    return false;

	  } else {

	    return true;

	  }
	}


}

function checkForm(type, objv, objv2){
    if(type=="text"){
        if($.trim($('[name='+objv+']').val())==''){
            //alert(''+objv2+' 입력해주세요');
            swal(''+objv2+' 입력해주세요.');
            $('[name='+objv+']').focus();
            return true;
        }
    }else if(type=="radio"){
        if($(':radio[name='+objv+']:checked').length<1){
            //alert(''+objv2+' 선택해주세요');
            swal(''+objv2+' 선택해주세요.');
            $('radio[name='+objv+']:eq(0)').focus();
            return true;
        }
    }else if(type=="select"){
        if($('select[name='+objv+']').val()==''){
            //alert(''+objv2+' 선택해주세요');
            swal(''+objv2+' 선택해주세요.');
            $('select[name='+objv+']:eq(0)').focus();
            return true;
        }
    }
    return false;
}


function setPaging(obj, data){
    $(obj).twbsPagination("destroy");
    $(obj).twbsPagination({
        startPage: stringUtil.getInt(data.startPage, 1),
        totalPages: stringUtil.getInt(data.totalPages, 0),//stringUtil.getInt(data.totalPages, 0),
        visiblePages: 10,
        first: stringUtil.getString(data.first, "<<"),
        prev: stringUtil.getString(data.prev, "<"),
        next: stringUtil.getString(data.next, ">"),
        last: stringUtil.getString(data.last, ">>"),
        onPageClick: function (event, page) {
        }
    }).on('page', function (event, page) {
        try {
            eval(data.callFunction).call(this, page);
        }  catch (e){
            console.log("e : " + e);
        }
    });
}


// 주소 검색
function toolsPostSearch(params){
    var data = new Object();
    data.goUrl = "/tools/common/post_pop.asp";
    data.params = params;
    ajaxUtil.modal(data);
}

// SMS 발송
function toolsSmsSendPop(params){
    var data = new Object();
    data.goUrl = "/tools/common/sms_pop.asp";
    data.params = params;
    ajaxUtil.modal(data);
}



// Email 발송
function toolsEmailSendPop(params){
    var data = new Object();
    data.goUrl = "/tools/common/email_pop.asp";
    data.params = params;
    ajaxUtil.modal(data);
}

String.prototype.getStringByte = function() {
    var str = this;
    var tcount = 0;
    var onechar;

    for (var i=0; i<str.length; i++) {
        onechar = str.charAt(i);

        if (escape(onechar).length > 4) {
            tcount += 2;
        } else if (onechar!='\r\n') {
            tcount++;
        }
    }
    return tcount;
}

// 템플릿 다운로드
function goToolsTplDownload(tplId){
    $("#divTplFileDownload").remove();
    var h = ""
    h += "<div id='divTplFileDownload' style='display: none;'>";
    h += "<form id='frmTplDownLoad' method='post' action=''>";
    h += "<input type='hidden' name='tplId' value='"+tplId+"'/>";
    h += "</form>";
    h += "<iframe id='frmTplDownLoad' name='frmTplDownLoad' style='width: 0px; height: 0px'></iframe>";
    h += "</div>";
    $("body").append(h);
    $("#frmTplDownLoad").attr({target:"frmTplDownLoad", action:"/tools/common/tplDownload.asp"}).submit();
}

function goToolsFileDownload(path, fileNm, orgNm, pathType, tmpYn){

    $("#divFileDownload").remove();
    var h = ""
    h += "<div id='divFileDownload' style='display: none;'>";
    h += "<form id='frmDownLoad' method='post' action=''>";
    h += "<input type='hidden' name='path' value='"+path+"'/>";
    h += "<input type='hidden' name='fileNm' value='"+fileNm+"'/>";
    h += "<input type='hidden' name='orgNm' value='"+orgNm+"'/>";
    h += "<input type='hidden' name='pathType' value='"+pathType+"'/>";
    h += "<input type='hidden' name='tmpYn' value='"+tmpYn+"'/>";
    h += "</form>";
    h += "<iframe id='frmDownLoad' name='frmDownLoad' style='width: 0px; height: 0px'></iframe>";
    h += "</div>";
    $("body").append(h);
    $("#frmDownLoad").attr({target:"frmDownLoad", action:"/tools/common/fileDownload.asp"}).submit();
}


// 에디터 이미지
function popEditorImage(configNum){
    Editor.switchEditor(configNum);
    openBW("/resources/plugins/daumeditor/pages/trex/image.asp?config="+configNum, "popEditorImage", 400, 190, 0,0,"No","No");
}

// 에디터 파일
function popEditorFile(configNum){
    Editor.switchEditor(configNum);
    openBW("/resources/plugins/daumeditor/pages/trex/file.asp?config="+configNum, "popEditorFile", 400, 190, 0,0,"No","No");
}


/*
* function Name : $.fn.rowspan
* Description : table rowspan 자동합치기
* 예 : $('#아이디').rowspan(1);
*/
$.fn.rowspan = function(colIdx, isStats) {
    return this.each(function(){
        var that;
        $("tr", this).each(function(row) {
            $("td:eq("+colIdx+")", this).each(function(col) {

                if ($.trim($(this).html()) == $.trim($(that).html())
                    && (!isStats
                            || isStats && $.trim($(this).prev().html()) == $.trim($(that).prev().html())
                            )
                    ) {
                    rowspan = $(that).attr("rowspan") || 1;
                    rowspan = Number(rowspan)+1;

                    $(that).attr("rowspan",rowspan);

                    $(this).empty().hide();
                    //$(this).hide();
                } else {
                    that = this;
                }

                that = (that == null) ? this : that;
            });
        });
    });
};


/*
** 프레임 set에서 유지
*/

 document.onkeydown = function(e) {
  var evtK = (e) ? e.which : window.event.keyCode;
  var isCtrl = ((typeof isCtrl != 'undefiend' && isCtrl) || ((e && evtK == 17) || (!e && event.ctrlKey))) ? true : false;

  if((isCtrl && evtK == 82) || evtK == 116) {
   if(e) { evtK = 505; } else { event.keyCode = evtK = 505; }
  }

  if(evtK == 505) {

   // 자바스크립트에서 현재 경로는 받아내는 메소드로 대치.

   location.reload(location.href);
   return false;
  }
 }

/*
** for date Compare
*/
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date,d.hh,d.mm) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

function js_yyyy_mm_dd_hh_mm_ss() {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
}

//개인정보취그방침/이용약관/이메일무단수집거부
function footerPolicy(id){
    switch(id){
        case 1 : window.open("/wise_doc/footer_policy1.asp",'name','height=900,width=820');break;
        //case 2 : window.open("/wise_doc/footer_policy2.asp",'name','height=200,width=150');break;
        //case 3 : window.open("/wise_doc/footer_policy3.asp",'name','height=200,width=150');break;
    }
}

var calByte = {
    getByteLength : function(s) {

        if (s == null || s.length == 0) {
            return 0;
        }
        var size = 0;

        for ( var i = 0; i < s.length; i++) {
            size += this.charByteSize(s.charAt(i));
        }

        return size;
    },

    cutByteLength : function(s, len) {
        if (s == null || s.length == 0) {
            return "";
        }
        var size = 0;
        var rIndex = s.length;

        for ( var i = 0; i < s.length; i++) {
            size += this.charByteSize(s.charAt(i));
            if( size == len ) {
                rIndex = i + 1;
                break;
            } else if( size > len ) {
                rIndex = i;
                break;
            }
        }

        return s.substring(0, rIndex) + "...";
    },

        cutLenLength : function(s, len) {

            if (s == null || s.length == 0) {
                return 0;
            }
            var size = 0;
            var rIndex = s.length;
            var etc = "";
            for ( var i = 0; i < s.length; i++) {
                size += 1;
                if( size == len ) {
                    rIndex = i + 1;
                    etc = "...";
                    break;
                } else if( size > len ) {
                    rIndex = i;
                    etc = "...";
                    break;
                }
            }

            return s.substring(0, rIndex) + "" + etc;
    }, charByteSize : function(ch) {

        if (ch == null || ch.length == 0) {
            return 0;
        }

        var charCode = ch.charCodeAt(0);

        if (charCode <= 0x00007F) {
            return 1;
        } else if (charCode <= 0x0007FF) {
            return 2;
        } else if (charCode <= 0x00FFFF) {
            return 3;
        } else {
            return 4;
        }
    }
};
/*
var str = strip_tags('<p>Kevin</p> <b>van</b> <i>Zonneveld</i>', '<i><b>');

// 'Kevin <b>van</b> <i>Zonneveld</i>'
*/
function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function setWaitMeView(){
            $('body').waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(255,255,255,0.7)',
                        color : '#000',
                        maxSize : '',
                        waitTime : -1,
                        textPos : 'vertical',
                        fontSize : '',
                        source : '',
                        onClose : function() {}
                    });
}
var lodingCheck = true;
function lodingTimeOut(loginUrl){

//loginUrl = loginUrl.replace("https://", "http://")

    if(lodingCheck){

        setTimeout( function(){

            $.ajax(
                    {
                        url: loginUrl +'/common/common/excelSessionCheck.do',
                        type: "post",
                        dataType: "jsonp",
                        jsonpCallback: "myCallback",
                        error: function(e){
                            alert("시스템 오류입니다. 관리자에게 문의하세요." );
                        },
                        beforeSend: function(){

                        },
                        complete: function(){
                            try {
                                //$('body').waitMe('hide');
                                var modalNotClose = stringUtil.getString($("#modalNotClose"), "N");
                                if (modalNotClose == "N"){
                                    $("div.modal-dialog .close").trigger("click");
                                }
                            } catch(e){

                            }
                        },
                        success: function( data ){
                            if(data.result == "start"){
                                lodingTimeOut(loginUrl);
                            }else{
                                $('body').waitMe('hide');
                            }
                        }
                    }
                );
        }, 1000);
    }
}
