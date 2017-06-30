function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
$(document).ready(function(){
      $("#btnDangXuatChinh").hide();
            $('#btnDangKi').click(function(){
                
                 $('#loginModal').modal('hide');
                 $('#GiaoDienDangKi').modal('show');
               
            });

            $('#DangNhapTrongDangKi').click(function(){
               
                 $('#loginModal').modal('show');
                 $('#GiaoDienDangKi').modal('hide');
               
            });
            $('#btnDangKiChinh').click(function(){
               
                $('#GiaoDienDangKi').modal('show');
               
            });
             $('#btnDangNhapChinh').click(function(){
               
                $('#loginModal').modal('show');
               
            });
             $('#btnDangNhap').click(function(){
               
                $('#loginModal').modal('hide');
                $("#btnDangKiChinh").hide();
                $("#btnDangNhapChinh").hide();
                $("#btnDangXuatChinh").show();
                $(".EditButtonLogin").hide();
            });
             $('#btDangKi').click(function(){
              $('#GiaoDienDangKi').modal('hide');
                $("#btnDangKiChinh").hide();
                $("#btnDangNhapChinh").hide();
                $("#btnDangXuatChinh").show();
                $(".EditButtonLogin").hide();
            });
             $('#btnDangXuat').click(function(){
                $("#btnDangKiChinh").show();
                $("#btnDangNhapChinh").show();
                $("#btnDangXuatChinh").hide();
                $(".EditButtonLogin").show();
            });
        });
 // Xử lý nút yêu thích
 var index = 1, index2 = 1,index3 = 1, index4 = 1,
 index5 = 1, index6 = 1,index7 = 1, index8 = 1,index9 = 1,
 index10 = 1,index11 = 1, index12 = 1,
 index13 = 1, index14 = 1,index15 = 1, index16 = 1,
 index17 = 1, index18 = 1,index19 = 1, index20 = 1;

    $("#YeuThich").click(function(){ 
      index =  index + 1;
      if( index % 2 ==0)
    { 
      $(".iconHeart").css("color","#ff5252");
    }
    else{
      $(".iconHeart").css("color","#fff");
    }
});
    $("#YeuThich2").click(function(){ 
      index2 =  index2 + 1;
      if( index2 % 2 ==0)
    { 
      $(".iconHeart2").css("color","#ff5252");
    }
    else{
      $(".iconHeart2").css("color","#fff");
    }
});
$("#YeuThich3").click(function(){ 
      index3 =  index3 + 1;
      if( index3 % 2 ==0)
    { 
      $(".iconHeart3").css("color","#ff5252");
    }
    else{
      $(".iconHeart3").css("color","#fff");
    }
});
$("#YeuThich4").click(function(){ 
      index4 =  index4 + 1;
      if( index4 % 2 ==0)
    { 
      $(".iconHeart4").css("color","#ff5252");
    }
    else{
      $(".iconHeart4").css("color","#fff");
    }
});
$("#YeuThich5").click(function(){ 
      index5=  index5 + 1;
      if( index5 % 2 ==0)
    { 
      $(".iconHeart5").css("color","#ff5252");
    }
    else{
      $(".iconHeart5").css("color","#fff");
    }
});
$("#YeuThich6").click(function(){ 
      index6 =  index6 + 1;
      if( index6 % 2 ==0)
    { 
      $(".iconHeart6").css("color","#ff5252");
    }
    else{
      $(".iconHeart6").css("color","#fff");
    }
});
$("#YeuThich7").click(function(){ 
      index7 =  index7 + 1;
      if( index7 % 2 ==0)
    { 
      $(".iconHeart7").css("color","#ff5252");
    }
    else{
      $(".iconHeart7").css("color","#fff");
    }
});
$("#YeuThich8").click(function(){ 
      index8 =  index8 + 1;
      if( index8 % 2 ==0)
    { 
      $(".iconHeart8").css("color","#ff5252");
    }
    else{
      $(".iconHeart8").css("color","#fff");
    }
});
$("#YeuThich9").click(function(){ 
      index9 =  index9 + 1;
      if( index9 % 2 ==0)
    { 
      $(".iconHeart9").css("color","#ff5252");
    }
    else{
      $(".iconHeart9").css("color","#fff");
    }
});
$("#YeuThich10").click(function(){ 
      index10 =  index10 + 1;
      if( index10 % 2 ==0)
    { 
      $(".iconHeart10").css("color","#ff5252");
    }
    else{
      $(".iconHeart10").css("color","#fff");
    }
});
$("#YeuThich11").click(function(){ 
      index11 =  index11 + 1;
      if( index11 % 2 ==0)
    { 
      $(".iconHeart11").css("color","#ff5252");
    }
    else{
      $(".iconHeart11").css("color","#fff");
    }
});
$("#YeuThich12").click(function(){ 
      index12 =  index12 + 1;
      if( index12 % 2 ==0)
    { 
      $(".iconHeart12").css("color","#ff5252");
    }
    else{
      $(".iconHeart12").css("color","#fff");
    }
});
$("#YeuThich13").click(function(){ 
      index13 =  index13 + 1;
      if( index13 % 2 ==0)
    { 
      $(".iconHeart13").css("color","#ff5252");
    }
    else{
      $(".iconHeart13").css("color","#fff");
    }
});
$("#YeuThich14").click(function(){ 
      index14 =  index14 + 1;
      if( index14 % 2 ==0)
    { 
      $(".iconHeart14").css("color","#ff5252");
    }
    else{
      $(".iconHeart14").css("color","#fff");
    }
});
$("#YeuThich15").click(function(){ 
      index15 =  index15 + 1;
      if( index15 % 2 ==0)
    { 
      $(".iconHeart15").css("color","#ff5252");
    }
    else{
      $(".iconHeart15").css("color","#fff");
    }
});
$("#YeuThich16").click(function(){ 
      index16 =  index16 + 1;
      if( index16 % 2 ==0)
    { 
      $(".iconHeart16").css("color","#ff5252");
    }
    else{
      $(".iconHeart16").css("color","#fff");
    }
});
$("#YeuThich17").click(function(){ 
      index17 =  index17 + 1;
      if( index17 % 2 ==0)
    { 
      $(".iconHeart17").css("color","#ff5252");
    }
    else{
      $(".iconHeart17").css("color","#fff");
    }
});
$("#YeuThich18").click(function(){ 
      index18 =  index18 + 1;
      if( index18 % 2 ==0)
    { 
      $(".iconHeart18").css("color","#ff5252");
    }
    else{
      $(".iconHeart18").css("color","#fff");
    }
});
$("#YeuThich19").click(function(){ 
      index19 =  index19 + 1;
      if( index19 % 2 ==0)
    { 
      $(".iconHeart19").css("color","#ff5252");
    }
    else{
      $(".iconHeart19").css("color","#fff");
    }
});
$("#YeuThich20").click(function(){ 
      index20 =  index20 + 1;
      if( index20 % 2 ==0)
    { 
      $(".iconHeart20").css("color","#ff5252");
    }
    else{
      $(".iconHeart20").css("color","#fff");
    }
});