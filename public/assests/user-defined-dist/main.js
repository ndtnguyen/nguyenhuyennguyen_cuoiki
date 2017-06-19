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

       var index = 1;
        function plusIndex(n)
        {
            index = index + n;
            showImage(index);
        }
        showImage(1);

        function showImage(n){
            var i;
            var x = document.getElementsByClassName("ImageShow");
            if( n > x.length) { index = 1};
            if( n < 1) { index = x.length};
            for( i = 0; i < x.length ; i++){
                x[i].style.display = "none";
            }
            x[index-1].style.display = "block";
        }
        
        autoSlide();
        function autoSlide(){
            
            var i;
            var x = document.getElementsByClassName("ImageShow");
            for(i =0 ; i< x.length; i++)
            {
                x[i].style.display = "none";

            }
            if(index > x.length) { index = 1};
            x[index -1].style.display = "block";
            index++;
            setTimeout(autoSlide,2000);
        }